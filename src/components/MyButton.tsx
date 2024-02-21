import React, { FC } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

type Props = {
  title: string | number;
  onPress: () => void;
  disabled?: boolean;
  color?: string;
  style?: any;
  square?: boolean;
};

export const MyButton: FC<Props> = ({
  title,
  onPress,
  disabled,
  color,
  style,
  square = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      aria-disabled={disabled}
      style={[
        {
          alignItems: "center",
          justifyContent: "center",
          opacity: disabled ? 0.5 : 1,
          backgroundColor: color ?? "transparent",
          borderRadius: 5,
          borderWidth: 1,
          height: "100%",
        },
        style,
        square && { aspectRatio: 1 },
      ]}
    >
      <Text
        style={{
          textAlign: "center",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});
