// src/survey/dto/create-survey.dto.ts
import {
  IsEnum,
  IsArray,
  IsOptional,
  IsString,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import {
  AgeGroup,
  ExerciseFrequency,
  BodyChangePerception,
  MotivationSatisfaction,
} from '../entities/survey-response.entity';
import { ReasonType } from '../entities/exercise-reason.entity';
import { MethodType } from '../entities/check-method.entity';
import { PainType } from '../entities/pain-point.entity';

export class ExerciseReasonDto {
  @Transform(({ value }) => ReasonType[value])
  @IsEnum(ReasonType)
  reason_type: ReasonType;
}

export class CheckMethodDto {
  @Transform(({ value }) => MethodType[value])
  @IsEnum(MethodType)
  method_type: MethodType;
}

export class PainPointDto {
  @Transform(({ value }) => PainType[value])
  @IsEnum(PainType)
  pain_type: PainType;

  @IsOptional()
  @IsString()
  custom_pain?: string;
}

export class CreateSurveyDto {
  @Transform(({ value }) => AgeGroup[value])
  @IsEnum(AgeGroup)
  age_group: AgeGroup;

  @Transform(({ value }) => ExerciseFrequency[value])
  @IsEnum(ExerciseFrequency)
  exercise_frequency: ExerciseFrequency;

  @Transform(({ value }) => BodyChangePerception[value])
  @IsEnum(BodyChangePerception)
  body_change_perception: BodyChangePerception;

  @Transform(({ value }) => MotivationSatisfaction[value])
  @IsEnum(MotivationSatisfaction)
  motivation_satisfaction: MotivationSatisfaction;

  @IsOptional()
  @IsString()
  motivation_tip?: string;

  @IsOptional()
  @IsString()
  notification_email?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => ExerciseReasonDto)
  exercise_reasons: ExerciseReasonDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CheckMethodDto)
  check_methods: CheckMethodDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PainPointDto)
  pain_points: PainPointDto[];
}
