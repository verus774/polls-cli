import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CategoryListComponent} from './category-list.component';
import {AuthGuard} from '../shared/auth/auth-guard.service';
import {CategoryAddComponent} from './category-add.component';

const categoryRoutes: Routes = [
  {path: 'categories', component: CategoryListComponent, canActivate: [AuthGuard]},
  {path: 'categories/:id/edit', component: CategoryAddComponent, canActivate: [AuthGuard]},
  {path: 'add-category', component: CategoryAddComponent, canActivate: [AuthGuard]}
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
