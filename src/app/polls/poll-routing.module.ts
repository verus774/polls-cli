import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PollListComponent} from './poll-list.component';
import {PollDetailComponent} from './poll-detail.component';
import {PollAddComponent} from './poll-add.component';
import {AuthGuard} from '../shared/auth/auth-guard.service';

const pollRoutes: Routes = [
  {path: 'polls', component: PollListComponent, canActivate: [AuthGuard]},
  {path: 'polls/:id', component: PollDetailComponent, canActivate: [AuthGuard]},
  {path: 'edit-poll/:id', component: PollAddComponent, canActivate: [AuthGuard]},
  {path: 'add-poll', component: PollAddComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [
    RouterModule.forChild(pollRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class PollRoutingModule {
}
