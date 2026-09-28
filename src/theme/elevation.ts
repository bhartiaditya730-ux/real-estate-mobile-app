import { Platform, ViewStyle } from 'react-native';
import colors from './colors';

type ElevationLevel = 0 | 1 | 2 | 3 | 4;

export const elevation = (level: ElevationLevel): ViewStyle => {
  if (Platform.OS === 'android') {
    return { elevation: level };
  }

  const shadowOpacity = [0, 0.06, 0.1, 0.14, 0.18][level];
  const shadowRadius = [0, 4, 8, 12, 16][level];
  const shadowOffset = [0, 1, 2, 4, 6][level];

  return {
    shadowColor: colors.shadow,
    shadowOpacity,
    shadowRadius,
    shadowOffset: { width: 0, height: shadowOffset },
  };
};

export default elevation;
