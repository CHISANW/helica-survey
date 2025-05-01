import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  public async save(email: string, clientIp: string) {
    const user = new User(email, clientIp);
    return await this.userRepository.save(user);
  }

  public async find(email: string) {
    return await this.userRepository.findOne({
      where: { email: email },
    });
  }

  async validSubmit(clientIp: string) {
    return await this.userRepository.findOne({
      where: { client_ip: clientIp },
    });
  }

  async updateEmailByClientIp(newEmail: string, clientIp: string) {
    await this.userRepository.update({ client_ip: clientIp }, { email: newEmail });
  }
}
