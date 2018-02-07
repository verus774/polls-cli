import {NgModule} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';
import {SharedRoutingModule} from './shared-routing.module';
import {ContactUsComponent} from './components/contact-us/contact-us.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    SharedRoutingModule
  ],
  exports: [
    CommonModule,
    TranslateModule
  ],
  declarations: [
    ContactUsComponent
  ]
})

export class SharedModule {
}
