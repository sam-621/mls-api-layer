import { Controller, Get, Res } from '@nestjs/common';

import * as MLS_DATA from '../data.json';
import { Response } from 'express';

@Controller()
export class ApiController {
  @Get()
  getHello(@Res() res: Response) {
    return res.json(MLS_DATA);
  }
}
