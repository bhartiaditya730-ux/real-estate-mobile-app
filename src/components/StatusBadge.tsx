import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PropertyStatus, STATUS_CONFIG } from '../constants/status';
import { radius, spacing, typography } from '../theme';

interface StatusBadgeProps {
  status: PropertyStatus | string;
  size?: 'sm' | 'md';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const config = STATUS_CONFIG[status as PropertyStatus] ?? {
    label: status,
    color: colorsFallback.text,
    backgroundColor: colorsFallback.bg,
  };

  return (
    <View
      style={[
        styles.badge,
        size === 'sm' && styles.badgeSm,
        { backgroundColor: config.backgroundColor },
      ]}>
      <Text
        style={[
          styles.text,
          size === 'sm' && styles.textSm,
          { color: config.color },
        ]}
        numberOfLines={1}>
        {config.label}
      </Text>
    </View>
  );
};

const colorsFallback = {
  text: '#64748B',
  bg: '#F1F5F9',
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    alignSelf: 'flex-start',
  },
  badgeSm: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  text: {
    ...typography.label,
    fontSize: 12,
  },
  textSm: {
    fontSize: 10,
  },
});

export default React.memo(StatusBadge);
