import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgPipesModule} from 'ngx-pipes';
import {UserRoutingModule} from './user-routing.module';
import {UserListComponent} from './user-list.component';
import {ApiService} from '../shared/api.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgPipesModule,
    UserRoutingModule
  ],
  declarations: [
    UserListComponent
  ],
  providers: [
    ApiService
  ]
})

export class UserModule {
}
