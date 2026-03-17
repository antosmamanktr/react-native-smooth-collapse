import React, { useContext } from "react"
import { TouchableOpacity } from "react-native"
import { CollapsibleGroupContext } from "./CollapsibleGroupContext"

export const CollapsibleTrigger = ({ children }: any) => {
  const context = useContext(CollapsibleGroupContext)

  if (!context || context.itemIndex === undefined) {
    return children
  }

  const { toggleItem, itemIndex } = context

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => toggleItem(itemIndex)}
    >
      {children}
    </TouchableOpacity>
  )
}