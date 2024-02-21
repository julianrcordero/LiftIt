import React from "react";
import { useEffect, useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MyButton } from "./src/components/MyButton";
import { Flange, Knurling, Shaft, Sleeve } from "./src/components/Barbell";
import { Plate } from "./src/components/Plates";
import { getPlateWeight } from "./src/helpers/getPlateWeights";
import { fillCombinations } from "./src/helpers/fillCombinations";
import PlateType from "./src/types/Plate";

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

  const [plates, setPlates] = useState<PlateType[]>([]);

  const [totalWeight, setTotalWeight] = useState<number>(20);

  const [isKG, setIsKG] = useState(true);
  const [isIWF, setIsIWF] = useState(true);

  const [isCombinationMaker, setIsCombinationMaker] = useState(false);
  const [combinations, setCombinations] = useState<
    Array<Array<Array<PlateType>>>
  >([]);
  const [selectedWeight, setSelectedWeight] = useState(45);
  const [selectedCombo, setSelectedCombo] = useState(0);
  const [useEffectCount, setUseEffectCount] = useState(0);

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
    setCombinations(fillCombinations(plates, isKG));
    console.log("reload", useEffectCount);
    setUseEffectCount(useEffectCount + 1);
  }, [isKG, plates]);

  // useEffect(() => {
  //   combinations?.forEach((value, key) => {
  //     // console.log(key, value);
  //   });
  // }, [combinations]);

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
  };

  const displayPlates = () => {
    return plates.map((x, i) => {
      return (
        <Plate
          barLength={barLength}
          color={x.color}
          isKG={isKG}
          isIWF={isIWF}
          key={i}
        />
      );
    });
  };

  const fillTotalPicker = () => {
    return combinations?.map((value, key) => {
      let sum = 45;
      value[0]?.forEach((v) => {
        sum += v.lb * 2;
        // console.log("sum is now", sum);
      });
      //get first combo since they're all same

      return (
        key > 0 && (
          <Picker.Item label={String(isKG ? key : sum)} value={key} key={key} />
        )
      );
    });
  };

  const fillCombinationPicker = () => {
    return combinations[selectedWeight]?.map((value, index) => {
      const weightArray: string[] = [];
      value.forEach((v) => weightArray.push(String(isKG ? v.kg : v.lb)));

      return (
        <Picker.Item label={weightArray.toString()} value={index} key={index} />
      );
    });
  };

  const displayPlateCombination = () => {
    return (
      combinations[selectedWeight] &&
      combinations[selectedWeight][selectedCombo]?.map((v, i) => {
        return (
          <Plate
            barLength={barLength}
            color={v.color}
            isKG={isKG}
            isIWF={isIWF}
            key={i}
          />
        );
      })
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.weightAmountRow}>
          <MyButton
            title={(isIWF ? "WEIGHTLIFTING" : "POWERLIFTING") + " MODE"}
            onPress={() => setIsIWF(!isIWF)}
            style={{ marginRight: 20, width: 180 }}
          />
          <MyButton
            title={isCombinationMaker ? "COMBINATION MAKER" : "TOTALER"}
            onPress={() => setIsCombinationMaker(!isCombinationMaker)}
            style={{ width: 180 }}
          />
        </View>

        <View
          style={{
            height: barLength * 0.204545454545455,
            justifyContent: "center",
            borderWidth: 1,
          }}
        >
          {isCombinationMaker ? (
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  width: 150,
                  height: 100,
                }}
              >
                <Picker
                  selectedValue={selectedWeight}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedWeight(itemValue)
                  }
                >
                  {fillTotalPicker()}
                </Picker>
              </View>
              <View
                style={{
                  borderWidth: 2,
                  justifyContent: "center",
                  width: 260,
                  height: 100,
                }}
              >
                <Picker
                  selectedValue={selectedCombo}
                  onValueChange={(itemValue, itemIndex) => {
                    // console.log(itemValue, "selected");
                    setSelectedCombo(itemIndex);
                  }}
                  onLayout={() => setSelectedCombo(0)}
                >
                  {fillCombinationPicker()}
                </Picker>
              </View>
              <View
                style={{
                  flex: 1,
                  paddingLeft: 50,
                }}
              >
                <Shaft length={50} diameter={barDiameter}>
                  <View style={{ width: 50 }}></View>
                  <Sleeve
                    left={false}
                    diameter={sleeveDiameter}
                    width={loadableSleeveLength + flangeWidth}
                  >
                    <Flange diameter={flangeDiameter} width={flangeWidth} />
                    {displayPlateCombination()}
                  </Sleeve>
                </Shaft>
              </View>
            </View>
          ) : (
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
          )}
        </View>
        <View style={styles.weightAmountRow}>
          <View
            style={{
              width: 180,
              alignItems: "center",
              flexDirection: "row",
              borderWidth: 1,
            }}
          >
            <Text>WEIGHT TOTAL : </Text>
            <Text style={styles.totalWeight}>{totalWeight}</Text>
          </View>
          <MyButton
            title={String(isKG ? "KG" : "LB")}
            onPress={() => setIsKG(!isKG)}
            square
          />
        </View>
        <View style={styles.buttonRow}>
          <MyButton
            title={getPlateWeight("green", isKG)}
            onPress={() => updatePlates("green")}
            color={"olive"}
            square
          />
          <MyButton
            title={getPlateWeight("yellow", isKG)}
            onPress={() => updatePlates("yellow")}
            color={"gold"}
            square
          />
          <MyButton
            title={getPlateWeight("blue", isKG)}
            onPress={() => updatePlates("blue")}
            color={"blue"}
            square
          />
          <MyButton
            title={getPlateWeight("red", isKG)}
            onPress={() => updatePlates("red")}
            color={"crimson"}
            square
          />
          <MyButton
            title="REMOVE"
            onPress={removeOutside}
            disabled={plates.length < 1}
            style={{ width: 180 }}
          />
          <MyButton
            title="CLEAR"
            onPress={clearBar}
            disabled={plates.length < 1}
            style={{ width: 180 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonRow: {
    backgroundColor: "grey",
    flexDirection: "row",
    height: 45,
    justifyContent: "space-evenly",
    width: "100%",
  },
  container: {
    borderWidth: 1,
    borderColor: "red",
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-around",
  },
  totalWeight: { fontSize: 24, marginRight: 10 },
  weightAmountRow: {
    backgroundColor: "green",
    flexDirection: "row",
    alignItems: "center",
    height: 45,
  },
});
