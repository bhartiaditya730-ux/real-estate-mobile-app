import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, spacing, typography } from '../theme';

interface FeatureItemProps {
  icon: string;
  label: string;
  value: string | number;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, label, value }) => (
  <View style={styles.container}>
    <View style={styles.iconWrap}>
      <Icon name={icon} size={20} color={colors.primary} />
    </View>
    <Text style={styles.value} numberOfLines={1}>
      {value}
    </Text>
    <Text style={styles.label} numberOfLines={1}>
      {label}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    minWidth: 70,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  value: {
    ...typography.label,
    color: colors.textPrimary,
  },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
});

export default React.memo(FeatureItem);
