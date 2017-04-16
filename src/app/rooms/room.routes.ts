import {Routes} from '@angular/router';
import {RoomListComponent} from './room-list.component';
import {RoomComponent} from './room.component';


export const roomRoutes: Routes = [
  {path: 'rooms', component: RoomListComponent},
  {path: 'rooms/:id', component: RoomComponent}
];
