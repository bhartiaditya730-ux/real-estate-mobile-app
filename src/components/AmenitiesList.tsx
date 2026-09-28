import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, radius, spacing, typography } from '../theme';

interface AmenitiesListProps {
  amenities: string[];
  maxVisible?: number;
}

const AmenitiesList: React.FC<AmenitiesListProps> = ({
  amenities,
  maxVisible,
}) => {
  if (!amenities?.length) {
    return (
      <Text style={styles.empty}>No amenities listed</Text>
    );
  }

  const visible = maxVisible ? amenities.slice(0, maxVisible) : amenities;

  return (
    <View style={styles.container}>
      {visible.map(item => (
        <View key={item} style={styles.chip}>
          <Icon name="checkmark-circle" size={14} color={colors.success} />
          <Text style={styles.chipText} numberOfLines={1}>
            {item}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    gap: spacing.xs,
    maxWidth: '100%',
  },
  chipText: {
    ...typography.bodySmall,
    color: colors.textPrimary,
    flexShrink: 1,
  },
  empty: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
});

export default React.memo(AmenitiesList);
