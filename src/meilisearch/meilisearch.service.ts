import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MeiliSearch } from 'meilisearch';

@Injectable()
export class MeilisearchService {
  private _client: MeiliSearch;
  private readonly logger = new Logger(MeilisearchService.name, {
    timestamp: true,
  });
  constructor(private readonly configService: ConfigService) {
    this._client = new MeiliSearch({
      host: this.configService.get<string>('MEILISEARCH_HOST'),
      apiKey: this.configService.get<string>('MELISEARCH_API_KEY'),
    });
  }

  async addProductToIndex(product: any) {
    try {
      await this._client.index('lalalaCoffe').addDocuments(product);
    } catch (error) {
      this.logger.error(`Error adding product to index: ${error}`);
      return error;
    }
  }

  async delProductToIndex(productId: any) {
    try {
      await this._client.index('lalalaCoffe').deleteDocuments(productId);
    } catch (error) {
      this.logger.error(`Error deleting product to index: ${error}`);
      return error;
    }
  }

  async getAllProducts(query: any) {
    const page = Number(query.page) || 1;
    const hitsPerPage = Number(query.page_size) || 20;
    let filter: string | string[][] = [];
    let sort: string[] = [];
    if (Array.isArray(query.categoryId) && query.categoryId.length > 0) {
      const categories = query.categoryId.flatMap((id) =>
        id
          .split(',')
          .map((i) => i.trim())
          .filter((i) => i.length > 0),
      );
      filter = [categories.map((id) => `categoryId = "${id}"`)];
    }

    const response = await this._client
      .index('lalalaCoffe')
      .search(query.q || '', {
        page: page,
        hitsPerPage: hitsPerPage,
        offset: (page - 1) * hitsPerPage,
        filter: filter || undefined,
        sort: sort || undefined,
      });
    const previous_page = page - 1 < 1 ? null : page - 1;
    const next_page = page + 1 > response.totalPages ? null : page + 1;
    return {
      result: response.hits,
      previous_page,
      next_page,
      pageSize: response.hitsPerPage,
      page: response.page,
      totalPages: response.totalPages,
      totalItems: response.totalHits,
    };
  }
}
