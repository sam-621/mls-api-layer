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
import { skip } from 'rxjs';

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

    const { skip, take } = input.pagination;

    return {
      listing: properties.slice(skip, take).map((p) => ({
        id: p.ListingKey,
        price: p.ListPrice,
        image: Array.isArray(p.Media) ? p.Media[0]?.MediaURL : '',
        squareFt: p.LotSizeSquareFeet,
        beds: p.BedroomsTotal,
        baths: p.BathroomsTotalInteger,
        address: {
          name: p.UnparsedAddress,
          city: p.City,
          stateOrdProvince: p.StateOrProvince,
          pc: p.PostalCode,
        },
        status: p.MFR_PreviousStatus as ListingPropertiesResponse['status'],
      })),
      map: properties.map((p) => ({
        id: p.ListingKey,
        price: p.ListPrice,
        image: Array.isArray(p.Media) ? p.Media[0]?.MediaURL : '',
        squareFt: p.LotSizeSquareFeet,
        address: {
          name: p.UnparsedAddress,
          city: p.City,
          stateOrdProvince: p.StateOrProvince,
          pc: p.PostalCode,
        },
        latitude: p.Latitude,
        longitude: p.Longitude,
        status: p.MFR_PreviousStatus as MapPropertiesResponse['status'],
      })),
    };
  }

  @Get('/unique/:id')
  getPropertyById(@Param() params: { id: string }) {
    const mlsData: MlsAPIResponse = MLS_DATA as any;

    return mlsData.value.find((property) => property.ListingId === params.id);
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
