export const fillCombinations = (
  plates: { color: string; kg: number; lb: number }[]
) => {
  const size = Math.pow(2, plates.length);
  let combinations = new Array<Array<string>>([]);

  for (let i = 0; i < size; i++) {
    let words = "";
    let sum = 45;

    let num = i.toString(2);
    num = "0000000000000000".substring(num.length) + num;

    for (let j = 0; j < plates.length; j++) {
      const thisChar = num.charAt(num.length - 1 - j);

      const parsedInteger = parseInt(thisChar, 10);
      if (parsedInteger > 0) {
        sum += 2 * plates[j].lb;
        words += " - ".concat(String(plates[j].lb).concat(" pair"));
      }
    }

    combinations[sum]
      ? combinations[sum].push(words)
      : (combinations[sum] = [words]);
  }
  return combinations;
};
