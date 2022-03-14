import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBillingComponent } from './pages/add-billing/add-billing.component';
import { BillingComponent } from './pages/billing/billing.component';

const routes: Routes = [
  {
    path: '',
    component: BillingComponent,
  },
  {
    path: 'create',
    component: AddBillingComponent,
  },
  {
    path: 'edit/:id',
    component: AddBillingComponent,
  },  {
    path: 'detail/:id',
    component: AddBillingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillingRoutingModule { }
