import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from '@root/login/login.component';
import { RegisterComponent } from '@root/register/register.component';
import { HomeComponent } from '@root/home/home.component';
import { JwtInterceptor } from '@root/_helpers/jwt.interceptor';
import { AuthGuard } from '@root/_helpers/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [
    JwtInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ]
})
export class AppRoutingModule { }
