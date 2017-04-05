import {Routes} from '@angular/router';
import {AuthGuard} from '../auth/auth-guard.service';
import {PollListComponent} from './poll-list.component';
import {PollDetailComponent} from './poll-detail.component';
import {PollAddComponent} from './poll-add.component';


export const pollRoutes: Routes = [
  {path: 'polls', component: PollListComponent, canActivate: [AuthGuard]},
  {path: 'polls/:id', component: PollDetailComponent, canActivate: [AuthGuard]},
  {path: 'add-poll', component: PollAddComponent, canActivate: [AuthGuard]}
];
