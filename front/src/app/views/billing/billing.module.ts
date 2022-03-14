import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillingRoutingModule } from './billing-routing.module';
import { BillingComponent } from './pages/billing/billing.component';
import { AddBillingComponent } from './pages/add-billing/add-billing.component';
import { ListBillingComponent } from './components/list-billing/list-billing.component';
import { FormBillingComponent } from './components/form-billing/form-billing.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    BillingComponent,
    AddBillingComponent,
    ListBillingComponent,
    FormBillingComponent
  ],
  imports: [
    CommonModule,
    BillingRoutingModule,
    TooltipModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    PaginationModule,
    RouterModule,
    NgxPaginationModule
  ]
})
export class BillingModule { }
