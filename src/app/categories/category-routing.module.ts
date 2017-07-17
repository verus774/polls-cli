import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CategoryListComponent} from './category-list.component';
import {AuthenticatedGuard} from '../shared/guards/authenticated-guard.service';
import {CategoryAddComponent} from './category-add.component';

const categoryRoutes: Routes = [
  {path: 'categories', component: CategoryListComponent, canActivate: [AuthenticatedGuard]},
  {path: 'categories/:id/edit', component: CategoryAddComponent, canActivate: [AuthenticatedGuard]},
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
