import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RoomRoutingModule} from './room-routing.module';
import {RoomService} from './room.service';
import {RoomListComponent} from './room-list/room-list.component';
import {RoomDetailComponent} from './room-detail/room-detail.component';
import {ApiService} from '../shared/api.service';
import {NgPipesModule} from 'ngx-pipes';
import {SharedModule} from '../shared/shared.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {RoomResolver} from './room-resolver.service';

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
    RoomDetailComponent
  ],
  providers: [
    RoomService,
    RoomResolver,
    ApiService
  ]
})

export class RoomModule {
}
