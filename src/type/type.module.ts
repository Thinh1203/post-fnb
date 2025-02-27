import { Module } from '@nestjs/common';
import { TypeController } from './type.controller';
import { TypeService } from './type.service';
import { SupabaseModule } from 'nestjs-supabase-js';

@Module({
  controllers: [TypeController],
  providers: [TypeService],
  imports: [SupabaseModule.injectClient()],
})
export class TypeModule {}
