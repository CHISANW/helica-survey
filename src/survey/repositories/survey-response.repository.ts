import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SurveyResponse } from '../entities/survey-response.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SurveyResponseRepository {
  constructor(
    @InjectRepository(SurveyResponse)
    private readonly surveyResponseRepository: Repository<SurveyResponse>,
  ) {}

  async save(entity: SurveyResponse) {
    return await this.surveyResponseRepository.save(entity);
  }

  async find(responseId: number) {
    return await this.surveyResponseRepository.findOne({
      where: { response_id: responseId },
      relations: ['exerciseReasons', 'checkMethods', 'painPoints'],
    });
  }
}
