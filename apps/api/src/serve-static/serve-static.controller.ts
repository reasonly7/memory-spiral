import { Get, Res } from '@nestjs/common';
import { Response } from 'express';

export class ServeStaticController {
  @Get('*')
  getIndex(@Res() res: Response) {
    res.sendFile('index.html', { root: './public' });
  }
}
