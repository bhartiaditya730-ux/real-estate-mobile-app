import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ListRenderItem,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import {
  PropertyCard,
  SectionTitle,
  LoadingCard,
  EmptyState,
} from '../components';
import { useProperties } from '../hooks/useProperties';
import { Property } from '../types/property.types';
import { CATEGORIES, CategoryId } from '../constants/categories';
import { RootStackParamList } from '../navigation/types';
import { colors, spacing, radius, typography, elevation } from '../theme';

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PropertyListing'
>;

const PropertyListingScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const { properties, featured, loading, error, refetch } =
    useProperties();
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [refreshing, setRefreshing] = useState(false);

  const filteredProperties = useMemo(() => {
    if (selectedCategory === 'all') {
      return properties;
    }
    return properties.filter(p => p.category === selectedCategory);
  }, [properties, selectedCategory]);

  const handlePropertyPress = useCallback(
    (property: Property) => {
      navigation.navigate('PropertyDetails', { propertyId: property.id });
    },
    [navigation],
  );

  const renderFeaturedItem: ListRenderItem<Property> = useCallback(
    ({ item }) => (
      <PropertyCard
        property={item}
        variant="horizontal"
        onPress={handlePropertyPress}
      />
    ),
    [handlePropertyPress],
  );

  const renderVerticalItem: ListRenderItem<Property> = useCallback(
    ({ item }) => (
      <PropertyCard property={item} onPress={handlePropertyPress} />
    ),
    [handlePropertyPress],
  );

  const featuredKeyExtractor = useCallback((item: Property) => item.id, []);
  const verticalKeyExtractor = useCallback((item: Property) => item.id, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const listHeader = useMemo(
    () => (
      <>
        <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
          <View>
            <Text style={styles.greeting}>Find Your</Text>
            <Text style={styles.greetingBold}>Dream Property</Text>
          </View>
          <TouchableOpacity style={styles.notificationBtn}>
            <Icon name="notifications-outline" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchBar}>
          <Icon name="search-outline" size={20} color={colors.textSecondary} />
          <TextInput
            placeholder="Search location, property type..."
            placeholderTextColor={colors.textTertiary}
            style={styles.searchInput}
            editable={false}
          />
          <TouchableOpacity style={styles.filterBtn}>
            <Icon name="options-outline" size={20} color={colors.textInverse} />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categories}
          style={styles.categoriesScroll}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryChip,
                selectedCategory === cat.id && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(cat.id)}>
              <Icon
                name={cat.icon}
                size={18}
                color={
                  selectedCategory === cat.id
                    ? colors.textInverse
                    : colors.textSecondary
                }
              />
              <Text
                style={[
                  styles.categoryLabel,
                  selectedCategory === cat.id && styles.categoryLabelActive,
                ]}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {featured.length > 0 && (
          <View style={styles.section}>
            <SectionTitle title="Featured Properties" />
            <FlatList
              data={featured}
              renderItem={renderFeaturedItem}
              keyExtractor={featuredKeyExtractor}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredList}
              nestedScrollEnabled
            />
          </View>
        )}

        <View style={styles.section}>
          <SectionTitle
            title="Recent Properties"
            subtitle={`${filteredProperties.length} properties available`}
          />
        </View>
      </>
    ),
    [
      insets.top,
      selectedCategory,
      featured,
      filteredProperties.length,
      renderFeaturedItem,
      featuredKeyExtractor,
    ],
  );

  if (loading && !refreshing) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <LoadingCard height={60} />
        <LoadingCard height={48} style={{ marginTop: spacing.lg }} />
        <LoadingCard height={200} style={{ marginTop: spacing.lg }} />
        <LoadingCard height={200} style={{ marginTop: spacing.lg }} />
      </View>
    );
  }

  if (error) {
    return (
      <EmptyState
        icon="alert-circle-outline"
        title="Something went wrong"
        message={error}
        actionLabel="Retry"
        onAction={refetch}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredProperties}
        renderItem={renderVerticalItem}
        keyExtractor={verticalKeyExtractor}
        ListHeaderComponent={listHeader}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: insets.bottom + spacing.xl },
        ]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <EmptyState
            title="No properties found"
            message="Try selecting a different category"
          />
        }
        initialNumToRender={6}
        maxToRenderPerBatch={8}
        windowSize={10}
        removeClippedSubviews
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  greeting: {
    ...typography.body,
    color: colors.textSecondary,
  },
  greetingBold: {
    ...typography.h1,
    color: colors.textPrimary,
  },
  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginBottom: spacing.lg,
    gap: spacing.sm,
    ...elevation(1),
  },
  searchInput: {
    flex: 1,
    ...typography.body,
    color: colors.textPrimary,
    padding: 0,
  },
  filterBtn: {
    backgroundColor: colors.primary,
    width: 36,
    height: 36,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoriesScroll: {
    marginBottom: spacing.lg,
    marginHorizontal: -spacing.lg,
  },
  categories: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.backgroundSecondary,
    gap: spacing.xs,
    marginRight: spacing.sm,
  },
  categoryChipActive: {
    backgroundColor: colors.primary,
  },
  categoryLabel: {
    ...typography.label,
    color: colors.textSecondary,
  },
  categoryLabelActive: {
    color: colors.textInverse,
  },
  section: {
    marginBottom: spacing.lg,
  },
  featuredList: {
    paddingTop: spacing.md,
    paddingRight: spacing.lg,
  },
});

export default PropertyListingScreen;
