import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { ExerciseReason } from './exercise-reason.entity';
import { CheckMethod } from './check-method.entity';
import { PainPoint } from './pain-point.entity';
import { CreateSurveyDto } from '../dto/create-survey.dto';

export enum AgeGroup {
  TEENS = '10대',
  TWENTIES = '20대',
  THIRTIES = '30대',
  FORTIES = '40대',
  FIFTIES = '50대',
  SIXTIES_PLUS = '60대 이상',
}

export enum ExerciseFrequency {
  NONE = '전혀 하지 않음',
  ONCE_TWICE = '주 1-2회',
  THREE_FOUR = '주 3-4회',
  FIVE_PLUS = '주 5회 이상',
}

export enum BodyChangePerception {
  YES = '네, 그렇습니다',
  NO = '아니요, 아직 부족해요',
  UNSURE = '잘 모르겠어요',
  NOT_IMPORTANT = '몸의 변화는 크게 중요하지 않아요',
}

export enum MotivationSatisfaction {
  SATISFIED = '네, 충분히 도움돼요',
  UNSATISFIED = '아니요, 부족해요',
}

@Entity('survey_responses')
export class SurveyResponse {
  @PrimaryGeneratedColumn()
  response_id: number;

  @Column()
  user_id: number;

  @Column({
    type: 'enum',
    enum: AgeGroup,
  })
  age_group: AgeGroup;

  @Column({
    type: 'enum',
    enum: ExerciseFrequency,
  })
  exercise_frequency: ExerciseFrequency;

  @Column({
    type: 'enum',
    enum: BodyChangePerception,
  })
  body_change_perception: BodyChangePerception;

  @Column({
    type: 'enum',
    enum: MotivationSatisfaction,
  })
  motivation_satisfaction: MotivationSatisfaction;

  @Column({ type: 'text', nullable: true })
  motivation_tip: string;

  @CreateDateColumn()
  submitted_at: Date;

  @ManyToOne(() => User, (user) => user.surveyResponses)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => ExerciseReason, (exerciseReason) => exerciseReason.surveyResponse, {
    cascade: true,
  })
  exerciseReasons: ExerciseReason[];

  @OneToMany(() => CheckMethod, (checkMethod) => checkMethod.surveyResponse, { cascade: true })
  checkMethods: CheckMethod[];

  @OneToMany(() => PainPoint, (painPoint) => painPoint.surveyResponse, { cascade: true })
  painPoints: PainPoint[];

  constructor(
    user_id: number,
    age_group: AgeGroup,
    exercise_frequency: ExerciseFrequency,
    body_change_perception: BodyChangePerception,
    motivation_satisfaction: MotivationSatisfaction,
    motivation_tip: string,
  ) {
    this.user_id = user_id;
    this.age_group = age_group;
    this.exercise_frequency = exercise_frequency;
    this.body_change_perception = body_change_perception;
    this.motivation_satisfaction = motivation_satisfaction;
    this.motivation_tip = motivation_tip;
  }

  static of(userEntity: User, dto: CreateSurveyDto) {
    return new SurveyResponse(
      userEntity.user_id,
      dto.age_group,
      dto.exercise_frequency,
      dto.body_change_perception,
      dto.motivation_satisfaction,
      dto.motivation_tip || '',
    );
  }
}
