import React, { useCallback, useRef, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ListRenderItem,
  TouchableOpacity,
  Modal,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ImageSourcePropType } from 'react-native';
import PropertyImage from './PropertyImage';
import { colors, spacing } from '../theme';

interface GallerySliderProps {
  images: ImageSourcePropType[];
  height?: number;
  enableFullscreen?: boolean;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const GallerySlider: React.FC<GallerySliderProps> = ({
  images,
  height = 280,
  enableFullscreen = true,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const listRef = useRef<FlatList>(null);

  const onScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const index = Math.round(
        e.nativeEvent.contentOffset.x / SCREEN_WIDTH,
      );
      setActiveIndex(index);
    },
    [],
  );

  const renderItem: ListRenderItem<ImageSourcePropType> = useCallback(
    ({ item }) => (
      <PropertyImage
        source={item}
        style={{ width: SCREEN_WIDTH, height }}
      />
    ),
    [height],
  );

  const keyExtractor = useCallback(
    (_: ImageSourcePropType, index: number) => `slide-${index}`,
    [],
  );

  if (!images.length) {
    return (
      <View style={[styles.empty, { height }]}>
        <Icon name="image-outline" size={48} color={colors.textMuted} />
      </View>
    );
  }

  const slider = (
    <FlatList
      ref={listRef}
      data={images}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onScroll={onScroll}
      scrollEventThrottle={16}
      getItemLayout={(_, index) => ({
        length: SCREEN_WIDTH,
        offset: SCREEN_WIDTH * index,
        index,
      })}
    />
  );

  return (
    <View>
      {enableFullscreen ? (
        <TouchableOpacity
          activeOpacity={0.95}
          onPress={() => setFullscreen(true)}>
          {slider}
        </TouchableOpacity>
      ) : (
        slider
      )}
      <View style={styles.dots}>
        {images.map((_, i) => (
          <View
            key={`dot-${i}`}
            style={[styles.dot, i === activeIndex && styles.dotActive]}
          />
        ))}
      </View>

      <Modal visible={fullscreen} animationType="fade" transparent={false}>
        <StatusBar barStyle="light-content" />
        <View style={styles.fullscreen}>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => setFullscreen(false)}>
            <Icon name="close" size={28} color={colors.textInverse} />
          </TouchableOpacity>
          <FlatList
            data={images}
            renderItem={({ item }) => (
              <PropertyImage
                source={item}
                style={styles.fullscreenImage}
              />
            )}
            keyExtractor={keyExtractor}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  empty: {
    backgroundColor: colors.backgroundTertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xs,
    marginTop: spacing.md,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.border,
  },
  dotActive: {
    width: 18,
    backgroundColor: colors.primary,
  },
  fullscreen: {
    flex: 1,
    backgroundColor: colors.textPrimary,
  },
  fullscreenImage: {
    width: SCREEN_WIDTH,
    height: '100%',
  },
  closeBtn: {
    position: 'absolute',
    top: 48,
    right: spacing.lg,
    zIndex: 10,
    padding: spacing.sm,
  },
});

export default React.memo(GallerySlider);
