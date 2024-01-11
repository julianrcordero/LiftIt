import React, { FC } from "react";
import { StyleSheet, View } from "react-native";

export const Shaft = (props: any) => {
  return (
    <View
      style={[
        styles.shaft,
        {
          width: props.length,
          height: props.diameter,
        },
      ]}
    >
      {props.children}
    </View>
  );
};

export const Sleeve = (props: any) => {
  return (
    <View
      style={[
        styles.sleeve,
        {
          height: props.diameter,
          width: props.width,
          borderRightWidth: 0.25,
        },
        props.left && {
          transform: [{ rotate: "180deg" }],
        },
      ]}
    >
      {props.children}
    </View>
  );
};

export const Flange = (props: any) => {
  return (
    <View
      style={[
        styles.flange,
        {
          height: props.diameter,
          width: props.width,
        },
      ]}
    ></View>
  );
};

type Props = {
  barLength: number;
};

export const Knurling: FC<Props> = ({ barLength }) => {
  return (
    <View style={styles.knurlingRow}>
      <View
        style={[styles.knurling, { width: barLength * 0.088636363636364 }]}
      />
      <View style={{ width: barLength * 0.002272727272727 }} />
      <View
        style={[styles.knurling, { width: barLength * 0.111363636363636 }]}
      />
      <View style={{ width: barLength * 0.068181818181818 }} />
      <View
        style={[styles.knurling, { width: barLength * 0.054545454545455 }]}
      />
      <View style={{ width: barLength * 0.068181818181818 }} />
      <View
        style={[styles.knurling, { width: barLength * 0.111363636363636 }]}
      />
      <View style={{ width: barLength * 0.002272727272727 }} />
      <View
        style={[styles.knurling, { width: barLength * 0.088636363636364 }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flange: {
    borderWidth: 0.25,
    borderColor: "#9EA3A8",
    borderRadius: 1,
    backgroundColor: "#DBE2E9",
  },
  knurling: { height: "98%", backgroundColor: "gainsboro" },
  knurlingRow: {
    alignItems: "center",
    flexDirection: "row",
    height: "100%",
  },
  shaft: {
    borderTopWidth: 0.25,
    borderBottomWidth: 0.25,
    borderColor: "#9EA3A8",
    backgroundColor: "#DBE2E9",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sleeve: {
    borderTopWidth: 0.25,
    borderBottomWidth: 0.25,
    borderColor: "#9EA3A8",
    borderRadius: 1.5,
    backgroundColor: "#DBE2E9",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
