import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
@Injectable()
export class OrderService {
  private retailer: string;
  private token: string;
  private url: string;
  constructor(private readonly configService: ConfigService) {
    this.retailer = this.configService.get<string>('KIOTVIET_RETAILER');
    this.token = this.configService.get<string>('TOKEN');
    this.url = this.configService.get<string>('KIOTVIET_URL');
  }
  async createOrder(data: any) {
    try {
      const headers = {
        Retailer: this.retailer,
        Authorization: 'Bearer ' + this.token,
      };
      const response = await axios.post(`${this.url}/orders/create`, data, {
        headers,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getOrder(id: string) {
    try {
      const headers = {
        Retailer: this.retailer,
        Authorization: 'Bearer ' + this.token,
      };
      const response = await axios.post(`${this.url}/orders/uuid/${id}`, null, {
        headers,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
