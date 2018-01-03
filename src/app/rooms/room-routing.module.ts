import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoomListComponent} from './room-list/room-list.component';
import {RoomDetailComponent} from './room-detail/room-detail.component';
import {RoomResolver} from './room-resolver.service';

const roomRoutes: Routes = [
  {path: 'rooms', component: RoomListComponent},
  {path: 'rooms/:id', component: RoomDetailComponent, resolve: {room: RoomResolver}}
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
