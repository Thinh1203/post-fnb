import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { SupabaseModule } from 'nestjs-supabase-js';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [SupabaseModule.injectClient()],
})
export class ProductModule {}
