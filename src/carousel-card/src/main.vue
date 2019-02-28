<template>
  <div
    class="carousel-card"
    @mouseenter.stop="handleMouseEnter"
    @mouseleave.stop="handleMouseLeave">
    <div
      :style="{ height }"
      class="carousel-card-container">
      <transition name="carousel-card-arrow-left">
        <button
          v-if="arrow !== 'never'"
          v-show="arrow === 'always' || hover"
          type="button"
          class="carousel-card-arrow carousel-card-arrow-left"
          @mouseenter="handleButtonEnter('left')"
          @mouseleave="handleButtonLeave"
          @click.stop="throttledArrowClick(activeIndex - 1)">
          <i></i>
        </button>
      </transition>
      <transition name="carousel-card-arrow-right">
        <button
          v-if="arrow !== 'never'"
          v-show="arrow === 'always' || hover"
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
    <ul
      v-if="indicatorPosition !== 'none'"
      :class="{
        'carousel-card-indicators-labels': hasLabel,
        'carousel-card-indicators-outside': indicatorPosition === 'outside' || type === 'card'
      }"
      class="carousel-card-indicators">
      <li
        v-for="(item, index) in items"
        :key="index"
        :class="{ 'is-active': index === activeIndex }"
        class="carousel-card-indicator"
        @mouseenter="throttledIndicatorHover(index)"
        @click.stop="handleIndicatorClick(index)">
        <button class="carousel-card-button">
          <span v-if="hasLabel" v-text="item.label"></span>
        </button>
      </li>
    </ul>
  </div>
</template>
<script>
import throttle from 'throttle-debounce/throttle'
import ResizeObserver from 'resize-observer-polyfill'

const isServer = typeof window === 'undefined'
const resizeHandler = (entries) => {
  for (let entry of entries) {
    const listeners = entry.target._resizeListeners_ || []
    if (listeners.length) {
      listeners.forEach(fn => fn())
    }
  }
}
const addResizeListener = (el, fn) => {
  if (isServer) return
  if (!el._resizeListeners_) {
    el._resizeListeners_ = []
    el.__ro__ = new ResizeObserver(resizeHandler)
    el.__ro__.observe(el)
  }
  el._resizeListeners_.push(fn)
}
const removeResizeListener = (el, fn) => {
  if (!el || !el._resizeListeners_) return
  el._resizeListeners_.splice(el._resizeListeners_.indexOf(fn), 1)
  if (!el._resizeListeners_.length) {
    el.__ro__.disconnect()
  }
}

export default {
  name: 'CarouselCard',
  props: {
    initialIndex: { type: Number, default: 0 },
    height: { type: String, default: '200' },
    trigger: { type: String, default: 'hover' },
    autoplay: { type: Boolean, default: true },
    interval: { type: Number, default: 3000 },
    indicatorPosition: { type: String, default: 'outside' },
    indicator: { type: Boolean, default: true },
    arrow: { type: String, default: 'hover' },
    type: String
  },
  data() {
    return {
      items: [],
      activeIndex: -1,
      containerWidth: 0,
      timer: null,
      hover: false
    }
  },
  computed: {
    hasLabel() {
      return this.items.some(item => item.label.toString().length > 0)
    }
  },
  watch: {
    items(val) {
      if (val.length > 0) this.setActiveItem(this.initialIndex)
    },
    activeIndex(val, oldVal) {
      this.resetItemPosition(oldVal)
      this.$emit('change', val, oldVal)
    },
    autoplay(val) {
      val ? this.startTimer() : this.pauseTimer()
    }
  },
  created() {
    this.throttledArrowClick = throttle(300, true, index => {
      this.setActiveItem(index)
    })
    this.throttledIndicatorHover = throttle(300, index => {
      this.handleIndicatorHover(index)
    })
  },
  mounted() {
    this.updateItems()
    this.$nextTick(() => {
      addResizeListener(this.$el, this.resetItemPosition)
      if (this.initialIndex < this.items.length && this.initialIndex >= 0) {
        this.activeIndex = this.initialIndex
      }
      this.startTimer()
    })
  },
  beforeDestroy() {
    if (this.$el) removeResizeListener(this.$el, this.resetItemPosition)
  },
  methods: {
    handleMouseEnter() {
      this.hover = true
      this.pauseTimer()
    },
    handleMouseLeave() {
      this.hover = false
      this.startTimer()
    },
    itemInStage(item, index) {
      const length = this.items.length
      if (index === length - 1 && item.inStage && this.items[0].active ||
        (item.inStage && this.items[index + 1] && this.items[index + 1].active)) {
        return 'left'
      } else if (index === 0 && item.inStage && this.items[length - 1].active ||
        (item.inStage && this.items[index - 1] && this.items[index - 1].active)) {
        return 'right'
      }
      return false
    },
    handleButtonEnter(arrow) {
      this.items.forEach((item, index) => {
        if (arrow === this.itemInStage(item, index)) {
          item.hover = true
        }
      })
    },
    handleButtonLeave() {
      this.items.forEach(item => {
        item.hover = false
      })
    },
    updateItems() {
      this.items = this.$children.filter(child => child.$options.name === 'CarouselCardItem')
    },
    resetItemPosition(oldIndex) {
      this.items.forEach((item, index) => {
        item.translateItem(index, this.activeIndex, oldIndex)
      })
    },
    playSlides() {
      if (this.activeIndex < this.items.length - 1) {
        this.activeIndex++
      } else {
        this.activeIndex = 0
      }
    },
    pauseTimer() {
      clearInterval(this.timer)
    },
    startTimer() {
      if (this.interval <= 0 || !this.autoplay) return
      this.timer = setInterval(this.playSlides, this.interval)
    },
    setActiveItem(index) {
      if (typeof index === 'string') {
        const filteredItems = this.items.filter(item => item.name === index)
        if (filteredItems.length > 0) {
          index = this.items.indexOf(filteredItems[0])
        }
      }
      index = Number(index)
      if (isNaN(index) || index !== Math.floor(index)) {
        process.env.NODE_ENV !== 'production' &&
        console.warn('[Vue-Carousel-Card Warn][Carousel-card]index must be an integer.')
        return
      }
      let length = this.items.length
      const oldIndex = this.activeIndex
      if (index < 0) {
        this.activeIndex = length - 1
      } else if (index >= length) {
        this.activeIndex = 0
      } else {
        this.activeIndex = index
      }
      if (oldIndex === this.activeIndex) {
        this.resetItemPosition(oldIndex)
      }
    },
    prev() {
      this.setActiveItem(this.activeIndex - 1)
    },
    next() {
      this.setActiveItem(this.activeIndex + 1)
    },
    handleIndicatorClick(index) {
      this.activeIndex = index
    },
    handleIndicatorHover(index) {
      if (this.trigger === 'hover' && index !== this.activeIndex) {
        this.activeIndex = index
      }
    }
  }
}
</script>
