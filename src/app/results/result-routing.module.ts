import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticatedGuard} from '../shared/guards/authenticated-guard.service';
import {ResultListComponent} from './result-list.component';
import {ResultDetailComponent} from './result-detail.component';
import {ResultResolver} from './result-resolver.service';

const routes: Routes = [
  {path: 'results', component: ResultListComponent, canActivate: [AuthenticatedGuard]},
  {
    path: 'results/:id',
    component: ResultDetailComponent,
    canActivate: [AuthenticatedGuard],
    resolve: {result: ResultResolver}
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class ResultRoutingModule {
}
