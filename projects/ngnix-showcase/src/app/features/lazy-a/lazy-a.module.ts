import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyARoutingModule } from './lazy-a-routing.module';
import { LazyAComponent } from './containers/lazy-a.component';
import { LibraryAModule } from 'projects/ngnix-lib/src/public-api';


@NgModule({
  declarations: [
    LazyAComponent,
  ],
  imports: [
    CommonModule,
    LazyARoutingModule,
    LibraryAModule /** Include library module so we can use it */
  ]
})
export class LazyAModule { }
