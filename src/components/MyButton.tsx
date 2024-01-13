import React, { FC } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

type Props = {
  title: string | number;
  onPress: () => void;
  disabled?: boolean;
  color?: string;
  style?: any;
};

export const MyButton: FC<Props> = ({
  title,
  onPress,
  disabled,
  color,
  style,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      aria-disabled={disabled}
      style={[
        {
          opacity: disabled ? 0.5 : 1,
          backgroundColor: color ?? "transparent",
          borderRadius: 5,
          borderWidth: 1,
          padding: 10,
        },
        style,
      ]}
    >
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});
