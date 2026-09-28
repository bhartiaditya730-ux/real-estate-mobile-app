import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
} from 'react-native';
import { colors, radius, spacing, typography, elevation } from '../theme';

interface ButtonPrimaryProps {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'outline' | 'secondary';
  style?: ViewStyle;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  style,
}) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        styles.base,
        variant === 'outline' && styles.outline,
        variant === 'secondary' && styles.secondary,
        isDisabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}>
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' ? colors.primary : colors.textInverse}
        />
      ) : (
        <Text
          style={[
            styles.text,
            variant === 'outline' && styles.outlineText,
            variant === 'secondary' && styles.secondaryText,
            isDisabled && styles.disabledText,
          ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md + 2,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
    ...elevation(2),
  },
  outline: {
    backgroundColor: colors.background,
    borderWidth: 1.5,
    borderColor: colors.primary,
    ...elevation(0),
  },
  secondary: {
    backgroundColor: colors.backgroundSecondary,
    ...elevation(0),
  },
  disabled: {
    backgroundColor: colors.disabledBackground,
    borderColor: colors.border,
    ...elevation(0),
  },
  text: {
    ...typography.button,
    color: colors.textInverse,
  },
  outlineText: {
    color: colors.primary,
  },
  secondaryText: {
    color: colors.textSecondary,
  },
  disabledText: {
    color: colors.disabled,
  },
});

export default React.memo(ButtonPrimary);
