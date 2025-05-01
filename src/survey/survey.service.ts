import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { SurveyResponse } from './entities/survey-response.entity';
import { SurveyResponseRepository } from './repositories/survey-response.repository';
import { ExerciseReason } from './entities/exercise-reason.entity';
import { ExerciseReasonRepository } from './repositories/exercise-reason.repository';
import { CheckMethod } from './entities/check-method.entity';
import { CheckMethodRepository } from './repositories/check-method.repository';
import { PainPoint } from './entities/pain-point.entity';
import { PainPointsRepository } from './repositories/pain-points.repository';
import * as crypto from 'crypto';
import { Config } from '../config/config';

@Injectable()
export class SurveyService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly surveyResponseRepository: SurveyResponseRepository,
    private readonly exerciseReasonRepository: ExerciseReasonRepository,
    private readonly checkMethodRepository: CheckMethodRepository,
    private readonly painPointsRepository: PainPointsRepository,
  ) {}

  private cacheKey = new Map();

  async submitSurvey(dto: CreateSurveyDto, clientIp: string, key: string = '') {
    const isKey = this.cacheKey.get(key);
    console.log(isKey);
    if (key === '' || isKey === undefined) {
      throw new HttpException('접근이 불가능한 경로 입니다.', HttpStatus.FORBIDDEN);
    }
    if (this.cacheKey.get(key)) {
      const newVar = await this.userRepository.validSubmit(clientIp);
      if (newVar === null) {
        throw new HttpException('서버 오류', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      if (newVar.email === '') {
        throw new HttpException(
          `이메일 변경만 가능합니다. 사용자 아이디 : ${newVar.user_id}`,
          HttpStatus.BAD_REQUEST,
        ); // 400 Bad Request 상태 코드
      }
      throw new HttpException('이미 설문이 완료된 상태입니다.', HttpStatus.BAD_REQUEST); // 400 Bad Request 상태 코드
    }
    if (dto.notification_email) {
      const existingUser = await this.userRepository.find(dto.notification_email);
      if (existingUser) {
        throw new HttpException('이미 설문이 완료된 상태입니다.', HttpStatus.BAD_REQUEST); // 400 Bad Request 상태 코드
      }
    }

    const user = await this.userRepository.save(dto.notification_email || '', clientIp);

    const savedSurveyResponse = await this.surveyResponseRepository.save(
      SurveyResponse.of(user, dto),
    );

    const exerciseReasons = dto.exercise_reasons.map((reason) => {
      return ExerciseReason.of(savedSurveyResponse.response_id, reason.reason_type);
    });

    await this.exerciseReasonRepository.save(exerciseReasons);

    const checkMethods = dto.check_methods.map((method) => {
      return CheckMethod.of(savedSurveyResponse.response_id, method.method_type);
    });

    await this.checkMethodRepository.save(checkMethods);

    const painPoints = dto.pain_points.map((point) => {
      return PainPoint.of(savedSurveyResponse.response_id, point.pain_type, point.custom_pain);
    });

    await this.painPointsRepository.save(painPoints);
    this.cacheKey.set(key, true);
    return this.getSurveyResponseById(savedSurveyResponse.response_id);
  }

  async getSurveyResponseById(responseId: number) {
    return this.surveyResponseRepository.find(responseId);
  }

  async validateSurvey(clientIp: string) {
    const user = await this.userRepository.validSubmit(clientIp);
    if (user) {
      throw new HttpException(
        `이미 설문이 완료된 상태입니다. 사용자 번호 : ${user.user_id}`,
        HttpStatus.BAD_REQUEST,
      ); // 400 Bad Request 상태 코드
    }
    return this.generateSpecialHeader(clientIp);
  }

  private generateSpecialHeader(clientIp: string): string {
    const timestamp = new Date().toISOString();

    const secretKey = Config.getEnvironment().privateKey;

    const data = `${Config.getEnvironment().name}-${clientIp}-${timestamp}`;

    if (!secretKey) {
      throw new HttpException('Private key is not defined', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const hash = crypto.createHmac('sha256', secretKey).update(data).digest('hex');
    this.cacheKey.set(hash, false);
    return hash;
  }

  async update(email: string, clientIp: string) {
    const newVar = await this.userRepository.validSubmit(clientIp);
    if (newVar === null) {
      throw new HttpException(`설문을 작성해주세요`, HttpStatus.BAD_REQUEST);
    }
    await this.userRepository.updateEmailByClientIp(email, clientIp);
  }
}
