import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
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
import {requestOptionsProvider} from './shared/default-request-options';
import {AuthGuard} from './auth/auth-guard.service';
import {PollAddComponent} from './polls/poll-add.component';
import {PollDetailComponent} from './polls/poll-detail.component';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    RoomListComponent,
    PollListComponent,
    PollDetailComponent,
    PollAddComponent,
    SignupComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    SimpleNotificationsModule.forRoot(),
    routing
  ],
  providers: [
    RoomService,
    PollService,
    AuthService,
    AuthGuard,
    // { provide: Http, useClass: HttpInterceptor },
    requestOptionsProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
