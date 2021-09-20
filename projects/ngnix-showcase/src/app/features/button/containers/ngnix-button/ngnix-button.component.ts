import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgNixColor } from 'ngnix-lib/src/lib/core/enums/color';

@Component({
  selector: 'ngnix-button-showcase',
  templateUrl: 'ngnix-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgNixShowcaseButtonComponent {
  constructor() { }

  readonly allButtonTypesByColor: ReadonlyArray<NgNixColor> = [NgNixColor.Primary, NgNixColor.Secondary, NgNixColor.Danger];
}
