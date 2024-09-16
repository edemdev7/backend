import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return {
      "name": "Dashboard API",
      "version": "V1",
      "message" : "API is running"
    }
  }

}
