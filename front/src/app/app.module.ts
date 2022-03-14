import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtInterceptor } from './shared/interceptors/jwt.interceptor';
import { NotificationInterceptor } from './shared/interceptors/notification.interceptor';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { HeaderComponent } from './views/base/header/header.component';
import { DefaultLayoutComponent } from './views/base/default-layout/default-layout.component';
import { FooterComponent } from './views/base/footer/footer.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxSpinnerModule } from "ngx-spinner";
import { LoaderInterceptor } from './shared/interceptors/loader.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DefaultLayoutComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    RouterModule,
    IconModule,
    IconSetModule.forRoot(),
    TooltipModule.forRoot(),
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    NgxSpinnerModule
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: NotificationInterceptor, multi: true
    },
  
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    IconSetService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
