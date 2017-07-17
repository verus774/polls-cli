import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PollListComponent} from './poll-list.component';
import {PollDetailComponent} from './poll-detail.component';
import {PollAddComponent} from './poll-add.component';
import {AuthenticatedGuard} from '../shared/guards/authenticated-guard.service';
import {PollResolver} from './poll-resolver.service';

const pollRoutes: Routes = [
  {path: 'polls', component: PollListComponent, canActivate: [AuthenticatedGuard]},
  {path: 'polls/:id', component: PollDetailComponent, canActivate: [AuthenticatedGuard], resolve: {poll: PollResolver}},
  {
    path: 'polls/:id/edit',
    component: PollAddComponent,
    canActivate: [AuthenticatedGuard],
    resolve: {poll: PollResolver}
  },
  {path: 'add-poll', component: PollAddComponent, canActivate: [AuthenticatedGuard]}
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
