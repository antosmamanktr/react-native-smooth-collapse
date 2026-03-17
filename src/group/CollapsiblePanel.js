import { jsx as _jsx } from "react/jsx-runtime";
import { useContext } from "react";
import { Collapsible } from "../collapsible/Collapsible";
import { CollapsibleGroupContext } from "./CollapsibleGroupContext";
export const CollapsiblePanel = ({ children }) => {
    const context = useContext(CollapsibleGroupContext);
    if (!context || context.itemIndex === undefined) {
        return children;
    }
    const { openItems, itemIndex } = context;
    const expanded = openItems.includes(itemIndex);
    return _jsx(Collapsible, { expanded: expanded, children: children });
};
