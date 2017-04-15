import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {RoomListComponent} from './rooms/room-list.component';
import {routing} from './app.routes';
import {RoomService} from './rooms/room.service';
import {SignupComponent} from './auth/signup.component';
import {LoginComponent} from './auth/login.component';
import {AuthService} from './auth/auth.service';
import {PollListComponent} from './polls/poll-list.component';
import {PollService} from './polls/poll.service';
import {AuthGuard} from './auth/auth-guard.service';
import {PollAddComponent} from './polls/poll-add.component';
import {PollDetailComponent} from './polls/poll-detail.component';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {NavigationComponent} from './navigation.component';
import {ModalModule} from 'angular2-modal';
import {BootstrapModalModule} from 'angular2-modal/plugins/bootstrap';
import {SocketService} from './shared/socket.service';
import {HttpInterceptor} from './shared/http-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    RoomListComponent,
    PollListComponent,
    PollDetailComponent,
    PollAddComponent,
    SignupComponent,
    LoginComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    SimpleNotificationsModule.forRoot(),
    ModalModule.forRoot(),
    BootstrapModalModule,
    routing
  ],
  providers: [
    RoomService,
    PollService,
    AuthService,
    AuthGuard,
    SocketService,
    HttpInterceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
