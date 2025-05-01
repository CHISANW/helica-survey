import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { SurveyResponse } from './survey-response.entity';

export enum PainType {
  HARD_TO_NOTICE = '변화가 생겼는지 잘 구분이 안 돼요',
  INCONSISTENT = '매번 결과가 달라서 헷갈릴 때가 많아요',
  NO_RECORD = '기록이 안 남아서 비교하기 힘들어요',
  NONE = '특별히 아쉬운 점은 없어요',
  OTHER = '기타',
}

@Entity('pain_points')
export class PainPoint {
  @PrimaryGeneratedColumn()
  pain_id: number;

  @Column()
  response_id: number;

  @Column({
    type: 'enum',
    enum: PainType,
  })
  pain_type: PainType;

  @Column({ type: 'text', nullable: true })
  custom_pain: string;

  @ManyToOne(() => SurveyResponse, (surveyResponse) => surveyResponse.painPoints)
  @JoinColumn({ name: 'response_id' })
  surveyResponse: SurveyResponse;

  constructor(response_id: number, pain_type: PainType, custom_pain: string) {
    this.response_id = response_id;
    this.pain_type = pain_type;
    this.custom_pain = custom_pain;
  }

  static of(response_id: number, pain_type: PainType, custom_pain) {
    return new PainPoint(response_id, pain_type, custom_pain);
  }
}
