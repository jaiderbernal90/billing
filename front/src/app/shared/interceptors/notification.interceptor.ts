import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class NotificationInterceptor implements HttpInterceptor {

  constructor(
    private notification: NotificationService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req)
    .pipe(
      tap((response: HttpResponse<any>) => {
        const route = req.url.split('/').pop();
        const { body } = response;        
        if (body?.success && body?.message && route !== 'logout') {
          this.notification.success('Operación exitosa', body.message)
        }
        if (!body?.success && body?.message) {
          this.notification.error(body?.message)
        }
      })
    )
  }
}