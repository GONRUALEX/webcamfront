import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard {
  isLogged: boolean = false;
  constructor(
    private tokenService: TokenService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.tokenService.getLogged().subscribe((data) => {
      this.isLogged = data;
    });
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log("lkdsfdslkjfdlkjf")
    let autority: boolean = false;
    if (route.data['grant'].length == 0) return true;
    if (this.tokenService.hasAuthority(route.data['grant'])) {
      autority = true;
    } else {
      this.router.navigate(['/']);
      this.toastr.error('No tienes permisos ' + ' 😒', 'Fail', {
        timeOut: 3000,
        positionClass: 'toast-top-center',
      });
    }
    return autority;
  }
}

export const IsLoginGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  return inject(LoginGuard).canActivate(route, state);
};
