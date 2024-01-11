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
    return this.mlsService.filterByBounds(mlsData.value, input);
  }
}
