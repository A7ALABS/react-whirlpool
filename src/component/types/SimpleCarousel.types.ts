import { ReactNode } from 'react'

export default interface ISimpleCarousel {
  children: ReactNode
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
}

export interface SimpleCarouselHandle {
  handleNextEvent: () => void
  handlePrevEvent: () => void
  handleReset: () => void
}
