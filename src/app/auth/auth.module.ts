import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AuthRoutingModule} from './auth-routing.module';
import {SignupComponent} from './signup.component';
import {LoginComponent} from './login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule
  ],
  declarations: [
    SignupComponent,
    LoginComponent
  ]
})

export class AuthModule {
}
