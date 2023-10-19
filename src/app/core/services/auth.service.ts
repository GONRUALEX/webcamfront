import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginUsuario } from 'src/app/shared/models/users/login-usuario';
import { JwtDTO } from 'src/app/shared/models/auth/jwt-dto';
import { User } from 'src/app/shared/models/users/user';
import { MasterTable } from 'src/app/shared/models/master-table';

enum api {
  NEW = 'new',
  LOGIN = 'login',
  REFRESH = 'refresh',
  ROLES = 'roles',
  CSRF = 'csrf'
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUrl = environment.authUrl;
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private httpClient: HttpClient) {

  }

  public nuevo(newUser: User): Observable<any> {
    return this.httpClient.post<any>(this.authUrl + api.NEW, newUser);
  }

  public login(loginUsuario: LoginUsuario): Observable<JwtDTO> {
    return this.httpClient.post<JwtDTO>(this.authUrl + api.LOGIN, loginUsuario,  { headers: this.httpHeaders } );
  }

  public refresh(dto: JwtDTO): Observable<JwtDTO> {
    return this.httpClient.post<JwtDTO>(this.authUrl + api.REFRESH, dto);
  }

  public getRoles(dto:JwtDTO): Observable<MasterTable[]>{
    return this.httpClient.post<MasterTable[]>(this.authUrl + api.ROLES, dto)
  }

}
