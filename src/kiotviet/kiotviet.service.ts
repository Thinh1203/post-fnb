import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import Redis from 'ioredis';
import qs from 'qs';
@Injectable()
export class KiotvietService {
  // private redis: Redis;
  // private redis_url: string;
  // private kiotviet_url: string;
  // private grant_type: string;
  // private client_id: string;
  // private client_secret: string;
  // private scope: string;
  // private retailer: string;
  // constructor(private configService: ConfigService) {
  //   this.redis_url = this.configService.get<string>('REDIS_URL');
  //   this.kiotviet_url = this.configService.get<string>('KIOTVIET_URL');
  //   this.grant_type = this.configService.get<string>('KIOTVIET_GRANT_TYPE');
  //   this.client_id = this.configService.get<string>('KIOTVIET_CLIENT_ID');
  //   this.client_secret = this.configService.get<string>(
  //     'KIOTVIET_CLIENT_SECRET',
  //   );
  //   this.scope = this.configService.get<string>('KIOTVIET_SCOPE');
  //   this.retailer = this.configService.get<string>('KIOTVIET_RETAILER');
  //   this.redis = new Redis(this.redis_url, {
  //     retryStrategy: (times) => {
  //       if (times >= 5) {
  //         console.error('Redis connection failed after 5 attempts');
  //         return null; // Ngừng thử lại sau 5 lần thất bại
  //       }
  //       return Math.min(times * 100, 3000); // Retry sau 100ms, 200ms, ..., tối đa 3 giây
  //     },
  //     reconnectOnError: (err) => {
  //       console.error('Redis connection error:', err);
  //       return true; // Thử kết nối lại nếu có lỗi
  //     },
  //   });
  // }
  // async getAccessToken() {
  //   try {
  //     const access_token = await this.redis.get('kiotviet_access_token');
  //     if (access_token) {
  //       return access_token;
  //     }
  //     const data = qs.stringify({
  //       grant_type: this.grant_type,
  //       client_id: this.client_id,
  //       client_secret: this.client_secret,
  //       scope: this.scope,
  //     });
  //     const response = await axios.post(this.kiotviet_url, data, {
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //       },
  //     });
  //     const tokenData = response.data;
  //     await this.redis.set(
  //       'kiotviet_access_token',
  //       tokenData.access_token,
  //       'EX',
  //       tokenData.expires_in - 60,
  //     ); // Lưu cache với TTL
  //     return tokenData.access_token;
  //   } catch (error) {
  //     console.log('error: ', error);
  //     throw error;
  //   }
  // }
  // async getData() {
  //   const access_token = await this.getAccessToken();
  //   const response = await axios.get(this.kiotviet_url, {
  //     headers: {
  //       Retailer: this.retailer,
  //       Authorization: 'Bearer ' + access_token,
  //     },
  //   });
  //   return response.data;
  // }
  // async getDetailData(url: string, id?: number, code?: string) {
  //   const access_token = await this.getAccessToken();
  //   const custom_url: string = id ? `${url}/${id}` : `${url}?code=${code}`;
  //   const response = await axios.get(custom_url, {
  //     headers: {
  //       Retailer: this.retailer,
  //       Authorization: 'Bearer ' + access_token,
  //     },
  //   });
  //   return response.data;
  // }
  // async postData(url: string, data: any) {
  //   const access_token = await this.getAccessToken();
  //   const headers = {
  //     Retailer: this.retailer,
  //     Authorization: 'Bearer ' + access_token,
  //   };
  //   const response = await axios.post(url, data, { headers });
  //   return response.data;
  // }
}
