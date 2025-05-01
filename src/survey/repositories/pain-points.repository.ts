import { Injectable } from '@nestjs/common';
import { PainPoint } from '../entities/pain-point.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PainPointsRepository {
  constructor(
    @InjectRepository(PainPoint) private readonly painPointRepository: Repository<PainPoint>,
  ) {}

  async save(entity: PainPoint[]) {
    return await this.painPointRepository.save(entity);
  }
}
