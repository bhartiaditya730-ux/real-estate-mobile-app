import { useCallback, useEffect, useMemo, useState } from 'react';
import { Property } from '../types/property.types';
import { getPropertyById } from '../services/propertyService';

interface UsePropertyResult {
  property: Property | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useProperty = (id: string): UsePropertyResult => {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperty = useCallback(async () => {
    if (!id) {
      setError('Invalid property ID');
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await getPropertyById(id);
      if (!result) {
        setError('Property not found');
        setProperty(null);
      } else {
        setProperty(result);
      }
    } catch {
      setError('Failed to load property details.');
      setProperty(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProperty();
  }, [fetchProperty]);

  return useMemo(
    () => ({ property, loading, error, refetch: fetchProperty }),
    [property, loading, error, fetchProperty],
  );
};

export default useProperty;
