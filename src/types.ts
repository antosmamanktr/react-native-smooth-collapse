import { ReactNode } from "react"
import { SharedValue, AnimatedStyle } from "react-native-reanimated"
import { ViewStyle } from "react-native"

export interface CollapsibleRef {
  expand: () => void
  collapse: () => void
  toggle: () => void
}

export interface CollapsibleProps {
  expanded?: boolean
  duration?: number
  collapsedHeight?: number
  unmountOnCollapse?: boolean
  progress?: SharedValue<number>
  onAnimationEnd?: () => void
  onProgress?: (progress: number) => void
  children: ReactNode
}

export interface UseCollapsibleReturn {
  style: AnimatedStyle<ViewStyle>
  progress: SharedValue<number>
  height: SharedValue<number>
}

export interface CollapsibleGroupContextType {
  openItems: number[]
  toggleItem: (index: number) => void
  registerItem: () => number
  itemIndex?: number
}