import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Property } from '../types/property.types';
import { colors, spacing, typography } from '../theme';
import { formatArea } from '../utils/formatters';

interface PropertyInfoProps {
  property: Property;
  compact?: boolean;
}

const PropertyInfo: React.FC<PropertyInfoProps> = ({ property, compact }) => (
  <View style={[styles.row, compact && styles.rowCompact]}>
    {property.bedrooms > 0 && (
      <View style={styles.item}>
        <Icon name="bed-outline" size={compact ? 14 : 16} color={colors.textSecondary} />
        <Text style={[styles.text, compact && styles.textCompact]}>
          {property.bedrooms} Beds
        </Text>
      </View>
    )}
    {property.bathrooms > 0 && (
      <View style={styles.item}>
        <Icon name="water-outline" size={compact ? 14 : 16} color={colors.textSecondary} />
        <Text style={[styles.text, compact && styles.textCompact]}>
          {property.bathrooms} Baths
        </Text>
      </View>
    )}
    <View style={styles.item}>
      <Icon name="resize-outline" size={compact ? 14 : 16} color={colors.textSecondary} />
      <Text style={[styles.text, compact && styles.textCompact]}>
        {formatArea(property.area)}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  rowCompact: {
    gap: spacing.sm,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  text: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  textCompact: {
    fontSize: 11,
  },
});

export default React.memo(PropertyInfo);
