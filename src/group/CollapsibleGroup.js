import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useRef } from "react";
import { CollapsibleGroupContext } from "./CollapsibleGroupContext";
export const CollapsibleGroup = ({ accordion = false, children }) => {
    const [openItems, setOpenItems] = useState([]);
    const counter = useRef(0);
    const registerItem = () => {
        const index = counter.current;
        counter.current += 1;
        return index;
    };
    const toggleItem = (index) => {
        setOpenItems(prev => {
            const exists = prev.includes(index);
            if (accordion) {
                return exists ? [] : [index];
            }
            return exists
                ? prev.filter(i => i !== index)
                : [...prev, index];
        });
    };
    return (_jsx(CollapsibleGroupContext.Provider, { value: { openItems, toggleItem, registerItem }, children: children }));
};
