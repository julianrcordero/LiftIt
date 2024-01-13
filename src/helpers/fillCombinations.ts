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
  plates: { color: string; kg: number; lb: number }[],
  combinations: {
    sum: number;
    words: string;
  }[],
  setCombinations: () => any
) => {
  const size = Math.pow(2, plates.length);
  let sum = 0;

  for (let i = 0; i < size; i++) {
    let words = "";
    sum = 45;

    let num = i.toString(2);
    num = "0000000000000000".substring(num.length) + num;

    // console.log("binary num = ", num);

    // for (let index = 0; index < num.length; index++) {
    //   console.log(parseInt(num.charAt(index), 0));
    // }

    for (let j = 0; j < plates.length; j++) {
      const thisChar = num.charAt(num.length - 1 - j);

    //   console.log("num[", j, "]", thisChar);
      const parsedInteger = parseInt(thisChar, 10);
    //   console.log("parsedInteger", parsedInteger);
      if (parsedInteger > 0) {
        sum += 2 * plates[j].lb;
        words += " - ".concat(String(plates[j].lb).concat(" pair"));
      }
    }
    console.log("add sum", sum);
    setCombinations([...combinations, { sum: sum, words: words }]);
  }
};
