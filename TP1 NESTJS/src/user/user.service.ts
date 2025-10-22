import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { BaseService } from '../common/base.service';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(@InjectRepository(User) repo: Repository<User>) {
    super(repo);
  }
}
