import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LazyBComponent } from './containers/lazy-b.component';

const routes: Routes = [{ path: '', component: LazyBComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LazyBRoutingModule { }
