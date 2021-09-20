import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ButtonShowcaseRoutingModule } from './button-routing.module';
import { NgNixShowcaseButtonComponent } from './containers/ngnix-button/ngnix-button.component';
import { NgNixButtonModule } from 'ngnix-lib/src/public-api';


@NgModule({
  declarations: [
    NgNixShowcaseButtonComponent
  ],
  imports: [
    CommonModule,
    ButtonShowcaseRoutingModule,
    NgNixButtonModule
  ]
})
export class ButtonShowcaseModule { }
