import { jsx as _jsx } from "react/jsx-runtime";
import { useContext, useRef } from 'react';
import { View } from 'react-native';
import { CollapsibleGroupContext } from './CollapsibleGroupContext';
export const CollapsibleItem = ({ children }) => {
    const context = useContext(CollapsibleGroupContext);
    const indexRef = useRef(undefined);
    if (context && indexRef.current === undefined) {
        indexRef.current = context.registerItem();
    }
    const value = context
        ? {
            ...context,
            itemIndex: indexRef.current,
        }
        : null;
    return (_jsx(CollapsibleGroupContext.Provider, { value: value, children: _jsx(View, { children: children }) }));
};
