import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MasterTable } from '../../shared/models/master-table';
import { RolesEnum } from 'src/app/shared/models/types/roles';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  isVarLogged: Subject<boolean> = new BehaviorSubject(false);
  isVarAdmin: Subject<boolean> = new BehaviorSubject(false);
  userName: string = '';
  roles: Array<MasterTable> = [];
  constructor(private router: Router) {}

  public setToken(token: string): void {
    sessionStorage.removeItem(environment.TOKEN_KEY);
    sessionStorage.setItem(environment.TOKEN_KEY, token);
    this.setUsername();
    this.isLogged();
    this.isAdmin();
  }

  public getToken(): string | null {
    return sessionStorage.getItem(environment.TOKEN_KEY);
  }

  public isLogged(): void {
    if (this.getToken()) {
      this.sendLogged(true);
    } else {
      this.sendLogged(false);
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

  public isAdmin(): void {
    console.log('esta el token', this.getToken());
    if (!this.getToken()) {
      this.sendLogged(false);
      return;
    }
    const token = this.getToken();
    const payload = token!.split('.')[1];
    const payloadecode = atob(payload);
    const values = JSON.parse(payloadecode);
    const roles = values.roles;
    if (roles.indexOf('ROLE_ADMIN') < 0) {
      this.sendLogged(false);
    }
    this.sendAdmin(true);
    this.sendLogged(true);
  }

  public logOut(): void {
    window.sessionStorage.clear();
    this.isLogged();
    this.isAdmin();
    this.router.navigate(['/']);
  }

  public sendAdmin(value: boolean) {
    this.isVarAdmin.next(value);
  }

  public getAdmin(): Observable<boolean> {
    return this.isVarAdmin.asObservable();
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
    console.log("roles", this.roles)
    const roleDescriptions = new Set(
      this.roles.map((role) => role.description)
    );

    // Verifica si todas las descripciones de rolesToCheck existen en el conjunto de descripciones
    return rolesToCheck.every((role) => roleDescriptions.has(role));
  }
}
