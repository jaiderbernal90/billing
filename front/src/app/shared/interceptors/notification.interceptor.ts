import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificationService } from '../services/notification.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class NotificationInterceptor {

  
}
