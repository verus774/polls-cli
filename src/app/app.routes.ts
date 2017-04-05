import {RouterModule, Routes} from '@angular/router';
import {roomRoutes} from './rooms/room.routes';
import {authRoutes} from './auth/auth.routes';
import {pollRoutes} from './polls/poll.routes';

const appRoutes: Routes = [
  {path: '', redirectTo: '/rooms', pathMatch: 'full'},
  ...roomRoutes,
  ...authRoutes,
  ...pollRoutes,
  {path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
