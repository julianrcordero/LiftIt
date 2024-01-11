import React from "react";
import { useEffect, useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { PlateVals } from "./src/enums/plateVals";
import { MyButton } from "./src/components/MyButton";
import { Flange, Knurling, Shaft, Sleeve } from "./src/components/Barbell";
import { Plate } from "./src/components/Plates";
import { getPlateWeight } from "./src/helpers/getPlateWeights";

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
  const [isIWF, setIsIWF] = useState(true);

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
        kg: getPlateWeight(newPlateColor, true),
        lb: getPlateWeight(newPlateColor, false),
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

  const displayPlates = () => {
    return plates.map((x, i) => {
      return (
        <Plate barLength={barLength} color={x.color} isKG={isKG} isIWF={isIWF} key={i} />
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <MyButton
        title={(isIWF ? "WEIGHTLIFTING" : "POWERLIFTING") + " MODE"}
        onPress={() => setIsIWF(!isIWF)}
      />
      <View
        style={{
          height: barLength * 0.204545454545455,
          justifyContent: "center",
        }}
      >
        <Shaft length={barLength} diameter={barDiameter}>
          <Sleeve
            left={true}
            diameter={sleeveDiameter}
            width={loadableSleeveLength + flangeWidth}
          >
            <Flange diameter={flangeDiameter} width={flangeWidth} />
            {displayPlates()}
          </Sleeve>
          <Knurling barLength={barLength} />
          <Sleeve
            left={false}
            diameter={sleeveDiameter}
            width={loadableSleeveLength + flangeWidth}
          >
            <Flange diameter={flangeDiameter} width={flangeWidth} />
            {displayPlates()}
          </Sleeve>
        </Shaft>
      </View>
      <View style={styles.weightAmountRow}>
        <Text>WEIGHT TOTAL : </Text>
        <Text style={styles.totalWeight}>{totalWeight}</Text>
        <MyButton
          title={String(isKG ? "KG" : "LB")}
          onPress={() => setIsKG(!isKG)}
        />
      </View>
      <View style={styles.buttonRow}>
        <MyButton
          title={getPlateWeight("green", isKG)}
          onPress={() => updatePlates("green")}
          color={"olive"}
        />
        <MyButton
          title={getPlateWeight("yellow", isKG)}
          onPress={() => updatePlates("yellow")}
          color={"gold"}
        />
        <MyButton
          title={getPlateWeight("blue", isKG)}
          onPress={() => updatePlates("blue")}
          color={"blue"}
        />
        <MyButton
          title={getPlateWeight("red", isKG)}
          onPress={() => updatePlates("red")}
          color={"crimson"}
        />
        <MyButton
          title="REMOVE"
          onPress={removeOutside}
          disabled={plates.length < 1}
        />
        <MyButton
          title="CLEAR"
          onPress={clearBar}
          disabled={plates.length < 1}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  totalWeight: { fontSize: 24, marginRight: 10 },
  weightAmountRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
