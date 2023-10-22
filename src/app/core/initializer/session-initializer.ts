import { MasterTable } from './../../shared/models/master-table';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TokenService } from '@core/services/token.service';
import { AuthService } from '@core/services/auth.service';
import { firstValueFrom, tap } from 'rxjs';
import { JwtDTO } from '@shared/models/auth/jwt-dto';

export function sessionInitializer(
  tokenService: TokenService,
  authService: AuthService
) {
  const token = sessionStorage.getItem(environment.TOKEN_KEY);
  if (!token) {
    return () => {};
  } else {
    let jwtDto = new JwtDTO(token);
    return () => {
      return firstValueFrom(
        authService.getRoles(jwtDto).pipe(
          tap((roles: MasterTable[]) => {
            if (roles) {
              tokenService.setRoles(roles);
              tokenService.setToken(token);
            } else {
              console.log("hola ")
              tokenService.logOut();
            }
          })
        )
      );
    };
  }
}
