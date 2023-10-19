import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SessionService {
  data;
  private csrfToken: string;

  constructor(private http: HttpClient) {}

  setCsrfToken(token: string) {
    this.csrfToken = token;
  }

  async loadConfig(): Promise<any> {
    let data = this.http.get('assets/config.json');
    return await lastValueFrom(data);
  }
}
