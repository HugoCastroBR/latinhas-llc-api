import { Module } from '@nestjs/common';
import { LatinhasService } from './latinhas.service';
import { LatinhasController } from './latinhas.controller';

@Module({
  controllers: [LatinhasController],
  providers: [LatinhasService],
})
export class LatinhasModule {}
