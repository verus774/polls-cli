import {NgModule} from '@angular/core';
import {ResultListComponent} from './result-list/result-list.component';
import {ResultRoutingModule} from './result-routing.module';
import {ResultDetailComponent} from './result-detail/result-detail.component';
import {ResultResolver} from './result-resolver.service';
import {ApiService} from '../shared/api.service';
import {NgPipesModule} from 'ngx-pipes';
import {SharedModule} from '../shared/shared.module';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    SharedModule,
    NgPipesModule,
    ResultRoutingModule,
    NgxPaginationModule
  ],
  declarations: [
    ResultListComponent,
    ResultDetailComponent
  ],
  providers: [
    ApiService,
    ResultResolver
  ]
})

export class ResultModule {
}
