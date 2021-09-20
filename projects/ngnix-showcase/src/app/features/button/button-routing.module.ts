import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgNixShowcaseButtonComponent } from './containers/ngnix-button/ngnix-button.component';

const routes: Routes = [{ path: '', component: NgNixShowcaseButtonComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ButtonShowcaseRoutingModule { }
