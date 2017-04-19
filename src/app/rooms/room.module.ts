import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RoomRoutingModule} from './room-routing.module';
import {RoomService} from './room.service';
import {RoomListComponent} from './room-list.component';
import {RoomComponent} from './room.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RoomRoutingModule
  ],
  declarations: [
    RoomListComponent,
    RoomComponent
  ],
  providers: [
    RoomService
  ]
})

export class RoomModule {
}
