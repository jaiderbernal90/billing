import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { DefaultLayoutComponent } from './views/base/default-layout/default-layout.component';
import { BillingComponent } from './views/billing/pages/billing/billing.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'billing',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: 'billing',
        loadChildren: () => import('./views/billing/billing.module').then(m => m.BillingModule)
      },
    ]
  },
  {
    path: 'auth',
    loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
