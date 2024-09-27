import { ThePoint } from "@/lib/interface";

export const generatePoint = (isPoints: number): ThePoint[] => {
  return Array.from({ length: isPoints }, (_, i) => ({
    value: i + 1,
    vectorX: Math.random() * 90,
    vectorY: Math.random() * 90,
    zIndex: isPoints - i,
    isHidden: false,
  }));
};
