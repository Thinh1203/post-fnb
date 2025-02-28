import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SupabaseClient } from '@supabase/supabase-js';
import * as moment from 'moment';
import { generateRandomCode } from 'src/utils';
import { boxStatus } from 'src/utils/enums';

@Injectable()
export class SessionService {
  constructor(private readonly supabaseClient: SupabaseClient) {}

  async findSessionByBoxId(boxId: string) {
    const { data, error } = await this.supabaseClient
      .from('session')
      .select('*')
      .eq('box_id', boxId)
      .is('deleted_at', null)
      .single();
    return { data, error };
  }

  async createSession(boxId: string) {
    try {
      const id = generateRandomCode({
        prefix: 'ses_',
        type: 'mix1',
        length: 15,
      });
      const expiresAt = moment().add(2, 'minutes').toDate();
      const { data, error } = await this.supabaseClient
        .from('session')
        .insert({
          id: id,
          box_id: boxId,
          expires_at: expiresAt,
        })
        .select('*')
        .single();
      await this.supabaseClient
        .from('box')
        .update({ status: boxStatus.ACTIVE })
        .eq('id', boxId);
      return { data, error };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }

  async checkAndExpireSessions() {
    const now = new Date().toISOString();
    // Tìm tất cả session đã hết hạn và chưa bị xóa
    const { data, error } = await this.supabaseClient
      .from('session')
      .select('*')
      .lt('expires_at', now)
      .is('deleted_at', null);
    // Cập nhật `deleted_at` cho tất cả các session hết hạn
    if (data && data.length > 0) {
      for (const session of data) {
        await this.supabaseClient
          .from('session')
          .update({ deleted_at: now })
          .eq('id', session.id);

        await this.supabaseClient
          .from('box')
          .update({ status: boxStatus.INACTIVE })
          .eq('id', session.box_id);
      }
    }
  }

  async delSession(id: string) {
    try {
      const { data: existingSession, error: findError } =
        await this.supabaseClient
          .from('session')
          .select('*')
          .eq('id', id)
          .single();
      if (findError) {
        console.error('Session not found:', findError);
        return { data: null, error: findError };
      }
      const { data, error } = await this.supabaseClient
        .from('session')
        .update({ deleted_at: new Date() })
        .eq('id', id)
        .select('*')
        .single();
      await this.supabaseClient
        .from('box')
        .update({ status: boxStatus.INACTIVE })
        .eq('id', data.box_id);
      return { data, error };
    } catch (error) {
      return error;
    }
  }

  async getAllSession(query: any) {
    const page = Number(query.page) || 1;
    const pageSize = Number(query.pageSize) || 10;
    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;
    const { data, error, count } = await this.supabaseClient
      .from('session')
      .select(`*, box(*)`, { count: 'exact' })
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
      .range(start, end);
    const last_pages = Math.ceil(count / pageSize);
    const previous_page = page - 1 < 1 ? null : page - 1;
    const next_page = page + 1 > last_pages ? null : page + 1;
    return {
      data,
      error,
      pagination: {
        page: page,
        pageSize: pageSize,
        previous_page,
        next_page,
        total_items: count,
      },
    };
  }

  // Kiểm tra hết hạn cho tất cả session mỗi giờ
  // @Cron('* * * * *')
  // async handleSessionExpiry() {
  //   await this.checkAndExpireSessions();
  // }
}
