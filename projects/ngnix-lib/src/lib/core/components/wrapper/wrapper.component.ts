import { Component, ChangeDetectionStrategy, Input, Inject, HostBinding } from '@angular/core';
import { IS_MOBILE } from 'ngnix-lib/src/lib/cdk/tokens';
import { NgNixInteractiveState } from 'ngnix-lib/src/lib/core/enums';

@Component({
  selector: 'ngnix-wrapper',
  templateUrl: 'wrapper.component.html',
  styleUrls: ['wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgNixWrapperComponent {

  constructor(@Inject(IS_MOBILE) private readonly isMobile: boolean) { }

  /** Now all of these inputs will be provided by wrapped component
   * e.g. button component
   */
  @Input()
  pressed = false;

  @Input()
  focused = false;

  @Input()
  disabled = false;

  @Input()
  readOnly = false;

  @Input()
  hovered = false;

  @HostBinding('class.focused')
  get isFocused(): boolean {
    return this.focused && !this.disabled;
  }

  @HostBinding('class.invalid')
  get isInvalid(): boolean {
    return !this.disabled && !this.readOnly;
  }

  @HostBinding('attr.data-state')
  get currentInteractiveState(): NgNixInteractiveState | null {

    if (this.pressed && !this.isMobile) {
      return NgNixInteractiveState.Pressed;
    }

    if (this.hovered && !this.isMobile) {
      return NgNixInteractiveState.Hovered;
    }

    if (this.disabled) {
      return NgNixInteractiveState.Disabled;
    }

    if (this.readOnly) {
      return NgNixInteractiveState.Readonly;
    }
    return null;
  }

}
