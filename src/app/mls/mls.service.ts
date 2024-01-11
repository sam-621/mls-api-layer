import { Injectable } from '@nestjs/common';
import { Value } from './mls.type';
import { PropertiesDto } from '../api/api.dto';

@Injectable()
export class MlsService {
  filterByBounds(values: Value[], input: PropertiesDto['bounds']): Value[] {
    const { minLat, maxLat, minLng, maxLng } = input;

    return values.filter((property) => {
      const { Latitude, Longitude } = property;

      return (
        Latitude >= parseFloat(minLat) &&
        Latitude <= parseFloat(maxLat) &&
        Longitude >= parseFloat(minLng) &&
        Longitude <= parseFloat(maxLng)
      );
    });
  }

  filterByPrice(values: Value[], input: PropertiesDto['price']): Value[] {
    const { min, max } = input;

    return values.filter((property) => {
      const { ListPrice } = property;

      return ListPrice >= parseFloat(min) && ListPrice <= parseFloat(max);
    });
  }

  filterByForSale(values: Value[], input: PropertiesDto['forSale']): Value[] {
    return values.filter((property) => {
      const { ListingAgreement } = property;

      return input
        ? ListingAgreement === 'Exclusive Right To Sell' ||
            ListingAgreement === 'Exclusive Agency'
        : ListingAgreement !== 'Exclusive Right To Lease';
    });
  }

  filterByBeds(values: Value[], input: PropertiesDto['beds']): Value[] {
    return values.filter((property) => {
      const { BedroomsTotal } = property;

      return BedroomsTotal >= input;
    });
  }

  filterByBaths(values: Value[], input: PropertiesDto['baths']): Value[] {
    return values.filter((property) => {
      const { BathroomsTotalInteger } = property;

      return BathroomsTotalInteger >= input;
    });
  }

  filterByPropertyType(
    values: Value[],
    input: PropertiesDto['propertyType'],
  ): Value[] {
    return values.filter((property) => {
      const { PropertyType } = property;

      return input.includes(PropertyType);
    });
  }
}
