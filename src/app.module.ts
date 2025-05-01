import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Config } from './config/config';
import { SurveyModule } from './survey/survey.module';
import { User } from './survey/entities/user.entity';
import { CheckMethod } from './survey/entities/check-method.entity';
import { ExerciseReason } from './survey/entities/exercise-reason.entity';
import { PainPoint } from './survey/entities/pain-point.entity';
import { SurveyResponse } from './survey/entities/survey-response.entity';

@Module({
  imports: [
    SurveyModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: Config.getEnvironment().host,
      port: Config.getEnvironment().port,
      username: Config.getEnvironment().username,
      password: Config.getEnvironment().password,
      database: Config.getEnvironment().database,
      entities: [User, CheckMethod, ExerciseReason, PainPoint, SurveyResponse],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
