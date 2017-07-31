import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgPipesModule} from 'ngx-pipes';
import {UserRoutingModule} from './user-routing.module';
import {UserListComponent} from './user-list.component';
import {ApiService} from '../shared/api.service';
import {UserAddComponent} from './user-add.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgPipesModule,
    UserRoutingModule,
    TranslateModule
  ],
  declarations: [
    UserListComponent,
    UserAddComponent
  ],
  providers: [
    ApiService
  ]
})

export class UserModule {
}
