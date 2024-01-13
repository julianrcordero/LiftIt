// void fillValues(vector<double> &plates, vector<pair<double, string>> &values)
// {
//   double size = pow(2, plates.size());
//   double sum = 0;
//   for (unsigned int integer = 0; integer < size; integer++)	//for each binary number in plates.size()
//   {
//     std::ostringstream oss;
//     sum = 45;
//     bitset<16> x(integer);		//each integer up to num of plates becomes binary 16 just because, I guess

//     for (unsigned int i = plates.size() - 1; i >= 0; i--)
//     {
//       if (x[i])
//       {
//         sum += 2 * plates[i];
//         oss << " - " << plates[i] << "pair";
//       }
//     }
//     values.push_back(make_pair(sum, oss.str()));
//   }
// }

export const fillCombinations = (
  plates: { color: string; kg: number; lb: number }[]
) => {
  const size = Math.pow(2, plates.length);
  let sum = 0;
  //   let combinations = new Map<number, string[]>(); //{ sum: number; words: string }[] = [];
  let combinations = new Array<Array<string>>();

  for (let i = 0; i < size; i++) {
    let words = "";
    sum = 45;

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
    // combinations.has(sum)
    //   ? combinations.get(sum)?.push(words)
    //   : combinations.set(sum, [words]);
  }
  return combinations;
  //   return new Map(Array.from(combinations).sort((a, b) => a[0] - b[0]));
};
