import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import qs from 'qs';
import { RedisService } from 'src/redis/redis.service';
@Injectable()
export class KiotvietService {
  private kiotviet_url_get_token: string;
  private grant_type: string;
  private client_id: string;
  private client_secret: string;
  private scope: string;
  private kiotviet_url: string;
  private retailer: string;
  constructor(
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
  ) {
    this.kiotviet_url_get_token = this.configService.get<string>(
      'KIOTVIET_URL_GET_TOKEN',
    );
    this.grant_type = this.configService.get<string>('KIOTVIET_GRANT_TYPE');
    this.client_id = this.configService.get<string>('KIOTVIET_CLIENT_ID');
    this.client_secret = this.configService.get<string>(
      'KIOTVIET_CLIENT_SECRET',
    );
    this.scope = this.configService.get<string>('KIOTVIET_SCOPE');
    this.retailer = this.configService.get<string>('KIOTVIET_RETAILER');
    this.kiotviet_url = this.configService.get<string>('KIOTVIET_URL');
  }
  async getAccessToken() {
    try {
      const access_token = await this.redisService.getData('token');
      if (access_token) {
        return access_token;
      }
      const data = {
        grant_type: this.grant_type,
        client_id: this.client_id,
        client_secret: this.client_secret,
        scopes: this.scope,
      };
      const response = await axios.post(this.kiotviet_url, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const tokenData = response.data;
      await this.redisService.setData(
        'token',
        tokenData.access_token,
        tokenData.expires_in - 60,
      );
      return tokenData.access_token;
    } catch (error) {
      console.log('error: ', error);
      throw error;
    }
  }
  getInformationKey() {
    return {
      url: this.kiotviet_url,
      retailer: this.retailer,
      grant_type: this.grant_type,
      client_id: this.client_id,
      client_secret: this.client_secret,
    };
  }
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
