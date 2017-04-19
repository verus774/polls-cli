import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoomListComponent} from './room-list.component';
import {RoomComponent} from './room.component';

const roomRoutes: Routes = [
  {path: 'rooms', component: RoomListComponent},
  {path: 'rooms/:id', component: RoomComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(roomRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class RoomRoutingModule {
}
