import { Component,ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ngnix-showcase-pipes',
  templateUrl: 'pipes-showcase.component.html' ,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PipesShowcaseComponent {
  constructor() { }

  readonly mapperPipeFnUppercase = (someString:string = '') => someString.toUpperCase();
}
