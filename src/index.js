import CarouselCard from './carousel-card'
import CarouselCardItem from './carousel-card-item'

const install = function (Vue) {
  Vue.component(CarouselCard.name, CarouselCard)
  Vue.component(CarouselCardItem.name, CarouselCardItem)
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  CarouselCard,
  CarouselCardItem
}

export {
  CarouselCard,
  CarouselCardItem
}
