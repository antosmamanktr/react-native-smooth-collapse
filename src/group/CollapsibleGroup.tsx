import React, { useState, useRef } from "react"
import { CollapsibleGroupContext } from "./CollapsibleGroupContext"

type Props = {
  accordion?: boolean
  children: React.ReactNode
}

export const CollapsibleGroup = ({ accordion = false, children }: Props) => {
  const [openItems, setOpenItems] = useState<number[]>([])
  const counter = useRef(0)

  const registerItem = () => {
    const index = counter.current
    counter.current += 1
    return index
  }

  const toggleItem = (index: number) => {
    setOpenItems(prev => {
      const exists = prev.includes(index)

      if (accordion) {
        return exists ? [] : [index]
      }

      return exists
        ? prev.filter(i => i !== index)
        : [...prev, index]
    })
  }

  return (
    <CollapsibleGroupContext.Provider
      value={{ openItems, toggleItem, registerItem }}
    >
      {children}
    </CollapsibleGroupContext.Provider>
  )
}