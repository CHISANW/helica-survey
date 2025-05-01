import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Column,
} from 'typeorm';
import { SurveyResponse } from './survey-response.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  email: string;

  @Column()
  client_ip: string;
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => SurveyResponse, (surveyResponse) => surveyResponse.user)
  surveyResponses: SurveyResponse[];

  constructor(email: string, clientIp: string) {
    this.email = email;
    this.client_ip = clientIp;
  }
}
