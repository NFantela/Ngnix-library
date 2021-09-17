import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AComponent } from './a/a.component';
// modules have to be imported this way or it will break cannot use relative etc
import { LibraryBModule } from 'ngnix-lib/src/lib/library-b';


@NgModule({
  declarations: [
    AComponent
  ],
  imports: [
    CommonModule,
    LibraryBModule
  ],
  exports:[
    AComponent
  ]
})
export class LibraryAModule { }
