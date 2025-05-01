import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckMethod } from '../entities/check-method.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CheckMethodRepository {
  constructor(
    @InjectRepository(CheckMethod)
    private readonly checkMethodRepository: Repository<CheckMethod>,
  ) {}

  async save(entity: CheckMethod[]) {
    return await this.checkMethodRepository.save(entity);
  }
}
