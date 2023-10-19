import { MasterTable } from './../../shared/models/master-table';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';
import { firstValueFrom, catchError, of, tap } from 'rxjs';
import { JwtDTO } from '../../shared/models/auth/jwt-dto';
import { CsrfToken } from 'src/app/shared/models/auth/csrf-token';

export function sessionInitializer(
  tokenService: TokenService,
  authService: AuthService
) {
  const token = sessionStorage.getItem(environment.TOKEN_KEY);
  if (!token) {
    return () => {

    };
  } else {
    let jwtDto = new JwtDTO(token);
    return () => {
      return firstValueFrom(
        authService.getRoles(jwtDto).pipe(
          tap((roles: MasterTable[]) => {
            if (roles) {
              tokenService.setRoles(roles);
              tokenService.setToken(token);
            }else{
              tokenService.logOut();
            }
          })
        )
      );
    };
  }
}
