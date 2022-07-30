import { useDeviceViewport, useLogger } from "../../hooks";
import { TypographyProps } from "./typography";

//5 2xl
//4 xl
//3 lg
//2 md
//1 sm

//6 h1
//5 h2
//4 h3
//3 h4
//2 h5
//1 h6

// 2xl + h1 = 11, 2xl + h6 = 6, sm + h1 = 7

// sm + h1 = 7, sm + h6 = 2

//11 text-7xl
// ...
//6 text-2xl
//5 text-xl
//4 text-lg
//3 text-base
//2 text-sm
//1 text-xs

const VIEWPORT_MAPPING = {
  "2xl": 5,
  xl: 4,
  lg: 3,
  md: 2,
  sm: 1,
};

const TAG_MAPPING = {
  h1: 7,
  h2: 6,
  h3: 5,
  h4: 4,
  h5: 3,
  h6: 2,
  span: 1,
  p: 1,
};

const NORMALIZED_MAPPING: Record<number, string> = {
  11: "text-7xl",
  10: "text-6xl",
  9: "text-5xl",
  8: "text-4xl",
  7: "text-3xl",
  6: "text-2xl",
  5: "text-xl",
  4: "text-lg",
  3: "text-base",
  2: "text-sm",
  1: "text-xs",
};

export const useFontSizeBasedOnDeviceViewport = ({
  as = "span",
}: TypographyProps): string => {
  const logger = useLogger();
  const deviceViewport = useDeviceViewport() || "md";
  const tagValue = TAG_MAPPING[as];
  const viewportValue = VIEWPORT_MAPPING[deviceViewport];

  const totalValue = tagValue + viewportValue;

  const normalizedValue =
    (Object.keys(NORMALIZED_MAPPING).length * totalValue) /
    (Object.keys(VIEWPORT_MAPPING).length + Object.keys(TAG_MAPPING).length);

  try {
    const roundedValue = Math.round(normalizedValue);
    const returnValue = NORMALIZED_MAPPING[roundedValue];

    logger("useFontSizeBasedOnDeviceViewport", {
      returnValue,
      deviceViewport,
      tagValue,
      viewportValue,
      totalValue,
      normalizedValue,
      roundedValue,
    });

    return returnValue;
  } catch (err) {
    return "text-9xl";
  }
};
