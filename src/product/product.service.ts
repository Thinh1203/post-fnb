import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class ProductService {
  constructor(private readonly supabaseClient: SupabaseClient) {}

  async createProduct(body: any) {
    try {
      const data = body.Data.map((item) => {
        const { Id, Name, ...rest } = item;
        return { id: Id, name: Name, metadata: rest };
      });

      const { data: result, error } = await this.supabaseClient
        .from('products')
        .insert(data);

      if (error) {
        throw new Error(`Supabase error: ${error.message}`);
      }
      return {
        success: true,
        message: 'Products created successfully',
        data: result,
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
    try {
      const page = Number(query.page) || 1;
      const pageSize = Number(query.pageSize) || 10;
      const start = (page - 1) * pageSize;
      const end = start + pageSize - 1;
      let searchQuery = this.supabaseClient
        .from('products')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(start, end);
      if (query.q && query.q.trim() !== '') {
        searchQuery = searchQuery.ilike('name', `%${query.q}%`);
      }

      const { data, error, count } = await searchQuery;
      return {
        data,
        error,
        pagination: {
          page: page,
          pageSize: pageSize,
          total_items: count,
        },
      };
    } catch (error) {
      return error;
    }
  }
}
