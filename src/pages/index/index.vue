<script setup lang="ts">
import { ref } from 'vue'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import { getHomeBannerAPI, getHomeCategoryAPI, getHomeHotAPI } from '@/services/home'
import CustomNavBar from './components/CustomNavBar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
import PageSkeleton from './components/PageSkeleton.vue'
import { onLoad } from '@dcloudio/uni-app'
import { useGuessList } from '@/composables'

const bannerList = ref<BannerItem[]>([])
const categoryList = ref<CategoryItem[]>([])
const hotList = ref<HotItem[]>([])
const isTriggered = ref(false)

const { guessRef, onScrolltolower } = useGuessList()

// 获取首页轮播图数据
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI()
  bannerList.value = res.result
}

// 获取首页分类数据
const getHomeCategoryData = async () => {
  const res = await getHomeCategoryAPI()
  categoryList.value = res.result
}

// 获取首页热门推荐数据
const getHomeHotData = async () => {
  const res = await getHomeHotAPI()
  hotList.value = res.result
}

// 下拉刷新
const onRefresherrefresher = async () => {
  // 开启加载动画
  isTriggered.value = true
  guessRef.value?.resetData()
  // 加载数据，一个接一个执行
  // await getHomeBannerData()
  // await getHomeCategoryData()
  // await getHomeHotData()
  // 同时执行
  await Promise.all([
    getHomeBannerData(),
    getHomeCategoryData(),
    getHomeHotData(),
    guessRef.value.getMore(),
  ])
  // 关闭加载动画
  isTriggered.value = false
}

onLoad(() => {
  getHomeBannerData()
  getHomeCategoryData()
  getHomeHotData()
})
</script>

<template>
  <!-- 自定义导航栏 -->
  <CustomNavBar />
  <scroll-view
    class="scroll-view"
    scroll-y
    @scrolltolower="onScrolltolower"
    refresher-enabled
    @refresherrefresh="onRefresherrefresher"
    :refresher-triggered="isTriggered"
  >
    <PageSkeleton v-if="isTriggered" />
    <template v-else>
      <!-- 自定义轮播图 -->
      <XtxSwiper :list="bannerList" />
      <CategoryPanel :list="categoryList" />
      <HotPanel :list="hotList" />
      <XtxGuess ref="guessRef" />
    </template>
  </scroll-view>
</template>

<style lang="scss">
page {
  background-color: #fff;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.scroll-view {
  flex: 1;
}
</style>
