import React, { FC } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

type Props = {
  title: string | number;
  onPress: () => void;
  disabled?: boolean;
  color?: string;
};

export const MyButton: FC<Props> = ({ title, onPress, disabled, color }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      aria-disabled={disabled}
      style={{
        opacity: disabled ? 0.5 : 1,
        backgroundColor: color ?? "transparent",
        borderRadius: 5,
        borderWidth: 1,
        padding: 10,
      }}
    >
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});
