import React, { useContext } from "react"
import { Collapsible } from "../collapsible/Collapsible"
import { CollapsibleGroupContext } from "./CollapsibleGroupContext"

export const CollapsiblePanel = ({ children }: any) => {
  const context = useContext(CollapsibleGroupContext)

  if (!context || context.itemIndex === undefined) {
    return children
  }

  const { openItems, itemIndex } = context
  const expanded = openItems.includes(itemIndex)

  return <Collapsible expanded={expanded}>{children}</Collapsible>
}