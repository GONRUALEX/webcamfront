import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmailValuesDto } from 'src/app/shared/models/auth/email-values-dto';
import { ChangePasswordDto } from 'src/app/shared/models/auth/change-password';

@Injectable({
  providedIn: 'root',
})
export class EmailPasswordService {
  changePasswordUrl: string = environment.changePasswordUrl;
  constructor(private httpClient: HttpClient) {}
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'X-Frame-Options':'deny'});
  public sendEmail(dto: EmailValuesDto): Observable<any> {
    return this.httpClient.post<any>(
      this.changePasswordUrl + 'send-email',
      dto, { headers: this.httpHeaders }
    );
  }

  public changePassword(dto: ChangePasswordDto): Observable<any> {
    return this.httpClient.post<any>(
      this.changePasswordUrl + 'change-password',
      dto, { headers: this.httpHeaders }
    );
  }
}
