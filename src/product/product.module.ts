import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { SupabaseModule } from 'nestjs-supabase-js';
import { MeilisearchModule } from 'src/meilisearch/meilisearch.module';
import { KiotvietModule } from 'src/kiotviet/kiotviet.module';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [SupabaseModule.injectClient(), MeilisearchModule, KiotvietModule],
})
export class ProductModule {}
