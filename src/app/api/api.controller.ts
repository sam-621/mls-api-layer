import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

import * as MLS_DATA from '../data.json';
import { MlsAPIResponse } from '../mls/mls.type';
import { PropertiesDto, SearchCriteriaDto } from './api.dto';
import { MlsService } from '../mls/mls.service';
import {
  ListingPropertiesResponse,
  MapPropertiesResponse,
  PropertiesResponse,
} from './api.types';

@Controller('/properties')
export class ApiController {
  constructor(private readonly mlsService: MlsService) {}
  @Post()
  getProperties(
    @Body()
    input: PropertiesDto,
  ): PropertiesResponse {
    const mlsData: MlsAPIResponse = MLS_DATA as any;

    let properties = this.mlsService.filterByBounds(
      mlsData.value,
      input.bounds,
    );

    if (input.price) {
      properties = this.mlsService.filterByPrice(properties, input.price);
    }

    if (input.forSale !== undefined) {
      properties = this.mlsService.filterByForSale(properties, input.forSale);
    }

    if (input.beds) {
      properties = this.mlsService.filterByBeds(properties, input.beds);
    }

    if (input.baths) {
      properties = this.mlsService.filterByBaths(properties, input.baths);
    }

    if (input.propertyType) {
      properties = this.mlsService.filterByPropertyType(
        properties,
        input.propertyType,
      );
    }

    if (input.squareFeet) {
      properties = this.mlsService.filterBySquareFeet(
        properties,
        input.squareFeet,
      );
    }

    if (input.yearBuilt) {
      properties = this.mlsService.filterByYearBuilt(
        properties,
        input.yearBuilt,
      );
    }

    if (input.lotSize) {
      properties = this.mlsService.filterByLotSize(properties, input.lotSize);
    }

    if (input.status) {
      properties = this.mlsService.filterByStatus(properties, input.status);
    }

    if (input.garageSpaces) {
      properties = this.mlsService.filterByGarageSpaces(
        properties,
        input.garageSpaces,
      );
    }

    if (input.stories) {
      properties = this.mlsService.filterByStories(properties, input.stories);
    }

    if (input.hasAssociation !== undefined) {
      properties = this.mlsService.filterByHasAssociation(
        properties,
        input.hasAssociation,
      );
    }

    if (input.hasPool) {
      properties = this.mlsService.filterByHasPool(properties);
    }

    if (input.hasWaterfront) {
      properties = this.mlsService.filterByHasWaterfront(properties);
    }

    if (input.hasAC) {
      properties = this.mlsService.filterByHasAC(properties);
    }

    if (input.hasHeater) {
      properties = this.mlsService.filterByHasHeater(properties);
    }

    if (input.description) {
      properties = this.mlsService.filterByDescription(
        properties,
        input.description,
      );
    }

    const { skip, take } = input.pagination;

    return {
      total: properties.length,
      listing: properties
        .slice(Number(skip), Number(skip) + Number(take))
        .map((p) => ({
          id: p.ListingKey,
          price: p.ListPrice ?? 0,
          image: Array.isArray(p.Media) ? p.Media[0]?.MediaURL : '',
          squareFt: p?.BuildingAreaTotal || p?.LotSizeSquareFeet,
          beds: p.BedroomsTotal ?? 0,
          baths: p.BathroomsTotalInteger ?? 0,
          address: {
            name: p.UnparsedAddress,
            city: p.City,
            stateOrdProvince: p.StateOrProvince,
            pc: p.PostalCode,
          },
          isForSale:
            p.ListingAgreement === 'Exclusive Right To Sell' ||
            p.ListingAgreement === 'Exclusive Agency',
          status: p.MFR_PreviousStatus as ListingPropertiesResponse['status'],
        })),
      map: properties.map((p) => ({
        id: p.ListingKey,
        price: p.ListPrice ?? 0,
        image: Array.isArray(p.Media) ? p.Media[0]?.MediaURL : '',
        squareFt: p?.BuildingAreaTotal || p?.LotSizeSquareFeet,
        address: {
          name: p.UnparsedAddress,
          city: p.City,
          stateOrdProvince: p.StateOrProvince,
          pc: p.PostalCode,
        },
        beds: p.BedroomsTotal ?? 0,
        baths: p.BathroomsTotalInteger ?? 0,
        latitude: p.Latitude,
        longitude: p.Longitude,
        status: p.MFR_PreviousStatus as MapPropertiesResponse['status'],
        isForSale:
          p.ListingAgreement === 'Exclusive Right To Sell' ||
          p.ListingAgreement === 'Exclusive Agency',
      })),
    };
  }

  @Get('/unique/:id')
  async getPropertyById(@Param() params: { id: string }) {
    const mlsData: MlsAPIResponse = MLS_DATA as any;

    const result = mlsData.value.find(
      (property) => property.ListingKey === params.id,
    );

    return result;
  }

  @Get('/search')
  search(@Query() params: SearchCriteriaDto) {
    const mlsData: MlsAPIResponse = MLS_DATA as any;

    const result = this.mlsService.searchByCriteria(mlsData.value, params);

    return result.map((p) => ({
      id: p.ListingKey,
      address: p.UnparsedAddress,
      city: p.City,
      cp: p.PostalCode,
      listingPrice: p.ListPrice,
      isLease: p.ListingAgreement === 'Exclusive Right To Lease',
      image: Array.isArray(p.Media) ? p.Media[0]?.MediaURL : '',
    }));
  }
}
