export default interface ISimpleCarousel {
  children: JSX.Element[]
  isHorizontal: boolean
  gap: number
  autoPlay?: boolean
  minHeight?: string
  minWidth?: string
  hideArrows?: boolean
  hideDevPanel?: boolean
  hideInitGap?: boolean
  autoPlayInterval?: number
  onActiveIndexUpdate?: (index: number) => void
  ref?: any
}
