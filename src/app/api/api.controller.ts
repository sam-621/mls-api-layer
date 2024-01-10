import { Body, Controller, Get, Post, Res } from '@nestjs/common';

import * as MLS_DATA from '../data.json';
import { MlsAPIResponse } from '../mls/mls.type';

class Dto {
  minLat: string;
  maxLat: string;
  minLng: string;
  maxLng: string;
}

@Controller()
export class ApiController {
  @Post('properties')
  getProperties(
    @Body()
    input: Dto,
  ) {
    const { minLat, maxLat, minLng, maxLng } = input;
    console.log({ input });

    const mlsData: MlsAPIResponse = MLS_DATA as any;

    const filteredProperties = mlsData.value.filter((property) => {
      const { Latitude, Longitude } = property;

      return (
        Latitude >= parseFloat(minLat) &&
        Latitude <= parseFloat(maxLat) &&
        Longitude >= parseFloat(minLng) &&
        Longitude <= parseFloat(maxLng)
      );
    });

    console.log({ filteredProperties });

    return filteredProperties;
  }
}
