import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from '../../views/auth/services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private cookieService: CookieService,
    private authService: AuthService,
  ) { }

  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
    let token: string = this.cookieService.get('token');

    let request = req;
    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${token}`,
        },
      });

    }

    return next.handle(request).pipe(
      tap((response: HttpResponse<any>) => {
        const { body } = response;
        const route = req.url.split('/').pop();
        // console.log(route);

        // if (body && route !== 'refresh') {

        //   this.authService.refreshToken().subscribe((res: any) => {
        //     if (res) {
        //       this.authService.setterSettings(res)
        //       request = req.clone({
        //         setHeaders: {
        //           authorization: `Bearer ${this.cookieService.get('token')}`,
        //         },
        //       });
        //     }
        //   })
        //   return next.handle(request);
        // }
      })
    );

  }


}
