import { Body, Controller, Post } from '@nestjs/common';

import * as MLS_DATA from '../data.json';
import { MlsAPIResponse } from '../mls/mls.type';
import { PropertiesDto } from './api.dto';
import { MlsService } from '../mls/mls.service';

@Controller()
export class ApiController {
  constructor(private readonly mlsService: MlsService) {}
  @Post('properties')
  getProperties(
    @Body()
    input: PropertiesDto,
  ) {
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

    return properties;
  }
}
