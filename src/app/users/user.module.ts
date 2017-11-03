import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgPipesModule} from 'ngx-pipes';
import {UserRoutingModule} from './user-routing.module';
import {UserListComponent} from './user-list/user-list.component';
import {ApiService} from '../shared/api.service';
import {UserAddComponent} from './user-add/user-add.component';
import {SharedModule} from '../shared/shared.module';
import {UserResolver} from './user-resolver.service';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    NgPipesModule,
    UserRoutingModule,
    NgxPaginationModule
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
