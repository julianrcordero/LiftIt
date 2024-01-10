import { StatusBar } from "expo-status-bar";
import React from "react";
import { useEffect, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { PlateWeights } from "./src/enums/plateWeights";
import { MyButton } from "./src/components/MyButton";

const windowDimensions = Dimensions.get("window");
// const screenDimensions = Dimensions.get("screen");

export default function App() {
  const [barLength, setbarLength] = useState(windowDimensions.width * 0.85);

  const [barDiameter, setBarDiameter] = useState(barLength * 0.012727272727273);

  const [sleeveDiameter, setSleeveDiameter] = useState(
    barLength * 0.022727272727273
  );

  const [flangeDiameter, setFlangeDiameter] = useState(
    barLength * 0.035454545454545
  );

  const [loadableSleeveLength, setLoadableSleeveLength] = useState(
    barLength * 0.188636363636364
  );

  const [flangeWidth, setFlangeWidth] = useState(barLength * 0.013636363636364);

  const [plates, setPlates] = useState<
    { color: string; kg: number; lb: number }[]
  >([]);

  const [totalWeight, setTotalWeight] = useState<number>(20);

  const [isKG, setIsKG] = useState(true);

  // useEffect(() => {
  //   const subscription = Dimensions.addEventListener(
  //     "change",
  //     ({ window, screen }) => {
  //       setDimensions({ window, screen });
  //     }
  //   );
  //   return () => subscription?.remove();
  // });

  useEffect(() => {
    const sumPlates = plates.reduce(
      (partialSum, a) => partialSum + (isKG ? a.kg : a.lb),
      0
    );
    setTotalWeight((isKG ? 20 : 45) + sumPlates * 2);
  }, [isKG, plates]);

  const updatePlates = (newPlateColor: string) => {
    setPlates([
      ...plates,
      {
        color: newPlateColor,
        kg: getPlateWeight(newPlateColor, false),
        lb: getPlateWeight(newPlateColor, true),
      },
    ]);
  };

  const removeOutside = () => {
    setPlates(plates.slice(0, -1));
  };

  const clearBar = () => {
    setPlates([]);
    setTotalWeight(20);
  };

  const Shaft = (props: any) => {
    return (
      <View
        style={[
          styles.shaft,
          {
            width: barLength,
            height: barDiameter,
          },
        ]}
      >
        {props.children}
      </View>
    );
  };

  const Sleeve = (props: any) => {
    return (
      <View
        style={[
          styles.sleeve,
          {
            height: sleeveDiameter,
            width: loadableSleeveLength + flangeWidth,
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

  const Flange = () => {
    return (
      <View
        style={[
          styles.flange,
          {
            height: flangeDiameter,
            width: flangeWidth,
          },
        ]}
      ></View>
    );
  };

  const Knurling = () => {
    return (
      <View
        style={{
          alignItems: "center",
          // justifyContent: "center",
          flexDirection: "row",
          height: "100%",
        }}
      >
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

  const RedPlate = () => {
    return (
      <View
        style={[
          styles.plate,
          styles.redPlate,
          {
            height: barLength * 0.204545454545455,
            width: barLength * 0.026363636363636,
          },
        ]}
      ></View>
    );
  };

  const BluePlate = () => {
    return (
      <View
        style={[
          styles.plate,
          styles.bluePlate,
          {
            height: barLength * 0.204545454545455,
            width: barLength * 0.022727272727273,
          },
        ]}
      ></View>
    );
  };

  const YellowPlate = () => {
    return (
      <View
        style={[
          styles.plate,
          styles.yellowPlate,
          {
            height: barLength * 0.204545454545455,
            width: barLength * 0.017727272727273,
          },
        ]}
      ></View>
    );
  };

  const GreenPlate = () => {
    return (
      <View
        style={[
          styles.plate,
          styles.greenPlate,
          {
            height: barLength * 0.204545454545455,
            width: barLength * 0.015909090909091,
          },
        ]}
      ></View>
    );
  };

  const getPlateWeight = (color: string, isLB: boolean) => {
    switch (color) {
      case "red":
        return isLB ? PlateWeights.RedLB : PlateWeights.RedKG;
      case "blue":
        return isLB ? PlateWeights.BlueLB : PlateWeights.BlueKG;
      case "yellow":
        return isLB ? PlateWeights.YellowLB : PlateWeights.YellowKG;
      case "green":
        return isLB ? PlateWeights.GreenLB : PlateWeights.GreenKG;
      default:
        return 0;
    }
  };
  const getPlate = (color: string, index: number) => {
    switch (color) {
      case "red":
        return <RedPlate key={index}/>;
      case "blue":
        return <BluePlate key={index}/>;
      case "yellow":
        return <YellowPlate key={index}/>;
      case "green":
        return <GreenPlate key={index}/>;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          height: barLength * 0.204545454545455,
          justifyContent: "center",
        }}
      >
        <Shaft>
          <Sleeve left={true}>
            <Flange />
            {plates.map((x, i) => {
              return getPlate(x.color,i);
            })}
          </Sleeve>
          <Knurling />
          <Sleeve left={false}>
            <Flange />
            {plates.map((x,i) => {
              return getPlate(x.color, i);
            })}
          </Sleeve>
        </Shaft>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text>WEIGHT TOTAL : </Text>
        <Text style={{ fontSize: 24 }}>{totalWeight}</Text>
        <MyButton
          title={String(isKG ? "KG" : "LB")}
          onPress={() => setIsKG(!isKG)}
        />
      </View>
      <View style={styles.buttonRow}>
        <MyButton
          title={isKG ? PlateWeights.RedKG : PlateWeights.RedLB}
          onPress={() => updatePlates("red")}
        />
        <MyButton
          title={isKG ? PlateWeights.BlueKG : PlateWeights.BlueLB}
          onPress={() => updatePlates("blue")}
        />
        <MyButton
          title={isKG ? PlateWeights.YellowKG : PlateWeights.YellowLB}
          onPress={() => updatePlates("yellow")}
        />
        <MyButton
          title={isKG ? PlateWeights.GreenKG : PlateWeights.GreenLB}
          onPress={() => updatePlates("green")}
        />
        <MyButton
          title="REMOVE"
          onPress={removeOutside}
          disabled={plates.length === 0}
        />
        <MyButton title="CLEAR" onPress={clearBar} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bluePlate: {
    backgroundColor: "blue",
    borderColor: "royalblue",
  },
  buttonRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  flange: {
    borderWidth: 0.25,
    borderColor: "#9EA3A8",
    borderRadius: 1,
    backgroundColor: "#DBE2E9",
  },
  greenPlate: {
    backgroundColor: "olive",
    borderColor: "green",
  },
  knurling: { height: "100%", backgroundColor: "gainsboro" },
  plate: {
    borderRadius: 3.5,
    borderWidth: 0.25,
  },
  redPlate: {
    backgroundColor: "crimson",
    borderColor: "red",
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
  yellowPlate: {
    backgroundColor: "gold",
    borderColor: "yellow",
  },
});
