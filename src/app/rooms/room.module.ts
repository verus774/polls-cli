import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RoomRoutingModule} from './room-routing.module';
import {RoomService} from './room.service';
import {RoomListComponent} from './room-list.component';
import {RoomComponent} from './room.component';
import {ApiService} from '../shared/api.service';
import {NgPipesModule} from 'ngx-pipes';
import {SharedModule} from '../shared/shared.module';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    NgPipesModule,
    RoomRoutingModule,
    NgxPaginationModule
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
