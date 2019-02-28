import CarouselCardItem from '../carousel-card/src/item'

/* istanbul ignore next */
CarouselCardItem.install = function (Vue) {
  Vue.component(CarouselCardItem.name, CarouselCardItem)
};

export default CarouselCardItem
