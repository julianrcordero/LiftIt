import { PlateVals } from "../enums/plateVals";

export const getPlateWeight = (color: string, isKG: boolean) => {
  switch (color) {
    case "red":
      return isKG ? PlateVals.RedKG : PlateVals.RedLB;
    case "blue":
      return isKG ? PlateVals.BlueKG : PlateVals.BlueLB;
    case "yellow":
      return isKG ? PlateVals.YellowKG : PlateVals.YellowLB;
    case "green":
      return isKG ? PlateVals.GreenKG : PlateVals.GreenLB;
    default:
      return 0;
  }
};
