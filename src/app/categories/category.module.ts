import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoryListComponent} from './category-list.component';
import {CategoryRoutingModule} from './category-routing.module';
import {CategoryService} from './category.service';
import {CategoryAddComponent} from './category-add.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CategoryRoutingModule
  ],
  declarations: [
    CategoryListComponent,
    CategoryAddComponent
  ],
  providers: [
    CategoryService
  ]
})

export class CategoryModule {
}
