import { Module } from '@nestjs/common';
import { TrialService } from './trial.service';
import { TrialController } from './trial.controller';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [CommonModule], 
  controllers: [TrialController],
  providers: [TrialService],
})
export class TrialModule {}
