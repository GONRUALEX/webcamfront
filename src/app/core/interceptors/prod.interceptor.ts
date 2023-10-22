import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import {
  Observable,
  Subscription,
  catchError,
  concatMap,
  throwError,
} from 'rxjs';
import { TokenService } from '@core/services/token.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '@core/services/auth.service';
import { JwtDTO } from '@shared/models/auth/jwt-dto';

const AUTHORIZATION = 'Authorization';
@Injectable({
  providedIn: 'root',
})
export class ProdInterceptorService implements HttpInterceptor, OnDestroy {
  isLogged: boolean = false;
  subscriptions: Subscription[] = [];
  constructor(
    private tokenService: TokenService,
    public toastr: ToastrService,
    private authService: AuthService
  ) {
    this.subscriptions.push(
      this.tokenService.getLogged().subscribe((data) => {
        this.isLogged = data;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.map((subscription) => subscription.unsubscribe());
  }

  private processRequestError(
    error: HttpErrorResponse,
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (error instanceof HttpErrorResponse && error.status === 401) {
      let intReq = request;
      const dto: JwtDTO = new JwtDTO(this.tokenService.getToken()!);
      return this.authService.refresh(dto).pipe(
        concatMap((data: any) => {
          this.tokenService.setToken(data.token);
          intReq = this.addToken(request, data.token);
          return next.handle(intReq);
        })
      );
    }

    return throwError(() => {
      error;
    });
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.isLogged) {
      return next.handle(req);
    }
    let intReq = req;
    const token = this.tokenService.getToken();

    intReq = this.addToken(req, token!);
    return next.handle(intReq)/*.pipe(
      catchError((error: HttpErrorResponse) => {
        return this.processRequestError(error, req, next);
      })
    );*/
  }

  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      headers: req.headers.set(AUTHORIZATION, 'Bearer ' + token),
    });
  }
}

export const interceptorProvider = [
  { provide: HTTP_INTERCEPTORS, useClass: ProdInterceptorService, multi: true },
];
