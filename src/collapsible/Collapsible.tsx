import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  memo,
  useState
} from "react"

import { View } from "react-native"

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useAnimatedReaction,
  SharedValue
} from "react-native-reanimated"

export type CollapsibleRef = {
  expand: () => void
  collapse: () => void
  toggle: () => void
}

type Props = {
  expanded: boolean
  duration?: number
  children: React.ReactNode
  progress?: SharedValue<number>
}

const CollapsibleComponent = forwardRef<CollapsibleRef, Props>(
  ({ expanded, duration = 300, children, progress }, ref) => {

    const internalProgress = useSharedValue(expanded ? 1 : 0)
    const contentHeight = useSharedValue(0)

    const [measured, setMeasured] = useState(false)

    useEffect(() => {
      internalProgress.value = withTiming(
        expanded ? 1 : 0,
        { duration }
      )
    }, [expanded])

    useImperativeHandle(ref, () => ({
      expand() {
        internalProgress.value = withTiming(1, { duration })
      },
      collapse() {
        internalProgress.value = withTiming(0, { duration })
      },
      toggle() {
        internalProgress.value = withTiming(
          internalProgress.value === 1 ? 0 : 1,
          { duration }
        )
      }
    }))

    useAnimatedReaction(
      () => internalProgress.value,
      (v) => {
        if (progress) {
          progress.value = v
        }
      }
    )

    const animatedStyle = useAnimatedStyle(() => ({
      height: contentHeight.value * internalProgress.value,
      overflow: "hidden"
    }))

    return (
      <>
        {!measured && (
          <View
            style={{
              position: "absolute",
              opacity: 0,
              zIndex: -1
            }}
            onLayout={(e) => {
              const h = e.nativeEvent.layout.height
              if (h > 0) {
                contentHeight.value = h
                setMeasured(true)
              }
            }}
          >
            {children}
          </View>
        )}

        {measured && (
          <Animated.View style={animatedStyle}>
            {children}
          </Animated.View>
        )}
      </>
    )
  }
)

export const Collapsible = memo(CollapsibleComponent)