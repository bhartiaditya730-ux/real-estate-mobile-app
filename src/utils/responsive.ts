import { Dimensions, ScaledSize } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const screen = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
};

export const isTablet = (): boolean => {
  const aspectRatio = SCREEN_HEIGHT / SCREEN_WIDTH;
  return SCREEN_WIDTH >= 768 || (SCREEN_WIDTH >= 600 && aspectRatio < 1.6);
};

export const getCardWidth = (horizontalPadding = 32, gap = 16): number => {
  if (isTablet()) {
    return (SCREEN_WIDTH - horizontalPadding - gap * 2) / 3;
  }
  return SCREEN_WIDTH * 0.72;
};

export const getGridColumns = (): number => (isTablet() ? 3 : 2);

export const onDimensionChange = (
  callback: (dimensions: { window: ScaledSize; screen: ScaledSize }) => void,
) => Dimensions.addEventListener('change', callback);

export default { screen, isTablet, getCardWidth, getGridColumns };
