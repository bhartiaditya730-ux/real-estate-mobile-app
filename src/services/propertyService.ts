import propertiesData from '../data/properties.json';
import { Property } from '../types/property.types';

const properties: Property[] = propertiesData as Property[];

const simulateDelay = (ms = 300): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

export const getAllProperties = async (): Promise<Property[]> => {
  await simulateDelay();
  return [...properties];
};

export const getPropertyById = async (id: string): Promise<Property | null> => {
  await simulateDelay(200);
  return properties.find(p => p.id === id) ?? null;
};

export const getFeaturedProperties = async (): Promise<Property[]> => {
  await simulateDelay(200);
  return properties.filter(p => p.featured);
};

export const getRecentProperties = async (): Promise<Property[]> => {
  await simulateDelay(200);
  return [...properties].reverse().slice(0, 10);
};

export const getPropertiesByCategory = async (
  category: string,
): Promise<Property[]> => {
  await simulateDelay(200);
  if (category === 'all') {
    return [...properties];
  }
  return properties.filter(p => p.category === category);
};

export default {
  getAllProperties,
  getPropertyById,
  getFeaturedProperties,
  getRecentProperties,
  getPropertiesByCategory,
};
