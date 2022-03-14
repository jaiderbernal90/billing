import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtInterceptor } from './shared/interceptors/jwt.interceptor';
import { NotificationInterceptor } from './shared/interceptors/notification.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: NotificationInterceptor, multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
