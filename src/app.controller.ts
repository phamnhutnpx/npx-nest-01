import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {}

  @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  @Render('home')
  getHello() {
    console.log(
      '==> Server run Port: ',
      this.configService.get<string>('PORT'),
    );
    return { message: 'Hello world' };
  }
}
