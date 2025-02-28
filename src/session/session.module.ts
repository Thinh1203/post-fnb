import { Module } from '@nestjs/common';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { SupabaseModule } from 'nestjs-supabase-js';

@Module({
  controllers: [SessionController],
  providers: [SessionService],
  imports: [SupabaseModule.injectClient()],
})
export class SessionModule {}
