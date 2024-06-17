import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

import { PropertiesDto, SearchCriteriaDto } from './api.dto';
import { MlsService } from '../mls/mls.service';
import { ListingPropertiesResponse, PropertiesResponse } from './api.types';
import { PrismaService } from '../persistance/prisma.service';

const RESULTS = {
  14: 200,
  13: 180,
  12: 160,
  11: 140,
  10: 120,
  9: 100,
  8: 80,
  7: 50,
  6: 30,
  5: 10,
  4: 10,
  3: 5,
  2: 5,
  1: 3,
  0: 2,
};

@Controller('/properties')
export class ApiController {
  constructor(
    private readonly mlsService: MlsService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post()
  async getProperties(
    @Body()
    input: PropertiesDto,
  ): Promise<PropertiesResponse> {
    let data = await this.prismaService.property.findMany({
      where: {
        longitude: {
          gte: parseFloat(input.bounds.minLng),
          lte: parseFloat(input.bounds.maxLng),
        },
        latitude: {
          gte: parseFloat(input.bounds.minLat),
          lte: parseFloat(input.bounds.maxLat),
        },
        price: {
          gte: input?.price?.min ? parseInt(input?.price?.min) : undefined,
          lte: input?.price?.max ? parseInt(input?.price?.max) : undefined,
        },
        isForSale: input.forSale ?? true,
        beds: input.beds ?? undefined,
        baths: input.baths ?? undefined,
        propertyType: {
          in: input.propertyType,
        },
        squareFt: {
          gte: input.squareFeet?.min ? input.squareFeet.min : undefined,
          lte: input.squareFeet?.max ? input.squareFeet.max : undefined,
        },
        yearBuilt: {
          gte: input.yearBuilt?.min ? input.yearBuilt.min : undefined,
          lte: input.yearBuilt?.max ? input.yearBuilt.max : undefined,
        },
        lotSize: {
          gte: input.lotSize?.min ? input.lotSize.min : undefined,
          lte: input.lotSize?.max ? input.lotSize.max : undefined,
        },
        status: {
          in: input.status,
        },
        garageSpaces: input.garageSpaces ?? undefined,
        stories: input.stories ?? undefined,
        hasAssociationFee: input.hasAssociation ?? undefined,
        hasPool: input.hasPool ?? undefined,
        hasWaterfront: input.hasWaterfront ?? undefined,
        cooling: input.hasAC ?? undefined,
        heating: input.hasHeater ?? undefined,
        description: {
          contains: input.description,
        },
      },
      take: input.zoom >= 15 ? undefined : RESULTS[input.zoom],
    });

    if (input.order) {
      data = this.mlsService.orderBy(data, input.order);
    }

    const { skip, take } = input.pagination;

    return {
      total: data.length,
      listing: data
        .slice(Number(skip), Number(skip) + Number(take))
        .map((p) => ({
          id: p.mlsId,
          price: (p.price ?? 0) as number,
          image: Array.isArray(p.images) ? (p.images[0] as any)?.url : '',
          squareFt: p.squareFt ?? 0,
          beds: p.beds ?? 0,
          baths: p.baths ?? 0,
          address: {
            name: p.address,
            city: p.city,
            stateOrdProvince: p.stateOrProvince,
            pc: p.pc,
          },
          isForSale: p.isForSale,
          status: p.status as ListingPropertiesResponse['status'],
        })),
      map: data.map((p) => ({
        id: p.mlsId,
        price: (p.price ?? 0) as number,
        image: Array.isArray(p.images) ? (p.images[0] as any)?.url : '',
        squareFt: p.squareFt ?? 0,
        address: {
          name: p.address,
          city: p.city,
          stateOrdProvince: p.stateOrProvince,
          pc: p.pc,
        },
        beds: p.beds ?? 0,
        baths: p.baths ?? 0,
        latitude: Number(p.latitude ?? 0) ?? 0,
        longitude: Number(p.longitude ?? 0) ?? 0,
        status: p.status as ListingPropertiesResponse['status'],
        isForSale: p.isForSale,
      })),
    };
  }

  @Get('/unique/:id')
  async getPropertyById(@Param() params: { id: string }) {
    const property = await this.prismaService.property.findFirstOrThrow({
      where: {
        mlsId: params.id,
      },
      include: {
        Media: true,
      },
    });

    return property;
  }

  @Get('/search')
  async search(@Query() params: SearchCriteriaDto) {
    const data = await this.prismaService.property.findMany({
      where: {
        OR: [
          {
            address: {
              contains: params.address,
            },
          },
          {
            city: {
              contains: params.city,
            },
          },
          {
            pc: {
              contains: params.cp,
            },
          },
        ],
      },
      include: {
        Media: true,
      },
      take: parseInt(params.limit as unknown as string),
    });

    return data.map((p) => ({
      id: p.mlsId,
      address: p.address,
      city: p.city,
      cp: p.pc,
      listingPrice: p.price,
      isLease: p.isForSale,
      image: p.Media.length ? p.Media[0]?.url : '',
    }));
  }
}
