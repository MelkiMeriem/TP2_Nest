import { Controller, Get, Query } from '@nestjs/common';
import { TrialService } from './trial.service';

@Controller('trial')
export class TrialController {
  constructor(private readonly trialService: TrialService) {}

  @Get('create')
  createUser(@Query('name') name: string) {
    return this.trialService.createUser(name || 'Default User');
  }
}
