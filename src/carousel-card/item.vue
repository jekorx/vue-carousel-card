<template>
  <div
    v-show="ready"
    :style="itemStyle"
    :class="{
      'is-active': active,
      'carousel-card-item-card': type === 'card',
      'is-in-stage': inStage,
      'is-hover': hover,
      'is-animating': animating
    }"
    class="carousel-card-item"
    @click="handleItemClick">
    <div
      v-if="type === 'card'"
      v-show="!active"
      class="carousel-card-mask"></div>
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, getCurrentInstance, inject, onMounted, onUnmounted, ref } from 'vue'
import { injectCarouselCardScope, ICarouselCardItemProps, CarouselCardItem } from './carousel-card'

const CARD_SCALE = 0.83
export default defineComponent({
  name: 'CarouselCardItem',
  props: {
    name: {
      type: String,
      default: ''
    },
    label: {
      type: [String, Number],
      default: ''
    }
  },
  setup (props: ICarouselCardItemProps) {
    const instance = getCurrentInstance()
    const hover = ref(false)
    const translate = ref(0)
    const scale = ref(1)
    const active = ref(false)
    const ready = ref(false)
    const inStage = ref(false)
    const animating = ref(false)
    const carouselCardInject = inject('injectCarouselCardScope') as injectCarouselCardScope

    const parentDirection = computed(() => carouselCardInject.direction)
    const itemStyle = computed(() => parentDirection.value === 'vertical'
      ? {
          msTransform: `translateY(${translate.value}px) translateX(-50%) scale(${scale.value})`,
          webkitTransform: `translateY(${translate.value}px) translateX(-50%) scale(${scale.value})`,
          transform: `translateY(${translate.value}px) translateX(-50%) scale(${scale.value})`,
          left: '50%'
        }
      : {
          msTransform: `translateX(${translate.value}px) translateY(-50%) scale(${scale.value})`,
          webkitTransform: `translateX(${translate.value}px) translateY(-50%) scale(${scale.value})`,
          transform: `translateX(${translate.value}px) translateY(-50%) scale(${scale.value})`,
          top: '50%'
        }
    )

    const processIndex = (index: number, activeIndex: number, length: number) => {
      if (activeIndex === 0 && index === length - 1) {
        return -1
      } else if (activeIndex === length - 1 && index === 0) {
        return length
      } else if (index < activeIndex - 1 && activeIndex - index >= length / 2) {
        return length + 1
      } else if (index > activeIndex + 1 && index - activeIndex >= length / 2) {
        return -2
      }
      return index
    }
    const calculateTranslate = (index: number, activeIndex: number) => {
      const parentWidth = carouselCardInject.offsetWidth.value
      if (inStage.value) {
        return parentWidth * ((2 - CARD_SCALE) * (index - activeIndex) + 1) / 4
      } else if (index < activeIndex) {
        return -(1 + CARD_SCALE) * parentWidth / 4
      } else {
        return (3 + CARD_SCALE) * parentWidth / 4
      }
    }
    const calcTranslate = (index: number, activeIndex: number, isVertical: boolean) => {
      const distance = carouselCardInject[isVertical ? 'offsetHeight' : 'offsetWidth'].value
      return distance * (index - activeIndex)
    }
    const translateItem = (index: number, activeIndex: number, oldIndex: number | unknown) => {
      const length = carouselCardInject.items.value.length
      const parentType = carouselCardInject.type
      if (parentType !== 'card' && oldIndex !== undefined) {
        animating.value = index === activeIndex || index === oldIndex
      }
      if (index !== activeIndex && length > 2) {
        index = processIndex(index, activeIndex, length)
      }
      if (parentType === 'card') {
        if (parentDirection.value === 'vertical') {
          console.warn('[Vue-Carousel-Card Warn][Carousel-card] vertical direction is not supported in card mode')
        }
        inStage.value = Math.round(Math.abs(index - activeIndex)) <= 1
        active.value = index === activeIndex
        translate.value = calculateTranslate(index, activeIndex)
        scale.value = active.value ? 1 : CARD_SCALE
      } else {
        active.value = index === activeIndex
        translate.value = calcTranslate(index, activeIndex, parentDirection.value === 'vertical')
      }
      ready.value = true
    }
    const handleItemClick = () => {
      if (carouselCardInject && carouselCardInject.type === 'card') {
        if (instance) {
          const index = carouselCardInject.items.value.map(item => item.uid).indexOf(instance.uid)
          carouselCardInject.setActiveItem(index)
        }
      }
    }

    onMounted(() => {
      if (carouselCardInject.addItem && instance) {
        carouselCardInject.addItem({
          uid: instance.uid,
          ...props,
          hover,
          translate,
          scale,
          active,
          ready,
          inStage,
          animating,
          translateItem
        } as CarouselCardItem)
      }
    })
    onUnmounted(() => {
      if (carouselCardInject.removeItem && instance) {
        carouselCardInject.removeItem(instance.uid)
      }
    })

    return {
      type: carouselCardInject.type,
      ready,
      active,
      inStage,
      hover,
      animating,
      itemStyle,
      translateItem,
      handleItemClick
    }
  }
})
</script>
