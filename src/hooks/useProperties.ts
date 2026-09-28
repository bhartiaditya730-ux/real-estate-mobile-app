import { useCallback, useEffect, useMemo, useState } from 'react';
import { Property } from '../types/property.types';
import {
  getAllProperties,
  getFeaturedProperties,
  getRecentProperties,
} from '../services/propertyService';

interface UsePropertiesResult {
  properties: Property[];
  featured: Property[];
  recent: Property[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useProperties = (): UsePropertiesResult => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [featured, setFeatured] = useState<Property[]>([]);
  const [recent, setRecent] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [all, featuredList, recentList] = await Promise.all([
        getAllProperties(),
        getFeaturedProperties(),
        getRecentProperties(),
      ]);
      setProperties(all);
      setFeatured(featuredList);
      setRecent(recentList);
    } catch {
      setError('Failed to load properties. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return useMemo(
    () => ({ properties, featured, recent, loading, error, refetch: fetchData }),
    [properties, featured, recent, loading, error, fetchData],
  );
};

export default useProperties;
