import { ToRefs, Ref, UnwrapRef } from 'vue'

export interface ICarouselCardItemProps {
  key?: string
  name: string
  label: string | number
}

export interface ICarouselCardItemData {
  hover: boolean
  translate: number
  scale: number
  active: boolean
  ready: boolean
  inStage: boolean
  animating: boolean
}

export interface ICarouselCardProps {
  initialIndex: number
  height: string
  trigger: string
  autoplay: boolean
  interval: number
  indicatorPosition: string
  indicator: boolean
  arrow: string
  type: string
  loop: boolean
  direction: string
  pauseOnHover: boolean
}

export type UnionCarouselCardItemData = ICarouselCardItemProps & ToRefs<ICarouselCardItemData>

export interface CarouselCardItem extends UnionCarouselCardItemData {
  uid: number
  translateItem: (index: number, activeIndex: number, oldIndex: number | unknown) => void
}

export type ResizableElement = HTMLElement & {
  __resizeListeners__: Array<(...args: unknown[]) => unknown>
  __ro__: ResizeObserver
}

export interface injectCarouselCardScope {
  offsetWidth: Ref<number>
  offsetHeight: Ref<number>
  type: string
  direction: string
  loop: boolean
  items: Ref<UnwrapRef<CarouselCardItem[]>>
  addItem: (item: CarouselCardItem) => void
  removeItem: (uid: number) => void
  setActiveItem: (index: number) => void
}
