import { toast } from "react-hot-toast";
import { create } from "zustand";

interface SpringStore {
  springName: string;
  x: number;
  y: number;
  addSpring: (springName: string, x: number, y: number) => void;
  removeSpring: (springName: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useSpring = create<SpringStore>()((set, get) => ({
  springName: "",
  x: 0,
  y: 0,
  addSpring: (springName: string, x: number, y: number) => {
    set({ springName, x, y });
    toast.success(`${springName} added to cart`);
  },
  removeSpring: (springName: string) => {
    set({ springName });
    toast.error(`${springName} removed from cart`);
  },
}));

export default useSpring;
