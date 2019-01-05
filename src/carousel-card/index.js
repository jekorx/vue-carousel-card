import CarouselCard from './carousel-card'
import CarouselCardItem from './carousel-card-item'

const install = Vue => {
  Vue.component(CarouselCard.name, CarouselCard)
  Vue.component(CarouselCardItem.name, CarouselCardItem)
}

export default {
  install
}

export {
  CarouselCard,
  CarouselCardItem
}
