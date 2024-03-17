import { toast } from "react-hot-toast";
import { create } from "zustand";

interface MapTypeStore {
  mapType: string;
  setMapType: (mapType: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useMapType = create<MapTypeStore>((set, get) => ({
  mapType: "boundaryOfHill",
  setMapType: (mapType: string) => {
    set({ mapType });
    toast.success(`${mapType} added to cart`);
  },
}));

export default useMapType;