import { ListingOrder, PropertyStatus } from '../mls/mls.type';

export class PropertiesDto {
  bounds: {
    minLat: string;
    maxLat: string;
    minLng: string;
    maxLng: string;
  };
  price?: {
    min: string;
    max: string;
  };
  /**
   * If false, is a rental property
   */
  forSale: boolean;
  beds?: number;
  baths?: number;
  propertyType?: string[];
  pagination: {
    take: number;
    skip: number;
  };
  squareFeet?: {
    min: number;
    max: number;
  };
  lotSize?: {
    min: number;
    max: number;
  };
  yearBuilt?: {
    min: number;
    max: number;
  };
  order?: ListingOrder;
  status?: PropertyStatus[];
  garageSpaces?: number;
  stories?: number;
  hasAssociation?: boolean;
  hasPool?: boolean;
  hasWaterfront?: boolean;
  hasAC?: boolean;
  hasHeater?: boolean;
  description?: string;
}

export class SearchCriteriaDto {
  address: string;
  city: string;
  cp: string;
  limit: number;
}
