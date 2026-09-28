import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Dimensions,
  StatusBar,
  ListRenderItem,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {
  PropertyHeader,
  PropertyImage,
  GallerySlider,
  LoadingCard,
  EmptyState,
} from '../components';
import { useProperty } from '../hooks/useProperty';
import { RootStackParamList } from '../navigation/types';
import { getImageSource } from '../utils/formatters';
import { getGridColumns } from '../utils/responsive';
import { colors, spacing, radius } from '../theme';
import { ImageSourcePropType } from 'react-native';

type GalleryRouteProp = RouteProp<RootStackParamList, 'PropertyGallery'>;

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const GRID_GAP = spacing.sm;
const COLUMNS = getGridColumns();
const GRID_ITEM_SIZE =
  (SCREEN_WIDTH - spacing.lg * 2 - GRID_GAP * (COLUMNS - 1)) / COLUMNS;

const PropertyGalleryScreen: React.FC = () => {
  const { params } = useRoute<GalleryRouteProp>();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { property, loading, error } = useProperty(params.propertyId);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  const imageSources = useMemo(
    () => property?.images.map(key => getImageSource(key)) ?? [],
    [property?.images],
  );

  const handleBack = useCallback(() => navigation.goBack(), [navigation]);

  const renderGridItem: ListRenderItem<ImageSourcePropType> = useCallback(
    ({ item, index }) => (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => setPreviewIndex(index)}
        style={styles.gridItem}>
        <PropertyImage source={item} style={styles.gridImage} borderRadius={radius.md} />
      </TouchableOpacity>
    ),
    [],
  );

  const keyExtractor = useCallback(
    (_: ImageSourcePropType, index: number) => `grid-${index}`,
    [],
  );

  if (loading) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <LoadingCard height={280} />
        <View style={styles.gridLoading}>
          <LoadingCard height={GRID_ITEM_SIZE} width={GRID_ITEM_SIZE} />
          <LoadingCard height={GRID_ITEM_SIZE} width={GRID_ITEM_SIZE} />
        </View>
      </View>
    );
  }

  if (error || !property) {
    return (
      <EmptyState
        title={error ?? 'Gallery unavailable'}
        actionLabel="Go Back"
        onAction={handleBack}
      />
    );
  }

  return (
    <View style={styles.container}>
      <PropertyHeader
        title="Property Gallery"
        showBack
        onBackPress={handleBack}
      />

      <View style={styles.sliderSection}>
        <GallerySlider images={imageSources} height={240} enableFullscreen />
      </View>

      <FlatList
        data={imageSources}
        renderItem={renderGridItem}
        keyExtractor={keyExtractor}
        numColumns={COLUMNS}
        contentContainerStyle={[
          styles.grid,
          { paddingBottom: insets.bottom + spacing.xl },
        ]}
        columnWrapperStyle={COLUMNS > 1 ? styles.gridRow : undefined}
        showsVerticalScrollIndicator={false}
        initialNumToRender={6}
        maxToRenderPerBatch={8}
        windowSize={8}
        ListEmptyComponent={
          <EmptyState title="No images available" icon="images-outline" />
        }
      />

      <Modal
        visible={previewIndex !== null}
        animationType="fade"
        transparent={false}
        onRequestClose={() => setPreviewIndex(null)}>
        <StatusBar barStyle="light-content" />
        <View style={styles.preview}>
          <TouchableOpacity
            style={[styles.closePreview, { top: insets.top + spacing.md }]}
            onPress={() => setPreviewIndex(null)}>
            <Icon name="close" size={28} color={colors.textInverse} />
          </TouchableOpacity>
          {previewIndex !== null && (
            <GallerySlider
              images={imageSources}
              height={Dimensions.get('window').height}
              enableFullscreen={false}
            />
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  sliderSection: {
    marginBottom: spacing.lg,
  },
  grid: {
    paddingHorizontal: spacing.lg,
  },
  gridRow: {
    gap: GRID_GAP,
    marginBottom: GRID_GAP,
  },
  gridItem: {
    width: GRID_ITEM_SIZE,
    height: GRID_ITEM_SIZE,
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  gridLoading: {
    flexDirection: 'row',
    gap: spacing.sm,
    padding: spacing.lg,
  },
  preview: {
    flex: 1,
    backgroundColor: colors.textPrimary,
  },
  closePreview: {
    position: 'absolute',
    right: spacing.lg,
    zIndex: 10,
    padding: spacing.sm,
  },
});

export default PropertyGalleryScreen;
