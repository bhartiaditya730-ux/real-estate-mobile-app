import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, spacing, typography } from '../theme';
import ButtonPrimary from './ButtonPrimary';

interface EmptyStateProps {
  icon?: string;
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'home-outline',
  title,
  message,
  actionLabel,
  onAction,
}) => (
  <View style={styles.container}>
    <Icon name={icon} size={64} color={colors.textMuted} />
    <Text style={styles.title}>{title}</Text>
    {message ? <Text style={styles.message}>{message}</Text> : null}
    {actionLabel && onAction ? (
      <ButtonPrimary
        title={actionLabel}
        onPress={onAction}
        style={styles.button}
      />
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxxl,
  },
  title: {
    ...typography.h3,
    color: colors.textPrimary,
    marginTop: spacing.lg,
    textAlign: 'center',
  },
  message: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  button: {
    marginTop: spacing.xl,
    minWidth: 160,
  },
});

export default React.memo(EmptyState);
