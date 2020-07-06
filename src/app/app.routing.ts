import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '@root/home/home.component';
import { LoginComponent } from '@root/login/login.component';
import { RegisterComponent } from '@root/register/register.component';
import { AuthGuard } from '@root/_helpers';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
