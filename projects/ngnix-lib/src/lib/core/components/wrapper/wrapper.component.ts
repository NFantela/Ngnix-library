import { Component,ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ngnix-wrapper',
  templateUrl: 'wrapper.component.html' ,
  styleUrls: ['wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgNixWrapperComponent {
  constructor() { }
}
