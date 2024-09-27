import { SIZE_ITEM } from "@/lib/constants";
import { ThePoint } from "@/lib/interface";

export const generatePoint = (isPoints: number, maxWidth: number, maxHeight: number): ThePoint[] => {
  const maxW = maxWidth - SIZE_ITEM
  const maxH = maxHeight - SIZE_ITEM

  return Array.from({ length: isPoints }, (_, i) => ({
    value: i + 1,
    vectorX: Math.random() * maxW,
    vectorY: Math.random() * maxH,
    zIndex: isPoints - i,
    isHidden: false
  }))
}
