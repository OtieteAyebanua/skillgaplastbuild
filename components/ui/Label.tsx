import React, { ReactNode } from "react";
import { Text, useColorScheme } from "react-native";


interface ILabel {
  children: ReactNode;
}
const Label = ({ children }: ILabel) => {
  const  theme  = useColorScheme();

  return (
   <Text
  style={{
    color: theme === 'light' ? '#000000' : '#ffffff',
    fontWeight: '500', 
  }}
>
  {children}
</Text>
  );
};

export default Label;
