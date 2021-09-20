import { Component, ChangeDetectionStrategy, Input, HostBinding, ElementRef, Inject, HostListener } from '@angular/core';
import { NgNixInteractiveEl } from 'ngnix-lib/src/lib/cdk/abstract';
import { IsHoveredService } from 'ngnix-lib/src/lib/cdk/services';
import { isNativeFocused } from 'ngnix-lib/src/lib/cdk/utils';
import { NgNixColor } from 'ngnix-lib/src/lib/core/enums';


@Component({
  selector: 'button[ngnix-button]',
  templateUrl: 'ngnix-button.component.html',
  styleUrls: ['ngnix-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgNixButtonComponent extends NgNixInteractiveEl {
  constructor(
    @Inject(ElementRef) private readonly _elementRef: ElementRef<HTMLElement>,
    private readonly _isHoveredService: IsHoveredService
  ) {
    super();
    // _isHoveredService
    //   .createHovered$(_elementRef.nativeElement)
    //   .pipe(watch(changeDetectorRef), takeUntil(destroy$))
    //   .subscribe(hovered => {
    //     this.changeHovered(hovered);
    //   });
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
