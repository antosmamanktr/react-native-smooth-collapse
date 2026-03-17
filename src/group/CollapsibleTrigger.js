import { jsx as _jsx } from "react/jsx-runtime";
import { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { CollapsibleGroupContext } from "./CollapsibleGroupContext";
export const CollapsibleTrigger = ({ children }) => {
    const context = useContext(CollapsibleGroupContext);
    if (!context || context.itemIndex === undefined) {
        return children;
    }
    const { toggleItem, itemIndex } = context;
    return (_jsx(TouchableOpacity, { activeOpacity: 0.7, onPress: () => toggleItem(itemIndex), children: children }));
};
