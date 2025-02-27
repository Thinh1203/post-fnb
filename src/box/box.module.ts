import { Module } from '@nestjs/common';
import { BoxController } from './box.controller';
import { BoxService } from './box.service';
import { SupabaseModule } from 'nestjs-supabase-js';

@Module({
  controllers: [BoxController],
  providers: [BoxService],
  imports: [SupabaseModule.injectClient()],
})
export class BoxModule {}
