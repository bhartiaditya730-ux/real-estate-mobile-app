import { ImageSourcePropType } from 'react-native';

export const PROPERTY_IMAGES: Record<string, ImageSourcePropType> = {
  property1: require('../assets/images/property1.jpg'),
  property2: require('../assets/images/property2.jpg'),
  property3: require('../assets/images/property3.jpg'),
  property4: require('../assets/images/property4.jpg'),
  property5: require('../assets/images/property5.jpg'),
  property6: require('../assets/images/property6.jpg'),
  property7: require('../assets/images/property7.jpg'),
  property8: require('../assets/images/property8.jpg'),
};

export const DEFAULT_PROPERTY_IMAGE = PROPERTY_IMAGES.property1;
