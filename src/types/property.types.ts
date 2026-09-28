import { PropertyStatus } from '../constants/status';

export interface PropertyOwner {
  name: string;
  phone: string;
  email: string;
  avatar?: string;
  role: string;
}

export interface PropertyCoordinates {
  latitude: number;
  longitude: number;
}

export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  city: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  area: number;
  status: PropertyStatus;
  category: string;
  rating: number;
  owner: PropertyOwner;
  images: string[];
  thumbnail: string;
  amenities: string[];
  coordinates: PropertyCoordinates;
  featured?: boolean;
  propertyType: string;
}
