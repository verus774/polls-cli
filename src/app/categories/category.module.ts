import {NgModule} from '@angular/core';
import {CategoryListComponent} from './category-list.component';
import {CategoryRoutingModule} from './category-routing.module';
import {CategoryAddComponent} from './category-add.component';
import {FormsModule} from '@angular/forms';
import {ApiService} from '../shared/api.service';
import {NgPipesModule} from 'ngx-pipes';
import {SharedModule} from '../shared/shared.module';
import {CategoryResolver} from './category-resolver.service';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    NgPipesModule,
    CategoryRoutingModule,
    NgxPaginationModule
  ],
  declarations: [
    CategoryListComponent,
    CategoryAddComponent
  ],
  providers: [
    ApiService,
    CategoryResolver
  ]
})

export class CategoryModule {
}
