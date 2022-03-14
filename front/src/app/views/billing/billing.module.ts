import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillingRoutingModule } from './billing-routing.module';
import { BillingComponent } from './pages/billing/billing.component';
import { AddBillingComponent } from './pages/add-billing/add-billing.component';
import { ListBillingComponent } from './components/list-billing/list-billing.component';
import { FormBillingComponent } from './components/form-billing/form-billing.component';


@NgModule({
  declarations: [
    BillingComponent,
    AddBillingComponent,
    ListBillingComponent,
    FormBillingComponent
  ],
  imports: [
    CommonModule,
    BillingRoutingModule
  ]
})
export class BillingModule { }
