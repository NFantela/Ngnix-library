import { NgModule } from '@angular/core';
import { NgNixButtonComponent } from './ngnix-button.component';
import { NgNixWrapperModule } from 'ngnix-lib/src/lib/core/components/wrapper';

@NgModule({
  imports: [NgNixWrapperModule],
  declarations: [NgNixButtonComponent],
  exports: [NgNixButtonComponent]
})
export class NgNixButtonModule { }
