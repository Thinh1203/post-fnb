import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateTypeDto } from './dto';
import { generateRandomCode } from 'src/utils';

@Injectable()
export class TypeService {
  constructor(private readonly supabaseClient: SupabaseClient) {}

  async createType(body: CreateTypeDto) {
    try {
      const id = generateRandomCode({
        prefix: 'type_',
        type: 'mix1',
        length: 10,
      });
      const { data, error } = await this.supabaseClient
        .from('type')
        .insert({ id: id, name: body.name, description: body.description })
        .select('*')
        .single();
      return { data, error };
    } catch (error) {
      return error;
    }
  }

  async updateType(id: string, body: CreateTypeDto) {
    try {
      const { data, error } = await this.supabaseClient
        .from('type')
        .update({ name: body.name, description: body.description })
        .eq('id', id)
        .select('*')
        .single();
      return { data, error };
    } catch (error) {
      return error;
    }
  }

  async getAllType() {
    try {
      const { data, error } = await this.supabaseClient
        .from('type')
        .select('*')
        .is('deleted_at', null);
      return { data, error };
    } catch (error) {
      return error;
    }
  }

  async getDetailType(id: string) {
    try {
      const { data, error } = await this.supabaseClient
        .from('type')
        .select('*')
        .eq('id', id)
        .single();
      return { data, error };
    } catch (error) {
      return error;
    }
  }

  async deleteType(id: string) {
    try {
      const { data, error } = await this.supabaseClient
        .from('type')
        .update({
          deleted_at: new Date(),
        })
        .eq('id', id)
        .select('*')
        .single();
      return { data, error };
    } catch (error) {
      return error;
    }
  }
}
