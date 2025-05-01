import { ExerciseReason } from '../entities/exercise-reason.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ExerciseReasonRepository {
  constructor(
    @InjectRepository(ExerciseReason)
    private readonly exerciseReasonRepository: Repository<ExerciseReason>,
  ) {}

  async save(entity: ExerciseReason[]) {
    return await this.exerciseReasonRepository.save(entity);
  }
}
