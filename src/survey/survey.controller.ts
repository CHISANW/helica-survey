import { Controller, Post, Body, Req, ValidationPipe, Get } from '@nestjs/common';
import { Request } from 'express';
import { SurveyService } from './survey.service';
import { CreateSurveyDto } from './dto/create-survey.dto';

@Controller('surveys')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Get()
  async validSurvey(@Req() req: Request) {
    const clientIp = this.getClientIp(req);
    const header = await this.surveyService.validateSurvey(clientIp);
    return { success: header };
  }

  @Post('/email')
  async updateEmail(@Body() body: any, @Req() req: Request) {
    const clientIp = this.getClientIp(req);
    const { email } = body;
    console.log(email);
    await this.surveyService.update(email, clientIp);
    return { success: 'success' };
  }

  @Post()
  async create(@Body(new ValidationPipe()) createSurveyDto: CreateSurveyDto, @Req() req: Request) {
    const clientIp = this.getClientIp(req);
    const key = this.getHeaderKey(req);
    await this.surveyService.submitSurvey(createSurveyDto, clientIp, key);
    return { success: '설문 완료' };
  }

  private getHeaderKey(req: Request) {
    return req.headers['x-helica-user-key']?.toString() || '';
  }

  private getClientIp(req: Request) {
    const rawIp = req.headers['x-forwarded-for']?.toString() || req.socket.remoteAddress || '';
    let clientIp = rawIp.split(',')[0].trim();
    if (clientIp.includes('::ffff:')) {
      clientIp = clientIp.split('::ffff:')[1];
    } else if (clientIp === '::1') {
      clientIp = '127.0.0.1';
    }
    return clientIp;
  }
}
