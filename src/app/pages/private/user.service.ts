import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@shared/models/users/user';
import { environment } from 'src/environments/environment';
enum api {
  LIST = 'list',
}
@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = environment.apiUrl + '/users/';
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Frame-Options': 'deny',
  });
  constructor(private httpClient: HttpClient) {}

  public nuevo(newUser: User): Observable<User> {
    return this.httpClient.post<User>(this.url + 'create', newUser);
  }
  /*
  public login(loginUsuario: LoginUsuario): Observable<JwtDTO> {
    return this.httpClient.post<JwtDTO>(this.authUrl + api.LOGIN, loginUsuario, { headers: this.httpHeaders });
  }

  public refresh(dto: JwtDTO): Observable<JwtDTO> {
    return this.httpClient.post<JwtDTO>(this.authUrl + api.REFRESH, dto, { headers: this.httpHeaders });
  }

  public getRoles(dto:JwtDTO): Observable<MasterTable[]>{
    return this.httpClient.post<MasterTable[]>(this.authUrl + api.ROLES, dto, { headers: this.httpHeaders })
  }
*/
  public list(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url + api.LIST);
  }
}
