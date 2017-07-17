import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticatedGuard} from '../shared/guards/authenticated-guard.service';
import {UserListComponent} from './user-list.component';
import {UserAddComponent} from './user-add.component';
import {AdminGuard} from '../shared/guards/admin-guard.service';

const userRoutes: Routes = [
  {path: 'users', component: UserListComponent, canActivate: [AuthenticatedGuard, AdminGuard]},
  {path: 'users/:id/edit', component: UserAddComponent, canActivate: [AuthenticatedGuard, AdminGuard]},
  {path: 'add-user', component: UserAddComponent, canActivate: [AuthenticatedGuard, AdminGuard]}
];

@NgModule({
  imports: [
    RouterModule.forChild(userRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class UserRoutingModule {
}
