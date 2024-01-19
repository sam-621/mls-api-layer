export type PropertiesResponse = {
  total: number;
  listing: ListingPropertiesResponse[];
  map: MapPropertiesResponse[];
};

export type ListingPropertiesResponse = {
  id: string;
  price: number;
  image: string;
  squareFt: number;
  beds: number;
  baths: number;
  address: {
    name: string;
    city: string;
    stateOrdProvince: string;
    pc: string;
  };
  status: 'Active' | 'Pending';
};

export type MapPropertiesResponse = {
  id: string;
  price: number;
  image: string;
  squareFt: number;
  address: {
    name: string;
    city: string;
    stateOrdProvince: string;
    pc: string;
  };
  latitude: number;
  longitude: number;
  status: 'Active' | 'Pending';
};
