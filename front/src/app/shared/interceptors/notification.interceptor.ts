import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificationService } from '../../shared/services/notification.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class NotificationInterceptor implements HttpInterceptor {

  constructor(
    private notification: NotificationService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      tap((response: HttpResponse<any>): void => {

        const { body } = response;

        if (body?.success && body?.message) {
          this.notification.success('Operación exitosa', body.message)
        }

        if (!body?.success && body?.message) {
          this.notification.error(body?.message)
        }



      })
    )
  }
}
