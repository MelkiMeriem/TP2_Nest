import { Module } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

export const UUID_PROVIDER = 'UUID_PROVIDER';

const uuidProvider = {
  provide: UUID_PROVIDER,
  useValue: uuidv4,
};

@Module({
  providers: [uuidProvider],
  exports: [uuidProvider],
})
export class CommonModule {}

/* @Module({
  providers: [
    {
      provide: UUID_TOKEN,
      useFactory: () => {
        return () => randomUUID();
      },
    },
  ],
  exports: [UUID_TOKEN],
}) */
