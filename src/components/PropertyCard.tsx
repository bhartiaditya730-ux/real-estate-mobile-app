import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Property } from '../types/property.types';
import PropertyImage from './PropertyImage';
import PriceTag from './PriceTag';
import StatusBadge from './StatusBadge';
import PropertyInfo from './PropertyInfo';
import { getImageSource } from '../utils/formatters';
import { getCardWidth } from '../utils/responsive';
import { colors, radius, spacing, typography, elevation } from '../theme';

interface PropertyCardProps {
  property: Property;
  variant?: 'horizontal' | 'vertical';
  onPress: (property: Property) => void;
  style?: ViewStyle;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  variant = 'vertical',
  onPress,
  style,
}) => {
  const handlePress = useCallback(() => onPress(property), [onPress, property]);
  const isHorizontal = variant === 'horizontal';

  return (
    <TouchableOpacity
      style={[
        styles.card,
        isHorizontal && styles.cardHorizontal,
        isHorizontal && { width: getCardWidth() },
        style,
      ]}
      onPress={handlePress}
      activeOpacity={0.9}>
      <View style={[styles.imageWrap, isHorizontal && styles.imageWrapHorizontal]}>
        <PropertyImage
          source={getImageSource(property.thumbnail)}
          style={isHorizontal ? styles.imageHorizontal : styles.imageVertical}
        />
        <TouchableOpacity style={styles.favoriteBtn} activeOpacity={0.7}>
          <Icon name="heart-outline" size={20} color={colors.textInverse} />
        </TouchableOpacity>
        <View style={styles.statusWrap}>
          <StatusBadge status={property.status} size="sm" />
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.typeRow}>
          <Text style={styles.type} numberOfLines={1}>
            {property.propertyType}
          </Text>
          <View style={styles.ratingRow}>
            <Icon name="star" size={14} color={colors.rating} />
            <Text style={styles.rating}>{property.rating.toFixed(1)}</Text>
          </View>
        </View>

        <Text style={styles.title} numberOfLines={2}>
          {property.title}
        </Text>

        <View style={styles.locationRow}>
          <Icon name="location-outline" size={14} color={colors.textSecondary} />
          <Text style={styles.location} numberOfLines={1}>
            {property.location}, {property.city}
          </Text>
        </View>

        <PropertyInfo property={property} compact />

        <PriceTag price={property.price} status={property.status} size="sm" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    overflow: 'hidden',
    marginBottom: spacing.lg,
    ...elevation(2),
  },
  cardHorizontal: {
    marginRight: spacing.lg,
    marginBottom: 0,
  },
  imageWrap: {
    position: 'relative',
  },
  imageWrapHorizontal: {
    height: 180,
  },
  imageVertical: {
    height: 200,
    width: '100%',
  },
  imageHorizontal: {
    height: 180,
    width: '100%',
  },
  favoriteBtn: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.overlayLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusWrap: {
    position: 'absolute',
    bottom: spacing.md,
    left: spacing.md,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.sm,
  },
  typeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  type: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
    textTransform: 'uppercase',
    flex: 1,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    ...typography.label,
    color: colors.textPrimary,
  },
  title: {
    ...typography.label,
    fontSize: 16,
    color: colors.textPrimary,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  location: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    flex: 1,
  },
});

export default React.memo(PropertyCard);
