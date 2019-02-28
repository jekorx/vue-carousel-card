import CarouselCard from './src/main.vue'

/* istanbul ignore next */
CarouselCard.install = function (Vue) {
  Vue.component(CarouselCard.name, CarouselCard)
};

export default CarouselCard
