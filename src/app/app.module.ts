import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {AuthService} from './shared/auth.service';
import {AuthenticatedGuard} from './shared/guards/authenticated-guard.service';
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
import {AdminGuard} from './shared/guards/admin-guard.service';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {LocalSettingsService} from './shared/local-settings.service';
import {TokenInterceptor} from './shared/token.interceptor';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    ModalModule.forRoot(),
    BootstrapModalModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
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
    AuthenticatedGuard,
    AdminGuard,
    SocketService,
    LocalSettingsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
