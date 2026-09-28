import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { colors, typography } from '../theme';
import { formatPrice } from '../utils/formatters';

interface PriceTagProps {
  price: number;
  status?: string;
  size?: 'sm' | 'md' | 'lg';
  style?: TextStyle;
}

const PriceTag: React.FC<PriceTagProps> = ({
  price,
  status,
  size = 'md',
  style,
}) => (
  <Text
    style={[
      styles.base,
      size === 'sm' && styles.sm,
      size === 'lg' && styles.lg,
      style,
    ]}
    numberOfLines={1}>
    {formatPrice(price, status)}
  </Text>
);

const styles = StyleSheet.create({
  base: {
    ...typography.price,
    color: colors.primary,
  },
  sm: {
    fontSize: 15,
    lineHeight: 20,
  },
  lg: {
    ...typography.priceLarge,
  },
});

export default React.memo(PriceTag);
