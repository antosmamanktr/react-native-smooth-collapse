import { useEffect } from "react"
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useAnimatedReaction
} from "react-native-reanimated"

import { UseCollapsibleReturn } from "./types"

export const useCollapsible = (
  expanded: boolean,
  contentHeight: number,
  duration: number,
  collapsedHeight: number,
  onAnimationEnd?: () => void,
  onProgress?: (progress: number) => void
): UseCollapsibleReturn => {
  // Animation progress (0 → 1)
  const progress = useSharedValue(expanded ? 1 : 0)

  // Height animation
  const height = useSharedValue(
    expanded ? contentHeight : collapsedHeight
  )

  // Trigger animation when expanded/contentHeight changes
  useEffect(() => {
    const targetHeight = expanded ? contentHeight : collapsedHeight

    height.value = withTiming(targetHeight, { duration }, (finished) => {
      if (finished && onAnimationEnd) {
        onAnimationEnd()
      }
    })

    progress.value = withTiming(expanded ? 1 : 0, { duration })
  }, [expanded, contentHeight, duration, collapsedHeight])

  // Listen to progress changes (Reanimated v3 safe)
  useAnimatedReaction(
    () => progress.value,
    (value) => {
      if (onProgress) {
        onProgress(value)
      }
    }
  )

  // Animated style
  const style = useAnimatedStyle(() => ({
    height: height.value,
    overflow: "hidden"
  }))

  return {
    style,
    progress,
    height
  }
}