import { Injectable, inject } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root',
})
class ProdGuardService {
  isLogged: boolean = false;
  isAdmin: boolean = false;
  realRol: string = '';
  constructor(private tokenService: TokenService, private router: Router) {
    this.tokenService.getLogged().subscribe((data) => {
      this.isLogged = data;
    });

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const expectedRol = route.data['expectedRol'];
    this.realRol = this.isAdmin ? 'admin' : 'user';
    if (!this.isLogged || expectedRol.indexOf(this.realRol) < 0) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}

export const IsAdminGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  return inject(ProdGuardService).canActivate(route, state);
};
