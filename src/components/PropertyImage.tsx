import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  ImageSourcePropType,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, radius } from '../theme';

interface PropertyImageProps {
  source: ImageSourcePropType;
  style?: ViewStyle;
  borderRadius?: number;
}

const PropertyImage: React.FC<PropertyImageProps> = ({
  source,
  style,
  borderRadius = radius.lg,
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <View style={[styles.container, { borderRadius }, style]}>
      {!hasError ? (
        <Image
          source={source}
          style={[styles.image, { borderRadius }]}
          resizeMode="cover"
          onError={() => setHasError(true)}
        />
      ) : (
        <View style={[styles.fallback, { borderRadius }]}>
          <Icon name="image-outline" size={32} color={colors.textTertiary} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: colors.backgroundTertiary,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  fallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundTertiary,
  },
});

export default React.memo(PropertyImage);
