import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  // Lưu dữ liệu vào Redis với retry
  async setData(
    key: string,
    value: string,
    time?: number | undefined,
  ): Promise<void> {
    try {
      const expires = time || 60 * 60 * 24;
      await this.redis.set(key, value, 'EX', expires);
    } catch (error) {
      console.error('Error while setting data in Redis:', error);
      throw error;
    }
  }

  // Lấy dữ liệu từ Redis với retry
  async getData(key: string): Promise<string | null> {
    try {
      const data = await this.redis.get(key);
      return data;
    } catch (error) {
      console.error('Error while getting data from Redis:', error);
      throw error;
    }
  }

  // Xóa dữ liệu khỏi Redis với retry
  async deleteData(key: string): Promise<void> {
    try {
      await this.redis.del(key);
      console.log(`Data deleted for key: ${key}`);
    } catch (error) {
      console.error('Error while deleting data from Redis:', error);
      throw error;
    }
  }
}
