import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CategoryListComponent} from './category-list/category-list.component';
import {AuthenticatedGuard} from '../shared/guards/authenticated-guard.service';
import {CategoryAddComponent} from './category-add/category-add.component';
import {CategoryResolver} from './category-resolver.service';

const categoryRoutes: Routes = [
  {path: 'categories', component: CategoryListComponent, canActivate: [AuthenticatedGuard]},
  {
    path: 'categories/:id/edit',
    component: CategoryAddComponent,
    canActivate: [AuthenticatedGuard],
    resolve: {category: CategoryResolver}
  },
  {path: 'add-category', component: CategoryAddComponent, canActivate: [AuthenticatedGuard]}
];

@NgModule({
  imports: [
    RouterModule.forChild(categoryRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class CategoryRoutingModule {
}
