<template>
  <div
    v-show="ready"
    :style="{
      msTransform: `translateX(${ translate }px) scale(${ scale })`,
      webkitTransform: `translateX(${ translate }px) scale(${ scale })`,
      transform: `translateX(${ translate }px) scale(${ scale })`
    }"
    :class="{
      'is-active': active,
      'carousel-card-item-card': $parent.type === 'card',
      'is-in-stage': inStage,
      'is-hover': hover,
      'is-animating': animating
    }"
    class="carousel-card-item"
    @click="handleItemClick">
    <div
      v-if="$parent.type === 'card'"
      v-show="!active"
      class="carousel-card-mask" />
    <slot />
  </div>
</template>
<script>
const CARD_SCALE = 0.83
export default {
  name: 'CarouselCardItem',
  props: {
    label: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      hover: false,
      translate: 0,
      scale: 1,
      active: false,
      ready: false,
      inStage: false,
      animating: false
    }
  },
  created() {
    this.updateItems()
  },
  destroyed() {
    this.updateItems()
  },
  methods: {
    processIndex(index, activeIndex, length) {
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
    },
    calculateTranslate(index, activeIndex, parentWidth) {
      if (this.inStage) {
        return parentWidth * ((2 - CARD_SCALE) * (index - activeIndex) + 1) / 4
      } else if (index < activeIndex) {
        return -(1 + CARD_SCALE) * parentWidth / 4
      } else {
        return (3 + CARD_SCALE) * parentWidth / 4
      }
    },
    translateItem(index, activeIndex, oldIndex) {
      const parentWidth = this.$parent.$el.offsetWidth
      const length = this.$parent.items.length
      if (this.$parent.type !== 'card' && oldIndex !== undefined) {
        this.animating = index === activeIndex || index === oldIndex
      }
      if (index !== activeIndex && length > 2) {
        index = this.processIndex(index, activeIndex, length)
      }
      if (this.$parent.type === 'card') {
        this.inStage = Math.round(Math.abs(index - activeIndex)) <= 1
        this.active = index === activeIndex
        this.translate = this.calculateTranslate(index, activeIndex, parentWidth)
        this.scale = this.active ? 1 : CARD_SCALE
      } else {
        this.active = index === activeIndex
        this.translate = parentWidth * (index - activeIndex)
      }
      this.ready = true
    },
    handleItemClick() {
      const parent = this.$parent
      if (parent && parent.type === 'card') {
        const index = parent.items.indexOf(this)
        parent.setActiveItem(index)
      }
    },
    updateItems () {
      this.$parent && this.$parent.updateItems()
    }
  }
}
</script>
<style>
.carousel-card-item, .carousel-card-mask {
  position: absolute;
  height: 100%;
  top: 0;
  left: 0
}
.carousel-card-item {
  width: 100%;
  display: inline-block;
  overflow: hidden;
  z-index: 0
}
.carousel-card-item.is-active {
  z-index: 2
}
.carousel-card-item.is-animating {
  transition: transform .4s ease-in-out
}
.carousel-card-item-card {
  width: 50%;
  transition: transform .4s ease-in-out
}
.carousel-card-item-card.is-in-stage {
  cursor: pointer;
  z-index: 1
}
.carousel-card-item-card.is-active {
  z-index: 2
}
.carousel-card-item-card.is-in-stage.is-hover .carousel-card-mask {
  opacity: .12
}
.carousel-card-item-card.is-in-stage:hover .carousel-card-mask {
  opacity: .12
}
.carousel-card-mask {
  width: 100%;
  background-color: #fff;
  opacity: .24;
  transition: .2s
}
</style>
