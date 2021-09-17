import { Directive, EventEmitter, HostBinding, Input, Output } from "@angular/core";


@Directive()
export abstract class NgNxInteractiveEl {

  abstract disabled: boolean;

  abstract focused: boolean;

  @Input()
  canFocus = true;

  @Output()
  readonly focusedChange = new EventEmitter<boolean>();

  @HostBinding('class.disabled')
  get isDisabled(): boolean {
    return this.disabled;
  }

  @HostBinding('class.focused')
  get isFocused(): boolean {
    return !this.isDisabled && this.focused;
  }

  get isFocusable(): boolean {
    return !this.isDisabled && (this.canFocus || this.focused);
  }

  protected notifyFocusChange(focus: boolean) {
    this.focusedChange.emit(focus);
  }

}
