import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MasterTable } from '@shared/models/master-table';
import { RolesEnum } from '@shared/models/types/roles';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  isVarLogged: Subject<boolean> = new BehaviorSubject(false);
  userName: string = '';
  roles: Array<MasterTable> = [];
  constructor(private router: Router) {}

  public setToken(token: string): void {
    sessionStorage.removeItem(environment.TOKEN_KEY);
    sessionStorage.setItem(environment.TOKEN_KEY, token);
    this.setUsername();
    this.isLogged();
  }

  public getToken(): string | null {
    return sessionStorage.getItem(environment.TOKEN_KEY);
  }

  public isLogged(): void {
    if (this.getToken()) {
      this.sendLogged(true);
    } else {
      this.sendLogged(false);
      this.roles = [];
    }
  }

  private setUsername() {
    const token = this.getToken();
    const payload = token!.split('.')[1];
    const payloadecode = atob(payload);
    const values = JSON.parse(payloadecode);
    this.userName = values.sub;
  }

  public getUserName(): string | null {
    return this.userName;
  }

  public logOut(): void {
    window.sessionStorage.clear();
    this.isLogged();
    this.router.navigate(['/']);
  }

  public sendLogged(value: boolean) {
    this.isVarLogged.next(value);
  }

  public getLogged(): Observable<boolean> {
    return this.isVarLogged.asObservable();
  }

  public setRoles(roles: Array<MasterTable>) {
    this.roles = roles;
  }

  public getRoles(): Array<MasterTable> {
    return this.roles;
  }

  public hasAuthority(rolesToCheck: RolesEnum[]): boolean {
    // Convierte el array de objetos MasterTable en un conjunto de descripciones para facilitar la búsqueda
    console.log('roles', this.roles);
    const roleDescriptions = new Set(
      this.roles.map((role) => role.description)
    );

    // Verifica si todas las descripciones de rolesToCheck existen en el conjunto de descripciones
    return rolesToCheck.every((role) => roleDescriptions.has(role));
  }
}
