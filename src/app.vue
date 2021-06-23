<template>
  <div class="demo">
    <CarouselCard ref="carouselCardRef" :interval="7000" :autoplay="false" height="260px" type="card" arrow="always" @change="changeHandle">
      <CarouselCardItem v-for="i in 6" :key="i">
        <h1 v-text="i"></h1>
      </CarouselCardItem>
    </CarouselCard>
    <div style="text-align: center; padding: 10px">
      <button @click="prev">prev</button>
      <button @click="next">next</button>
      <button @click="setActiveItem">set to first</button>
    </div>
    <CarouselCard :interval="3000" height="300px" :autoplay="false" arrow="always" direction="vertical">
      <CarouselCardItem v-for="i in 6" :key="i">
        <h1 v-text="i"></h1>
      </CarouselCardItem>
    </CarouselCard>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { CarouselCard, CarouselCardItem } from './carousel-card'
import '../styles/index.css'
import { ICarouselCard } from '../types/index'

export default defineComponent({
  name: 'App',
  components: { CarouselCard, CarouselCardItem },
  setup () {
    const carouselCardRef = ref<ICarouselCard>()

    const changeHandle = (index: number) => {
      console.log(index)
    }
    const next = () => {
      carouselCardRef.value?.next()
    }
    const prev = () => {
      carouselCardRef.value?.prev()
    }
    const setActiveItem = () => {
      carouselCardRef.value?.setActiveItem(0)
    }

    return {
      carouselCardRef,
      changeHandle,
      next,
      prev,
      setActiveItem
    }
  }
})
</script>
<style scoped>
.demo {
  width: 800px;
  margin: 0 auto
}
h1 {
  height: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #FFF;
  background: linear-gradient(90deg, rgba(88,140,236,1), rgba(106,106,207,1))
}
</style>
