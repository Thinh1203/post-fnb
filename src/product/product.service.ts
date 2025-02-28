import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SupabaseClient } from '@supabase/supabase-js';
import axios from 'axios';
import { KiotvietService } from 'src/kiotviet/kiotviet.service';
import { MeilisearchService } from 'src/meilisearch/meilisearch.service';

@Injectable()
export class ProductService {
  private url: string;
  private retailer: string;

  constructor(
    private readonly supabaseClient: SupabaseClient,
    private readonly meilisearchService: MeilisearchService,
    private readonly kiotvietService: KiotvietService,
    private readonly configService: ConfigService,
  ) {
    this.retailer = this.configService.get<string>('KIOTVIET_RETAILER');
    this.url = this.configService.get<string>('KIOTVIET_URL');
  }

  async createProduct(body: any) {
    try {
      const data = body.data.map((item) => {
        const { id, ...rest } = item;
        return { id: String(id), metadata: rest };
      });
      const save = data.map((element) => {
        return this.supabaseClient
          .from('products')
          .insert({
            id: element.id,
            metadata: element.metadata,
          })
          .single();
      });
      await Promise.all(save);
      await this.meilisearchService.addProductToIndex(body.data);
      return {
        success: true,
        message: 'Products created successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create products',
        error: error.message,
      };
    }
  }

  async getAllProduct(query: any) {
    return await this.meilisearchService.getAllProducts(query);
  }

  async getDetailProduct(code: string) {
    try {
      const token = await this.kiotvietService.getAccessToken();
      const response = await axios.get(`${this.url}/products/code/${code}`, {
        headers: {
          Retailer: this.retailer,
          Authorization: 'Bearer ' + token,
        },
      });
      return response.data;
    } catch (error) {
      return {
        success: false,
        message: 'Failed to get detail products',
        error: error.message,
      };
    }
  }

  // async updateProduct(body: any) {
  //   try {
  //     const { Id, ...res } = body.Notifications[0].Data[0];
  //     const id = String(Id);
  //     const metadata = res;
  //     const { data, error } = await this.supabaseClient
  //       .from('products')
  //       .update({ metadata: metadata })
  //       .eq('id', id)
  //       .select('*')
  //       .single();
  //     await this.meilisearchService.addProductToIndex(
  //       body.Notifications[0].Data,
  //     );
  //     return { data, error };
  //   } catch (error) {
  //     console.log('error: ', error);
  //     return {
  //       success: false,
  //       message: 'Failed to create products',
  //       error: error.message,
  //     };
  //   }
  // }
}
