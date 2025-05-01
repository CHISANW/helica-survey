import { Module } from '@nestjs/common';
import { SurveyController } from './survey.controller';
import { SurveyService } from './survey.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyResponse } from './entities/survey-response.entity';
import { PainPoint } from './entities/pain-point.entity';
import { ExerciseReason } from './entities/exercise-reason.entity';
import { CheckMethod } from './entities/check-method.entity';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { SurveyResponseRepository } from './repositories/survey-response.repository';
import { ExerciseReasonRepository } from './repositories/exercise-reason.repository';
import { CheckMethodRepository } from './repositories/check-method.repository';
import { PainPointsRepository } from './repositories/pain-points.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([SurveyResponse, User, CheckMethod, ExerciseReason, PainPoint]),
  ],
  controllers: [SurveyController],
  providers: [
    SurveyService,
    UserRepository,
    SurveyResponseRepository,
    ExerciseReasonRepository,
    CheckMethodRepository,
    PainPointsRepository,
  ],
  exports: [],
})
export class SurveyModule {}
