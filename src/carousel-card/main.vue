<template>
  <div
    ref="rootRef"
    :class="carouselCardClazz"
    @mouseenter.stop="handleMouseEnter"
    @mouseleave.stop="handleMouseLeave">
    <div
      :style="{ height }"
      class="carousel-card-container">
      <transition v-if="arrowDisplay" name="carousel-card-arrow-left">
        <button
          v-show="(arrow === 'always' || hover) && (loop || activeIndex > 0)"
          type="button"
          class="carousel-card-arrow carousel-card-arrow-left"
          @mouseenter="handleButtonEnter('left')"
          @mouseleave="handleButtonLeave"
          @click.stop="throttledArrowClick(activeIndex - 1)">
          <i></i>
        </button>
      </transition>
      <transition v-if="arrowDisplay" name="carousel-card-arrow-right">
        <button
          v-show="(arrow === 'always' || hover) && (loop || activeIndex < items.length - 1)"
          type="button"
          class="carousel-card-arrow carousel-card-arrow-right"
          @mouseenter="handleButtonEnter('right')"
          @mouseleave="handleButtonLeave"
          @click.stop="throttledArrowClick(activeIndex + 1)">
          <i></i>
        </button>
      </transition>
      <slot></slot>
    </div>
    <ul v-if="indicatorPosition !== 'none'" :class="indicatorsClazz">
      <li
        v-for="(item, index) in items"
        :key="index"
        :class="['carousel-card-indicator', `carousel-card-indicator-${direction}`, { 'is-active': index === activeIndex }]"
        @mouseenter="throttledIndicatorHover(index)"
        @click.stop="handleIndicatorClick(index)">
        <button class="carousel-card-button">
          <span v-if="hasLabel" v-text="item.label"></span>
        </button>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, nextTick, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue'
import { throttle } from 'throttle-debounce'
import ResizeObserver from 'resize-observer-polyfill'
import { ResizableElement, ICarouselCardProps, CarouselCardItem, injectCarouselCardScope } from './carousel-card'

const isServer = typeof window === 'undefined'
const resizeHandler = (entries: ResizeObserverEntry[]) => {
  for (const entry of entries) {
    const listeners = (entry.target as ResizableElement).__resizeListeners__ || []
    if (listeners.length) {
      listeners.forEach(fn => fn())
    }
  }
}
const addResizeListener = (el: ResizableElement, fn: (...args: unknown[]) => unknown) => {
  if (isServer) return
  if (!el.__resizeListeners__) {
    el.__resizeListeners__ = []
    el.__ro__ = new ResizeObserver(resizeHandler)
    el.__ro__.observe(el)
  }
  el.__resizeListeners__.push(fn)
}
const removeResizeListener = (el: ResizableElement, fn: (...args: unknown[]) => unknown) => {
  if (!el || !el.__resizeListeners__) return
  el.__resizeListeners__.splice(el.__resizeListeners__.indexOf(fn), 1)
  if (!el.__resizeListeners__.length) {
    el.__ro__.disconnect()
  }
}

