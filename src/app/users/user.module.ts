import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgPipesModule} from 'ngx-pipes';
import {UserRoutingModule} from './user-routing.module';
import {UserListComponent} from './user-list.component';
import {ApiService} from '../shared/api.service';
import {UserAddComponent} from './user-add.component';
import {SharedModule} from '../shared/shared.module';
import {UserResolver} from './user-resolver.service';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    NgPipesModule,
    UserRoutingModule
  ],
  declarations: [
    UserListComponent,
    UserAddComponent
  ],
  providers: [
    ApiService,
    UserResolver
  ]
})

export class UserModule {
}
