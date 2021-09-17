import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MapperPipeModule } from 'projects/ngnix-lib/src/public-api';
import { PipesShocaseRoutingModule } from './pipes-routing.module';
import { PipesShowcaseComponent } from './containers/pipes-showcase/pipes-showcase.component';


@NgModule({
  declarations: [
    PipesShowcaseComponent
  ],
  imports: [
    CommonModule,
    PipesShocaseRoutingModule,
    MapperPipeModule
  ]
})
export class PipesShowcaseModule { }
