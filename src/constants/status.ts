import colors from '../theme/colors';

export const PROPERTY_STATUSES = [
  'Available',
  'Sold',
  'Pending',
  'For Sale',
  'For Rent',
] as const;

export type PropertyStatus = (typeof PROPERTY_STATUSES)[number];

export const STATUS_CONFIG: Record<
  PropertyStatus,
  { label: string; color: string; backgroundColor: string }
> = {
  Available: {
    label: 'Available',
    color: colors.statusAvailable,
    backgroundColor: colors.statusAvailableBg,
  },
  Sold: {
    label: 'Sold',
    color: colors.statusSold,
    backgroundColor: colors.statusSoldBg,
  },
  Pending: {
    label: 'Pending',
    color: colors.statusPending,
    backgroundColor: colors.statusPendingBg,
  },
  'For Sale': {
    label: 'For Sale',
    color: colors.statusForSale,
    backgroundColor: colors.statusForSaleBg,
  },
  'For Rent': {
    label: 'For Rent',
    color: colors.statusForRent,
    backgroundColor: colors.statusForRentBg,
  },
};
