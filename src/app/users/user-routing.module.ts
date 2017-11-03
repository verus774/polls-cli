import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticatedGuard} from '../shared/guards/authenticated-guard.service';
import {UserListComponent} from './user-list/user-list.component';
import {UserAddComponent} from './user-add/user-add.component';
import {AdminGuard} from '../shared/guards/admin-guard.service';
import {UserResolver} from './user-resolver.service';

const userRoutes: Routes = [
  {path: 'users', component: UserListComponent, canActivate: [AuthenticatedGuard, AdminGuard]},
  {
    path: 'users/:id/edit',
    component: UserAddComponent,
    canActivate: [AuthenticatedGuard, AdminGuard],
    resolve: {user: UserResolver}
  },
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
