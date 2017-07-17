import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../shared/auth/auth-guard.service';
import {UserListComponent} from './user-list.component';
import {UserAddComponent} from './user-add.component';

const userRoutes: Routes = [
  {path: 'users', component: UserListComponent, canActivate: [AuthGuard]},
  {path: 'users/:id/edit', component: UserAddComponent, canActivate: [AuthGuard]},
  {path: 'add-user', component: UserAddComponent, canActivate: [AuthGuard]}
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
