import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LazyAComponent } from './containers/lazy-a.component';

const routes: Routes = [{ path: '', component: LazyAComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LazyARoutingModule { }
