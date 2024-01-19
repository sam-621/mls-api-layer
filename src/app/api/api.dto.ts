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
}

export class SearchCriteriaDto {
  address: string;
  city: string;
  cp: string;
  limit: number;
}
