import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PipesShowcaseComponent } from './containers/pipes-showcase/pipes-showcase.component';

const routes: Routes = [{ path: '', component: PipesShowcaseComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PipesShocaseRoutingModule { }
