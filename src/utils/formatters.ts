import { ImageSourcePropType } from 'react-native';
import { DEFAULT_PROPERTY_IMAGE, PROPERTY_IMAGES } from '../data/propertyImages';

export const getImageSource = (key?: string): ImageSourcePropType => {
  if (!key) {
    return DEFAULT_PROPERTY_IMAGE;
  }
  return PROPERTY_IMAGES[key] ?? DEFAULT_PROPERTY_IMAGE;
};

export const formatPrice = (price: number, status?: string): string => {
  if (status === 'For Rent') {
    return `₹${price.toLocaleString('en-IN')}/mo`;
  }
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`;
  }
  if (price >= 100000) {
    return `₹${(price / 100000).toFixed(2)} L`;
  }
  return `₹${price.toLocaleString('en-IN')}`;
};

export const formatArea = (area: number): string => `${area.toLocaleString('en-IN')} sq.ft`;

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength).trim()}...`;
};
