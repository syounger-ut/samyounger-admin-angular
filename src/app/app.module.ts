import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { JwtInterceptor, ErrorInterceptor } from '@root/_helpers';

// Components
import { AlertComponent } from '@root/_components';
import { AppComponent } from '@root/app.component';
import { LoginComponent } from '@root/login/login.component';
import { HomeComponent } from '@root/home/home.component';
import { RegisterComponent } from '@root/register/register.component';
import { HeaderComponent } from '@root/header/header.component';

// Services
import {
  UserService,
  AuthenticationService,
} from './_services';

// Routes
import { appRoutingModule } from './app.routing';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    appRoutingModule,
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    UserService,
    AuthenticationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { };
