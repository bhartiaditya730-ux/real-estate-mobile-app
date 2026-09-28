import React from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';
import { colors, typography } from '../theme';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onActionPress?: () => void;
  style?: TextStyle;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  style,
}) => (
  <>
    <Text style={[styles.title, style]} numberOfLines={1}>
      {title}
    </Text>
    {subtitle ? (
      <Text style={styles.subtitle} numberOfLines={2}>
        {subtitle}
      </Text>
    ) : null}
  </>
);

const styles = StyleSheet.create({
  title: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: 4,
  },
});

export default React.memo(SectionTitle);
