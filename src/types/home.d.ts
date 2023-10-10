import type { GoodsItem } from './global'

/** 首页-广告区域数据类型 */
export type BannerItem = {
  /** 跳转链接 */
  hrefUrl: string
  /** id */
  id: string
  /** 图片链接 */
  imgUrl: string
  /** 跳转类型 */
  type: number
}

/** 首页-分类标签数据类型 */
export type CategoryItem = {
  icon: string
  id: string
  name: string
}

/** 首页-热门推荐数据类型 */
export type HotItem = {
  id: string
  pictures: string[]
  title: string
  alt: string
  target: string
  type: number
}

/** 猜你喜欢-商品类型 */
export type GuessItem = GoodsItem
