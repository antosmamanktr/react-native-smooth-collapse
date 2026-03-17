import { ReactNode } from "react"
import { SharedValue } from "react-native-reanimated"
import { ViewStyle } from "react-native"
import { AnimatedStyle } from "react-native-reanimated"

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