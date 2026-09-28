import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { colors, radius, spacing, elevation } from '../theme';

interface LoadingCardProps {
  height?: number;
  width?: number | `${number}%`;
  style?: StyleProp<ViewStyle>;
}

const LoadingCard: React.FC<LoadingCardProps> = ({
  height = 200,
  width = '100%',
  style,
}) => (
  <View style={[styles.card, { height, width }, style]}>
    <View style={styles.shimmerTop} />
    <View style={styles.shimmerLine} />
    <View style={[styles.shimmerLine, styles.shimmerShort]} />
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: radius.lg,
    padding: spacing.lg,
    ...elevation(1),
    overflow: 'hidden',
  },
  shimmerTop: {
    flex: 1,
    backgroundColor: colors.backgroundTertiary,
    borderRadius: radius.md,
    marginBottom: spacing.md,
  },
  shimmerLine: {
    height: 14,
    backgroundColor: colors.backgroundTertiary,
    borderRadius: radius.xs,
    marginBottom: spacing.sm,
  },
  shimmerShort: {
    width: '60%',
  },
});

export default React.memo(LoadingCard);
