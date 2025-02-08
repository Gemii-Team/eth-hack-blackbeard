import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { CookieGuard } from './auth/guard/cookie.guard';

@Controller()
@UseGuards(CookieGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
