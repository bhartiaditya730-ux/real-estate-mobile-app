import React, { useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {
  PropertyHeader,
  GallerySlider,
  PriceTag,
  StatusBadge,
  FeatureItem,
  OwnerCard,
  AmenitiesList,
  SectionTitle,
  ButtonPrimary,
  LoadingCard,
  EmptyState,
} from '../components';
import { useProperty } from '../hooks/useProperty';
import { RootStackParamList } from '../navigation/types';
import { getImageSource, formatArea } from '../utils/formatters';
import { colors, spacing, radius, typography, elevation } from '../theme';

type DetailsRouteProp = RouteProp<RootStackParamList, 'PropertyDetails'>;
type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PropertyDetails'
>;

const PropertyDetailsScreen: React.FC = () => {
  const { params } = useRoute<DetailsRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const { property, loading, error } = useProperty(params.propertyId);

  const imageSources = useMemo(
    () => property?.images.map(key => getImageSource(key)) ?? [],
    [property?.images],
  );

  const handleGalleryPress = useCallback(() => {
    if (property) {
      navigation.navigate('PropertyGallery', { propertyId: property.id });
    }
  }, [navigation, property]);

  const handleBack = useCallback(() => navigation.goBack(), [navigation]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingCard height={300} />
        <LoadingCard height={24} style={{ marginTop: spacing.lg }} />
        <LoadingCard height={16} style={{ marginTop: spacing.sm }} />
      </View>
    );
  }

  if (error || !property) {
    return (
      <EmptyState
        icon="alert-circle-outline"
        title={error ?? 'Property not found'}
        actionLabel="Go Back"
        onAction={handleBack}
      />
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}>
        <View style={styles.heroWrap}>
          <GallerySlider images={imageSources} height={320} enableFullscreen />
          <PropertyHeader
            showBack
            onBackPress={handleBack}
            transparent
            rightIcon="share-outline"
          />
        </View>

        <View style={styles.content}>
          <View style={styles.titleRow}>
            <View style={styles.titleCol}>
              <Text style={styles.title} numberOfLines={3}>
                {property.title}
              </Text>
              <View style={styles.locationRow}>
                <Icon name="location-outline" size={16} color={colors.textSecondary} />
                <Text style={styles.location} numberOfLines={2}>
                  {property.location}, {property.city}
                </Text>
              </View>
            </View>
            <StatusBadge status={property.status} />
          </View>

          <PriceTag price={property.price} status={property.status} size="lg" />

          <View style={styles.ratingRow}>
            <Icon name="star" size={18} color={colors.rating} />
            <Text style={styles.rating}>{property.rating.toFixed(1)}</Text>
            <Text style={styles.type}>• {property.propertyType}</Text>
          </View>

          <View style={styles.features}>
            {property.bedrooms > 0 && (
              <FeatureItem icon="bed-outline" label="Bedrooms" value={property.bedrooms} />
            )}
            {property.bathrooms > 0 && (
              <FeatureItem icon="water-outline" label="Bathrooms" value={property.bathrooms} />
            )}
            <FeatureItem icon="resize-outline" label="Area" value={formatArea(property.area)} />
            <FeatureItem icon="car-outline" label="Parking" value={property.parking} />
          </View>

          <View style={styles.section}>
            <SectionTitle title="Description" />
            <Text style={styles.description}>{property.description}</Text>
          </View>

          <View style={styles.section}>
            <SectionTitle title="Owner Information" />
            <OwnerCard owner={property.owner} />
          </View>

          <View style={styles.section}>
            <SectionTitle title="Amenities" />
            <AmenitiesList amenities={property.amenities} />
          </View>

          <View style={styles.section}>
            <SectionTitle title="Specifications" />
            <View style={styles.specsCard}>
              <SpecRow label="Property Type" value={property.propertyType} />
              <SpecRow label="Category" value={property.category} />
              <SpecRow label="Status" value={property.status} />
              <SpecRow label="City" value={property.city} />
              <SpecRow label="Total Area" value={formatArea(property.area)} />
              <SpecRow
                label="Coordinates"
                value={`${property.coordinates.latitude}, ${property.coordinates.longitude}`}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
        <ButtonPrimary
          title="View Gallery"
          onPress={handleGalleryPress}
          style={styles.footerBtn}
        />
        <ButtonPrimary
          title="Contact Owner"
          disabled
          variant="outline"
          style={styles.footerBtn}
        />
        <ButtonPrimary
          title="Schedule Visit"
          disabled
          variant="secondary"
          style={styles.footerBtnFull}
        />
      </View>
    </View>
  );
};

const SpecRow: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <View style={specStyles.row}>
    <Text style={specStyles.label}>{label}</Text>
    <Text style={specStyles.value} numberOfLines={2}>
      {value}
    </Text>
  </View>
);

const specStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  label: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    flex: 1,
  },
  value: {
    ...typography.label,
    color: colors.textPrimary,
    flex: 1,
    textAlign: 'right',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  heroWrap: {
    position: 'relative',
  },
  content: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  titleCol: {
    flex: 1,
  },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
    marginTop: spacing.sm,
  },
  location: {
    ...typography.body,
    color: colors.textSecondary,
    flex: 1,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  rating: {
    ...typography.label,
    color: colors.textPrimary,
  },
  type: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: radius.lg,
    padding: spacing.lg,
    ...elevation(1),
  },
  section: {
    gap: spacing.md,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
  },
  specsCard: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    ...elevation(4),
  },
  footerBtn: {
    flex: 1,
    minWidth: '45%',
  },
  footerBtnFull: {
    width: '100%',
  },
});

export default PropertyDetailsScreen;
