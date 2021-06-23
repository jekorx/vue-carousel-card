import { App } from 'vue'
import CarouselCard from './main.vue'
import CarouselCardItem from './item.vue'

CarouselCard.install = (app: App): void => {
  app.component(CarouselCard.name, CarouselCard)
}
CarouselCardItem.install = (app: App): void => {
  app.component(CarouselCardItem.name, CarouselCardItem)
}

const install = (app: App): void => {
  app.component(CarouselCard.name, CarouselCard)
  app.component(CarouselCardItem.name, CarouselCardItem)
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
