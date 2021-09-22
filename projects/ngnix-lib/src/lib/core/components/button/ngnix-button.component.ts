import { Component, ChangeDetectionStrategy, Input, HostBinding, ElementRef, Inject, HostListener, ChangeDetectorRef } from '@angular/core';
import { NgNixInteractiveEl } from 'ngnix-lib/src/lib/cdk/abstract';
import { pressedStream, watchAndCheck } from 'ngnix-lib/src/lib/cdk/observables';
import { IsHoveredService, UnsubscribeService } from 'ngnix-lib/src/lib/cdk/services';
import { isNativeFocused } from 'ngnix-lib/src/lib/cdk/utils';
import { NgNixColor } from 'ngnix-lib/src/lib/core/enums';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'button[ngnix-button]',
  templateUrl: 'ngnix-button.component.html',
  styleUrls: ['ngnix-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UnsubscribeService]
})
export class NgNixButtonComponent extends NgNixInteractiveEl {

  constructor(
    @Inject(ElementRef) private readonly _elementRef: ElementRef<HTMLElement>,
    private readonly _isHoveredService: IsHoveredService,
    private readonly _changeDetRef: ChangeDetectorRef,
    private readonly _unsubscribeService$: UnsubscribeService
  ) {
    super();
    /** Use this element to watch for mouseenter | touch events and update hovered */
    _isHoveredService
      .createHovered$(_elementRef.nativeElement)
      .pipe(
        watchAndCheck(_changeDetRef), takeUntil(_unsubscribeService$))
      .subscribe(hovered => {
        this.changeHovered(hovered);
      });

    pressedStream(_elementRef.nativeElement)
      .pipe(watchAndCheck(_changeDetRef), takeUntil(_unsubscribeService$))
      .subscribe(pressed => {
        this.changePressed(pressed);
      });
  }

  /** Focused & disabled are abstract so we implement them here */
  @Input()
  disabled = false;

  /** This is reflected on hosts data-color attribute */
  @Input()
  @HostBinding('attr.data-color')
  color: NgNixColor | string = NgNixColor.Primary;

  @HostListener('focusin', ['true'])
  @HostListener('focusout', ['false'])
  onFocused(focused: boolean) {
    this.notifyFocusChange(focused);
  }

  get focused(): boolean {
    return isNativeFocused(this._elementRef.nativeElement);
  }

}
