import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { SurveyResponse } from './survey-response.entity';

export enum MethodType {
  BODY_COMPOSITION = '체성분 측정(ex 인바디 등)',
  MIRROR = '거울로 보는 눈바디',
  OTHERS_OPINION = '주변 사람의 말',
  FEELING = '내 느낌',
  NONE = '따로 확인하지 않음',
}

@Entity('check_methods')
export class CheckMethod {
  @PrimaryGeneratedColumn()
  method_id: number;

  @Column()
  response_id: number;

  @Column({
    type: 'enum',
    enum: MethodType,
  })
  method_type: MethodType;

  @ManyToOne(() => SurveyResponse, (surveyResponse) => surveyResponse.checkMethods)
  @JoinColumn({ name: 'response_id' })
  surveyResponse: SurveyResponse;

  constructor(responseId: number, methodType: MethodType) {
    this.response_id = responseId;
    this.method_type = methodType;
  }

  static of(responseId: number, methodType: MethodType) {
    return new CheckMethod(responseId, methodType);
  }
}
