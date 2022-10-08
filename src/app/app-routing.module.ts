import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { AuthGuard } from './shared/helpers/auth.guard';
import { AdminHomeComponent } from './component/admin-home/admin-home.component';
import { PurchasedComponent } from './component/purchased/purchased.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard] },
  { path: 'admin', component: AdminHomeComponent, canActivate:[AuthGuard] },
  { path: 'purchases', component: PurchasedComponent, canActivate:[AuthGuard] },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
