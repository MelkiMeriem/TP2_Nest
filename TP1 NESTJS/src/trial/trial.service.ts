import { Inject, Injectable } from '@nestjs/common';
import { UUID_PROVIDER } from '../common/common.module';

@Injectable()
export class TrialService {
  constructor(
    @Inject(UUID_PROVIDER) private readonly generateUuid: () => string,
  ) {}

  createUser(name: string) {
    const user = {
      id: this.generateUuid(),
      name,
    };
    return user;
  }
}