export default defineComponent({
  name: 'CarouselCard',
  props: {
    initialIndex: {
      type: Number,
      default: 0
    },
    height: {
      type: String,
      default: '200'
    },
    trigger: {
      type: String,
      default: 'hover'
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 3000
    },
    indicatorPosition: {
      type: String,
      default: '',
      validator: (val: string) => ['outside', 'none', ''].includes(val)
    },
    indicator: {
      type: Boolean,
      default: true
    },
    arrow: {
      type: String,
      default: 'hover'
    },
    type: {
      type: String,
      default: ''
    },
    loop: {
      type: Boolean,
      default: true
    },
    direction: {
      type: String,
      default: 'horizontal',
      validator: (val: string) => ['horizontal', 'vertical'].includes(val)
    },
    pauseOnHover: {
      type: Boolean,
      default: true
    }
  },
  emits: ['change'],
  setup (props: ICarouselCardProps, { emit }) {
    const rootRef = ref<null | ResizableElement>(null)
    const offsetWidth = ref(0)
    const offsetHeight = ref(0)
    const items = ref<CarouselCardItem[]>([])
    const activeIndex = ref(-1)
    const timer = ref<null | ReturnType<typeof setInterval>>(null)
    const hover = ref(false)

    const hasLabel = computed(() => {
      return items.value.some(item => item.label.toString().length > 0)
    })
    const arrowDisplay = computed(
      () => props.arrow !== 'never' && props.direction !== 'vertical'
    )
    const carouselCardClazz = computed(() => {
      return ['carousel-card', `carousel-card-${props.direction}`]
    })
    const indicatorsClazz = computed(() => {
      const classes = [
        'carousel-card-indicators',
        `carousel-card-indicators-${props.direction}`
      ]
      if (hasLabel.value) {
        classes.push('carousel-card-indicators-labels')
      }
      if (props.direction !== 'vertical' && (props.indicatorPosition === 'outside' || props.type === 'card')) {
        classes.push('carousel-card-indicators-outside')
      }
      return classes
    })

    watch(items, val => {
      val.length > 0 && setActiveItem(props.initialIndex)
    })
    watch(activeIndex, (val, oldVal) => {
      resetItemPosition(oldVal)
      oldVal > -1 && emit('change', val, oldVal)
    })
    watch(() => props.autoplay, val => {
      val ? startTimer() : pauseTimer()
    })
    watch(() => props.loop, () => {
      setActiveItem(activeIndex.value)
    })

    const setActiveItem = (index: string | number) => {
      if (typeof index === 'string') {
        const filteredItems = items.value.filter(item => item.name === index)
        if (filteredItems.length > 0) {
          index = items.value.indexOf(filteredItems[0])
        }
      }
      index = Number(index)
      if (isNaN(index) || index !== Math.floor(index)) {
        console.warn('[Vue-Carousel-Card Warn][Carousel-card] index must be an integer.')
        return
      }
      const length = items.value.length
      const oldIndex = activeIndex.value
      if (index < 0) {
        activeIndex.value = props.loop ? length - 1 : 0
      } else if (index >= length) {
        activeIndex.value = props.loop ? 0 : length - 1
      } else {
        activeIndex.value = index
      }
      if (oldIndex === activeIndex.value) {
        resetItemPosition(oldIndex)
      }
    }
    const resetItemPosition = (oldIndex: number | unknown) => {
      items.value.forEach((item, index) => {
        item.translateItem(index, activeIndex.value, oldIndex)
      })
    }
    const pauseTimer = () => {
      timer.value && clearInterval(timer.value)
    }
    const startTimer = () => {
      if (props.interval <= 0 || !props.autoplay) return
      timer.value = setInterval(playSlides, props.interval)
    }
    const playSlides = () => {
      if (activeIndex.value < items.value.length - 1) {
        activeIndex.value++
      } else if (props.loop) {
        activeIndex.value = 0
      }
    }
    const throttledArrowClick = throttle(300, true, (index: number) => {
      setActiveItem(index)
    })
    const throttledIndicatorHover = throttle(300, true, (index: number) => {
      handleIndicatorHover(index)
    })
    const handleMouseEnter = () => {
      hover.value = true
      props.pauseOnHover && pauseTimer()
    }
    const handleMouseLeave = () => {
      hover.value = false
      startTimer()
    }
    const itemInStage = (item: any, index: number) => {
      const length = items.value.length
      if ((index === length - 1 && item.inStage && items.value[0].active) ||
        (item.inStage && items.value[index + 1] && items.value[index + 1].active)) {
        return 'left'
      } else if ((index === 0 && item.inStage && items.value[length - 1].active) ||
        (item.inStage && items.value[index - 1] && items.value[index - 1].active)) {
        return 'right'
      }
      return false
    }
    const handleButtonEnter = (arrow: string) => {
      if (props.direction === 'vertical') return
      items.value.forEach((item, index) => {
        if (arrow === itemInStage(item, index)) {
          item.hover = true
        }
      })
    }
    const handleButtonLeave = () => {
      if (props.direction === 'vertical') return
      items.value.forEach(item => {
        item.hover = false
      })
    }
    const prev = () => {
      setActiveItem(activeIndex.value - 1)
    }
    const next = () => {
      setActiveItem(activeIndex.value + 1)
    }
    const handleIndicatorClick = (index: number) => {
      activeIndex.value = index
    }
    const handleIndicatorHover = (index: number) => {
      if (props.trigger === 'hover' && index !== activeIndex.value) {
        activeIndex.value = index
      }
    }
    const addItem = (item: any) => {
      items.value.push(item)
    }
    const removeItem = (uid: number) => {
      const index = items.value.findIndex(item => item.uid === uid)
      if (index !== -1) {
        items.value.splice(index, 1)
        activeIndex.value === index && next()
      }
    }

    onMounted(() => {
      nextTick(() => {
        if (rootRef.value) {
          addResizeListener(rootRef.value, resetItemPosition)
          offsetWidth.value = rootRef.value.offsetWidth
          offsetHeight.value = rootRef.value.offsetHeight
        }
        if (props.initialIndex < items.value.length && props.initialIndex >= 0) {
          activeIndex.value = props.initialIndex
        }
        startTimer()
      })
    })
    onBeforeUnmount(() => {
      if (rootRef.value) {
        removeResizeListener(rootRef.value, resetItemPosition)
      }
    })

    provide<injectCarouselCardScope>('injectCarouselCardScope', {
      offsetWidth,
      offsetHeight,
      type: props.type,
      items,
      direction: props.direction,
      loop: props.loop,
      addItem,
      removeItem,
      setActiveItem
    })

    return {
      rootRef,
      items,
      activeIndex,
      hover,
      hasLabel,
      arrowDisplay,
      carouselCardClazz,
      indicatorsClazz,
      setActiveItem,
      handleMouseEnter,
      handleMouseLeave,
      handleButtonEnter,
      handleButtonLeave,
      prev,
      next,
      handleIndicatorClick,
      handleIndicatorHover,
      throttledArrowClick,
      throttledIndicatorHover
    }
  }
})
</script>
