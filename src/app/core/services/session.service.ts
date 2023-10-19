import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from  'rxjs/internal/operators/tap'
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SessionService {
  data;
  private csrfToken: string;

  constructor(private http: HttpClient) {}

  setCsrfToken(token: string) {
    this.csrfToken = token;
  }

  async loadConfig(): Promise<any>{
    let data = this.http.get('assets/config.json');
    return  await lastValueFrom(data);
  }
}
