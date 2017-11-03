import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AuthRoutingModule} from './auth-routing.module';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {ApiService} from '../shared/api.service';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    AuthRoutingModule,
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
