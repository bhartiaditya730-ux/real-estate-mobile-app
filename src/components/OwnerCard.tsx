import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { PropertyOwner } from '../types/property.types';
import { colors, radius, spacing, typography, elevation } from '../theme';

interface OwnerCardProps {
  owner: PropertyOwner;
}

const OwnerCard: React.FC<OwnerCardProps> = ({ owner }) => (
  <View style={styles.card}>
    <View style={styles.avatar}>
      <Icon name="person" size={28} color={colors.primary} />
    </View>
    <View style={styles.info}>
      <Text style={styles.name} numberOfLines={1}>
        {owner.name}
      </Text>
      <Text style={styles.role} numberOfLines={1}>
        {owner.role}
      </Text>
      <Text style={styles.contact} numberOfLines={1}>
        {owner.phone}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: radius.lg,
    padding: spacing.lg,
    ...elevation(1),
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.lg,
  },
  info: {
    flex: 1,
  },
  name: {
    ...typography.label,
    fontSize: 16,
    color: colors.textPrimary,
  },
  role: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  contact: {
    ...typography.bodySmall,
    color: colors.primary,
    marginTop: spacing.xs,
  },
});

export default React.memo(OwnerCard);
