import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { SurveyResponse } from './survey-response.entity';

export enum ReasonType {
  HEALTH = '건강 및 체력 향상',
  BODY_SHAPE = '체형 변화(다이어트, 근육 증가)',
  POSTURE = '자세나 체형 교정',
  OBLIGATION = '뭔가 해야 할 것 같아서',
}

@Entity('exercise_reasons')
export class ExerciseReason {
  @PrimaryGeneratedColumn()
  reason_id: number;

  @Column()
  response_id: number;

  @Column({
    type: 'enum',

    enum: ReasonType,
  })
  reason_type: ReasonType;

  @ManyToOne(() => SurveyResponse, (surveyResponse) => surveyResponse.exerciseReasons)
  @JoinColumn({ name: 'response_id' })
  surveyResponse: SurveyResponse;

  constructor(response_id: number, reason_type: ReasonType) {
    this.response_id = response_id;
    this.reason_type = reason_type;
  }

  static of(response_id: number, reason_type: ReasonType) {
    return new ExerciseReason(response_id, reason_type);
  }
}
