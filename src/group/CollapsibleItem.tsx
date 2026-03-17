import React, { useContext, useRef } from 'react';
import { View } from 'react-native';
import { CollapsibleGroupContext } from './CollapsibleGroupContext';
import { CollapsibleGroupContextType } from '../types';

type Props = {
  children: React.ReactNode;
};

export const CollapsibleItem = ({ children }: Props) => {
  const context = useContext(CollapsibleGroupContext);
  const indexRef = useRef<number | undefined>(undefined);

  if (context && indexRef.current === undefined) {
    indexRef.current = context.registerItem();
  }

  const value: CollapsibleGroupContextType | null = context
    ? {
        ...context,
        itemIndex: indexRef.current,
      }
    : null;

  return (
    <CollapsibleGroupContext.Provider value={value}>
      <View>{children}</View>
    </CollapsibleGroupContext.Provider>
  );
};
