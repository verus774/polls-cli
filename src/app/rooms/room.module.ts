import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RoomRoutingModule} from './room-routing.module';
import {RoomService} from './room.service';
import {RoomListComponent} from './room-list.component';
import {RoomComponent} from './room.component';
import {ApiService} from '../shared/api.service';
import {NgPipesModule} from 'ngx-pipes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgPipesModule,
    RoomRoutingModule
  ],
  declarations: [
    RoomListComponent,
    RoomComponent
  ],
  providers: [
    RoomService,
    ApiService
  ]
})

export class RoomModule {
}
