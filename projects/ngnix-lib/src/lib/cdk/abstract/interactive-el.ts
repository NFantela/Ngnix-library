import { Directive, EventEmitter, HostBinding, Input, Output } from "@angular/core";


@Directive()
export abstract class NgNixInteractiveEl {

  abstract disabled: boolean;

  abstract focused: boolean;

  hovered = false;

  pressed = false;

  @Input()
  canFocus = true;

  @Output()
  readonly focusedChange = new EventEmitter<boolean>();

  @Output()
  readonly hoveredChange = new EventEmitter<boolean>();

  @Output()
  readonly pressedChange = new EventEmitter<boolean>();

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

  protected changeHovered(hovered: boolean) {
    if (this.hovered === hovered) {
      return;
    }

    this.hovered = hovered;
    this.hoveredChange.emit(hovered);
  }

  protected changePressed(pressed: boolean) {
    if (this.pressed === pressed) {
      return;
    }
    this.pressed = pressed;
    this.pressedChange.emit(pressed);
  }
}
