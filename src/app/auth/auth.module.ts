import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AuthRoutingModule} from './auth-routing.module';
import {SignupComponent} from './signup.component';
import {LoginComponent} from './login.component';
import {ProfileComponent} from './profile.component';
import {ApiService} from '../shared/api.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule
  ],
  declarations: [
    SignupComponent,
    LoginComponent,
    ProfileComponent
  ],
  providers: [
    ApiService
  ]
})

export class AuthModule {
}
