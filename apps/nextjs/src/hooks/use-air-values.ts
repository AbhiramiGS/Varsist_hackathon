import { toast } from "react-hot-toast";
import { create } from "zustand";

interface AirValuesStore {
  airValues: Record<
    string,
    {
      Acetone: number;
      AirQuality: string;
      CO: number;
      CO2: number;
      Ethanol: number;
      HeatIndex: number;
      Humidity: number;
      NH4: number;
      Temperature: number;
      Toluene: number;
    }
  >;
  addAirValues: (
    receivedData: Record<
      string,
      {
        Acetone: number;
        AirQuality: string;
        CO: number;
        CO2: number;
        Ethanol: number;
        HeatIndex: number;
        Humidity: number;
        NH4: number;
        Temperature: number;
        Toluene: number;
      }
    >,
  ) => void;
//   removeAirValues: (AirQuality: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useAirValues = create<AirValuesStore>((set, get) => ({
  airValues: {},
  addAirValues: (
    receivedData: Record<
      string,
      {
        Acetone: number;
        AirQuality: string;
        CO: number;
        CO2: number;
        Ethanol: number;
        HeatIndex: number;
        Humidity: number;
        NH4: number;
        Temperature: number;
        Toluene: number;
      }
    >,
  ) => {
    set(
      (state) =>
        (state.airValues = {
          ...state.airValues,
          ...receivedData,
        }),
    );

    toast.success(`${Object.keys(receivedData)[0]} added to cart`);
  },
  //   removeAirValues: (AirQuality: string) => {
  //     set({ AirQuality });
  //     toast.error(`${AirQuality} removed from cart`);
  //   },
}));

export default useAirValues;