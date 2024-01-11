import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { PlateVals } from "../enums/plateVals";

type Props = {
  barLength: number;
  color: string;
  isKG: boolean;
  isIWF: boolean;
};

export const Plate: FC<Props> = ({ barLength, color, isKG, isIWF }) => {
  let plateStyle = {};

  switch (color) {
    case "red":
      plateStyle = {
        ...styles.redPlate,
        height:
          barLength *
          (isIWF ? PlateVals.IWFBumperHeight : PlateVals.IPFRedHeight),
        width:
          barLength *
          (isKG
            ? isIWF
              ? PlateVals.IWFRedKGWidth
              : PlateVals.IPFRedKGWidth
            : isIWF
            ? PlateVals.IWFRedLBWidth
            : PlateVals.IPFRedLBWidth),
      };
      break;
    case "blue":
      plateStyle = {
        ...styles.bluePlate,
        height:
          barLength *
          (isIWF ? PlateVals.IWFBumperHeight : PlateVals.IPFBlueHeight),
        width:
          barLength *
          (isKG
            ? isIWF
              ? PlateVals.IWFBlueKGWidth
              : PlateVals.IPFBlueKGWidth
            : isIWF
            ? PlateVals.IWFBlueLBWidth
            : PlateVals.IPFBlueLBWidth),
      };
      break;
    case "yellow":
      plateStyle = {
        ...styles.yellowPlate,
        height:
          barLength *
          (isIWF ? PlateVals.IWFBumperHeight : PlateVals.IPFYellowHeight),
        width:
          barLength *
          (isKG
            ? isIWF
              ? PlateVals.IWFYellowKGWidth
              : PlateVals.IPFYellowKGWidth
            : isIWF
            ? PlateVals.IWFYellowLBWidth
            : PlateVals.IPFYellowLBWidth),
      };
      break;
    case "green":
      plateStyle = {
        ...styles.greenPlate,
        height:
          barLength *
          (isIWF ? PlateVals.IWFBumperHeight : PlateVals.IPFGreenHeight),
        width:
          barLength *
          (isKG
            ? isIWF
              ? PlateVals.IWFGreenKGWidth
              : PlateVals.IPFGreenKGWidth
            : isIWF
            ? PlateVals.IWFGreenLBWidth
            : PlateVals.IPFGreenLBWidth),
      };
      break;
    default:
      break;
  }

  return (
    <View
      style={[isIWF ? styles.iwfPlate : styles.ipfPlate, plateStyle]}
    ></View>
  );
};

const styles = StyleSheet.create({
  ipfPlate: {
    borderRadius: 1,
    borderWidth: 0.25,
  },
  iwfPlate: {
    borderRadius: 3.5,
    borderWidth: 0.25,
  },
  bluePlate: {
    backgroundColor: "blue",
    borderColor: "royalblue",
  },
  greenPlate: {
    backgroundColor: "olive",
    borderColor: "green",
  },
  redPlate: {
    backgroundColor: "crimson",
    borderColor: "red",
  },
  yellowPlate: {
    backgroundColor: "gold",
    borderColor: "yellow",
  },
});
