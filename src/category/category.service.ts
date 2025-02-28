import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
import { KiotvietService } from 'src/kiotviet/kiotviet.service';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class CategoryService {
  constructor(
    private readonly kiotvietService: KiotvietService,
    private readonly redisService: RedisService,
  ) {}

  async getCategories() {
    const data = await this.redisService.getData('categories');
    const result = data ? { categories: JSON.parse(data) } : null;
    return result;
  }

  async getCategoriesFromKiotViet() {
    const token = await this.kiotvietService.getAccessToken();
    const { url, retailer } = this.kiotvietService.getInformationKey();
    const response = await axios.get(`${url}/categories?pageSize=100`, {
      headers: {
        Retailer: retailer,
        Authorization: 'Bearer ' + token,
      },
    });

    return await this.redisService.setData(
      'categories',
      JSON.stringify(response.data.data),
      86400,
    );
  }

  @Cron('0 0 0 * * *')
  async handleSessionExpiry() {
    await this.getCategoriesFromKiotViet();
  }
}
