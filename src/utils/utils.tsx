import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const scale = (uiElementPx: number): number => {
  const deviceWidthDp = width > height ? height : width;
  const uiWidthPx = 375;
  const rate = 1;
  return ((uiElementPx * deviceWidthDp) / uiWidthPx) * rate;
};
