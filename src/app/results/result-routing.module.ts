import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../shared/auth/auth-guard.service';
import {ResultListComponent} from './result-list.component';
import {ResultDetailComponent} from './result-detail.component';

const routes: Routes = [
  {path: 'results', component: ResultListComponent, canActivate: [AuthGuard]},
  {path: 'results/:id', component: ResultDetailComponent, canActivate: [AuthGuard]}
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
