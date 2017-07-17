import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {AuthService} from './shared/auth/auth.service';
import {AuthGuard} from './shared/auth/auth-guard.service';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {NavigationComponent} from './navigation.component';
import {ModalModule} from 'angular2-modal';
import {BootstrapModalModule} from 'angular2-modal/plugins/bootstrap';
import {SocketService} from './shared/socket.service';
import {AppRoutingModule} from './app-routing.module';
import {PollModule} from './polls/poll.module';
import {RoomModule} from './rooms/room.module';
import {AuthModule} from './auth/auth.module';
import {CategoryModule} from './categories/category.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ResultModule} from './results/result.module';
import {UserModule} from './users/user.module';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    ModalModule.forRoot(),
    BootstrapModalModule,
    AuthModule,
    RoomModule,
    CategoryModule,
    PollModule,
    ResultModule,
    UserModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    SocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
