import { Injectable } from '@nestjs/common';
import { CreateBoxDto, UpdateBoxStatusDto } from './dto';
import { SupabaseClient } from '@supabase/supabase-js';
import { generateRandomCode } from 'src/utils';
import { boxStatus } from 'src/utils/enums';

@Injectable()
export class BoxService {
  constructor(private readonly supabaseClient: SupabaseClient) {}

  async createBox(body: CreateBoxDto) {
    try {
      const { data: type_data, error: type_error } = await this.supabaseClient
        .from('type')
        .select('*')
        .eq('id', body.type_id)
        .single();

      if (type_error) {
        return { data: null, error: 'Type not found' };
      }
      const id = generateRandomCode({
        prefix: 'box_',
        type: 'mix1',
        length: 10,
      });
      const status = body.status || boxStatus.INACTIVE;
      const { data, error } = await this.supabaseClient
        .from('box')
        .insert({
          id: id,
          name: body.name,
          status: status,
          description: body.description,
          number_of_people: body.number_of_people,
          type_id: body.type_id,
        })
        .select('*')
        .single();
      return { data, error };
    } catch (error) {
      return error;
    }
  }

  async updateBox(id: string, body: CreateBoxDto) {
    try {
      const existing_box = await this.getDetailBox(id);
      if (existing_box.error) {
        return { data: null, error: 'Box not found' };
      }
      const { data, error } = await this.supabaseClient
        .from('box')
        .update({
          name: body.name,
          status: body.status,
          description: body.description,
          number_of_people: body.number_of_people,
          qr_code: body.qr_code,
          type_id: body.type_id,
        })
        .eq('id', id)
        .select('*')
        .single();
      return { data, error };
    } catch (error) {}
  }

  async GetAllBox() {
    const { data, error } = await this.supabaseClient
      .from('box')
      .select('*')
      .order('created_at', { ascending: true });
    return { data, error };
  }

  async getDetailBox(id: string) {
    const { data, error } = await this.supabaseClient
      .from('box')
      .select('*')
      .eq('id', id)
      .single();
    return { data, error };
  }

  async deleteBox(id: string) {
    try {
      const existing_box = await this.getDetailBox(id);
      if (existing_box.error) {
        return { data: null, error: 'Box not found' };
      }
      const { data, error } = await this.supabaseClient
        .from('box')
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

  async updateBoxStatus(id: string, body: UpdateBoxStatusDto) {
    try {
      const existing_box = await this.getDetailBox(id);
      if (existing_box.error) {
        return { data: null, error: 'Box not found' };
      }
      const { data, error } = await this.supabaseClient
        .from('box')
        .update({
          status: body.status,
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
