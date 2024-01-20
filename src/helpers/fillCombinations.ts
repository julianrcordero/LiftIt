import PlateType from "../types/Plate";

export const fillCombinations = (plates: PlateType[]) => {
  const size = Math.pow(2, plates.length);
  let combinations = new Array<Array<Array<PlateType>>>([]);

  for (let i = 0; i < size; i++) {
    let words: Array<PlateType> = [];
    let sum = 20;

    let num = i.toString(2);
    num = "0000000000000000".substring(num.length) + num;
    console.log("binary num is", num);

    for (let j = 0; j < plates.length; j++) {
      const thisChar = num.charAt(num.length - 1 - j);

      const parsedInteger = parseInt(thisChar, 10);
      if (parsedInteger > 0) {
        sum += 2 * plates[j].kg;
        words.push(plates[j]);
        // words += " - ".concat(String(plates[j].lb).concat(" pair"));
      }
    }
    // if (combinations[i]) {
    //   console.log("adding", words);
    //   combinations[i].push(words);
    // } else combinations[i] = [words];
    combinations[sum]
      ? combinations[sum].push(words)
      : (combinations[sum] = [words]);
  }
  return combinations;
};
