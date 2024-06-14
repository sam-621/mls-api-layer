import { Injectable } from '@nestjs/common';
import { ListingOrder, Value } from './mls.type';
import { PropertiesDto, SearchCriteriaDto } from '../api/api.dto';
import { MapPropertiesResponse } from '../api/api.types';
import { Media, Property } from '@prisma/client';

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

    if (!min) {
      return values.filter((property) => {
        const { ListPrice } = property;

        return ListPrice <= parseFloat(max);
      });
    }

    if (!max) {
      return values.filter((property) => {
        const { ListPrice } = property;

        return ListPrice >= parseFloat(min);
      });
    }

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
        : ListingAgreement === 'Exclusive Right To Lease';
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

  searchByCriteria(values: Value[], input: SearchCriteriaDto) {
    const { address, city, cp } = input;

    // we can return an empty array because this method is used in another endpoint
    if (!address && !city && !cp) return [];

    return values
      .filter((property) => {
        const { UnparsedAddress, City, PostalCode } = property;

        return (
          UnparsedAddress.toLowerCase().includes(address.toLowerCase()) ||
          City.toLowerCase().includes(city.toLowerCase()) ||
          PostalCode.toLowerCase().includes(cp.toLowerCase())
        );
      })
      .slice(0, input.limit);
  }

  filterBySquareFeet(
    values: Value[],
    input: PropertiesDto['squareFeet'],
  ): Value[] {
    const { min, max } = input;

    if (!min) {
      return values.filter((property) => {
        const { BuildingAreaTotal, LotSizeSquareFeet } = property;

        return (BuildingAreaTotal || LotSizeSquareFeet) <= max;
      });
    }

    if (!max) {
      return values.filter((property) => {
        const { BuildingAreaTotal, LotSizeSquareFeet } = property;

        return (BuildingAreaTotal || LotSizeSquareFeet) >= min;
      });
    }

    return values.filter((property) => {
      const { BuildingAreaTotal, LotSizeSquareFeet } = property;

      return (
        (BuildingAreaTotal || LotSizeSquareFeet) >= min &&
        (BuildingAreaTotal || LotSizeSquareFeet) <= max
      );
    });
  }

  filterByLotSize(values: Value[], input: PropertiesDto['lotSize']): Value[] {
    const { min, max } = input;

    if (!min) {
      return values.filter((property) => {
        const { LotSizeSquareFeet } = property;

        return LotSizeSquareFeet <= max;
      });
    }

    if (!max) {
      return values.filter((property) => {
        const { LotSizeSquareFeet } = property;

        return LotSizeSquareFeet >= min;
      });
    }

    return values.filter((property) => {
      const { LotSizeSquareFeet } = property;

      return LotSizeSquareFeet >= min && LotSizeSquareFeet <= max;
    });
  }

  filterByYearBuilt(
    values: Value[],
    input: PropertiesDto['yearBuilt'],
  ): Value[] {
    const { min, max } = input;

    if (!min) {
      return values.filter((property) => {
        const { YearBuilt } = property;

        return YearBuilt <= max;
      });
    }

    if (!max) {
      return values.filter((property) => {
        const { YearBuilt } = property;

        return YearBuilt >= min;
      });
    }

    return values.filter((property) => {
      const { YearBuilt } = property;

      return YearBuilt >= min && YearBuilt <= max;
    });
  }

  filterByStatus(values: Value[], input: PropertiesDto['status']): Value[] {
    return values.filter((property) => {
      const { MFR_PreviousStatus } = property;

      return input.includes(
        MFR_PreviousStatus as MapPropertiesResponse['status'],
      );
    });
  }

  filterByGarageSpaces(
    values: Value[],
    input: PropertiesDto['garageSpaces'],
  ): Value[] {
    return values.filter((property) => {
      const { GarageSpaces } = property;

      return GarageSpaces >= input;
    });
  }

  filterByStories(values: Value[], input: PropertiesDto['stories']): Value[] {
    return values.filter((property) => {
      const { StoriesTotal } = property;

      return StoriesTotal >= input;
    });
  }

  filterByHasAssociation(
    values: Value[],
    input: PropertiesDto['hasAssociation'],
  ): Value[] {
    return values.filter((property) => {
      const { AssociationYN } = property;

      return AssociationYN === input;
    });
  }

  filterByHasPool(values: Value[]): Value[] {
    return values.filter((property) => {
      const { PoolPrivateYN } = property;

      return !!PoolPrivateYN;
    });
  }

  filterByHasWaterfront(values: Value[]): Value[] {
    return values.filter((property) => {
      const { WaterfrontYN } = property;

      return !!WaterfrontYN;
    });
  }

  filterByHasAC(values: Value[]): Value[] {
    return values.filter((property) => {
      const { Cooling } = property;

      return !!Cooling;
    });
  }

  filterByHasHeater(values: Value[]): Value[] {
    return values.filter((property) => {
      const { Heating } = property;

      return !!Heating;
    });
  }

  filterByDescription(
    values: Value[],
    input: PropertiesDto['description'],
  ): Value[] {
    return values.filter((property) => {
      const { PublicRemarks } = property;

      return PublicRemarks.toLowerCase().includes(input);
    });
  }

  orderBy(values: (Property & { Media: Media[] })[], order: ListingOrder) {
    if (order === ListingOrder.HIGHEST_PRICE) {
      return values.sort(
        (a, b) =>
          (b.price as unknown as number) - (a.price as unknown as number),
      );
    }

    if (order === ListingOrder.LOWEST_PRICE) {
      return values.sort(
        (a, b) =>
          (a.price as unknown as number) - (b.price as unknown as number),
      );
    }

    if (order === ListingOrder.NEWEST) {
      return values.sort(
        (a, b) =>
          new Date(b.contractDate).getTime() -
          new Date(a.contractDate).getTime(),
      );
    }

    if (order === ListingOrder.OLDEST) {
      return values.sort(
        (a, b) =>
          new Date(a.contractDate).getTime() -
          new Date(b.contractDate).getTime(),
      );
    }

    if (order === ListingOrder.SQUARE_FEET) {
      return values.sort((a, b) => b.squareFt - a.squareFt);
    }
  }
}
