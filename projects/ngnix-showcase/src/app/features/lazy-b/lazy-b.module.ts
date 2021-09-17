import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyBRoutingModule } from './lazy-b-routing.module';
import { LazyBComponent } from './containers/lazy-b.component';


@NgModule({
  declarations: [
    LazyBComponent
  ],
  imports: [
    CommonModule,
    LazyBRoutingModule
  ]
})
export class LazyBModule { }
