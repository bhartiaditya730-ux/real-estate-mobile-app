/**
 * Design System — Color Palette
 *
 * Central source of truth for all colors used across the Property Listing
 * & Details module. Every screen and component imports from here to ensure
 * visual consistency with the premium real-estate design language.
 */

export const colors = {
  // Brand & Primary
  primary: '#2563EB',
  primaryDark: '#1D4ED8',
  primaryLight: '#DBEAFE',

  // Accent
  accent: '#F59E0B',
  accentLight: '#FEF3C7',

  // Backgrounds
  background: '#FFFFFF',
  backgroundSecondary: '#F8FAFC',
  backgroundTertiary: '#F1F5F9',

  // Surface & Cards
  surface: '#FFFFFF',
  card: '#FFFFFF',

  // Text
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  textTertiary: '#94A3B8',
  textInverse: '#FFFFFF',
  textMuted: '#CBD5E1',

  // Borders & Dividers
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  divider: '#E2E8F0',

  // Status — Property badges (read-only)
  statusAvailable: '#10B981',
  statusAvailableBg: '#D1FAE5',
  statusSold: '#EF4444',
  statusSoldBg: '#FEE2E2',
  statusPending: '#F59E0B',
  statusPendingBg: '#FEF3C7',
  statusForSale: '#2563EB',
  statusForSaleBg: '#DBEAFE',
  statusForRent: '#8B5CF6',
  statusForRentBg: '#EDE9FE',

  // Semantic
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',

  // Interactive
  favorite: '#EF4444',
  favoriteInactive: '#CBD5E1',
  rating: '#F59E0B',
  overlay: 'rgba(15, 23, 42, 0.5)',
  overlayLight: 'rgba(15, 23, 42, 0.3)',

  // Shadows (used with elevation)
  shadow: '#0F172A',

  // Disabled states
  disabled: '#94A3B8',
  disabledBackground: '#F1F5F9',
} as const;

export type ColorKey = keyof typeof colors;

export default colors;
