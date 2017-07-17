import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoryListComponent} from './category-list.component';
import {CategoryRoutingModule} from './category-routing.module';
import {CategoryAddComponent} from './category-add.component';
import {FormsModule} from '@angular/forms';
import {ApiService} from '../shared/api.service';
import {NgPipesModule} from 'ngx-pipes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgPipesModule,
    CategoryRoutingModule
  ],
  declarations: [
    CategoryListComponent,
    CategoryAddComponent
  ],
  providers: [
    ApiService
  ]
})

export class CategoryModule {
}
