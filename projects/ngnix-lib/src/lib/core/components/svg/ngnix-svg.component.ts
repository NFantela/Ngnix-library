import { DOCUMENT } from '@angular/common';
import { Component, ChangeDetectionStrategy, Input, Inject, ElementRef } from '@angular/core';
import { USER_AGENT, WINDOW } from '@ng-web-apis/common';
import { SvgIconLoaderService } from 'ngnix-lib/src/lib/core/services';
import { DEFAULT_ICON_PATH } from 'ngnix-lib/src/lib/core/constants';
import { Observable, of, ReplaySubject } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { switchMap, startWith } from 'rxjs/operators';
import { makePure } from 'ngnix-lib/src/lib/cdk/decorators';
import { RestService } from 'ngnix-lib/src/lib/cdk/services';

@Component({
  selector: 'ngnix-svg',
  templateUrl: 'ngnix-svg.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgNixSvgComponent {

  constructor(
    @Inject(DOCUMENT) private readonly _documentRef: Document,
    @Inject(WINDOW) private readonly _windowRef: Window,
    @Inject(DEFAULT_ICON_PATH) private readonly _iconsPath: (val: string) => string,
    @Inject(USER_AGENT) private readonly _userAgent: string,
    private readonly _svgIconService: SvgIconLoaderService,
    private readonly _elementRef: ElementRef<Element>,
    private readonly _sanitizer: DomSanitizer,
    private readonly _restService: RestService
  ) {
    // this.innerHTML$ = this._src$$.pipe(
    //   switchMap(() =>
    //     this.isExternal
    //       ? this.getExternalIcon(this.icon)
    //       : of(this.getSafeHtml(this.icon)),
    //   ),
    //   startWith(''),
    // );
  }

  private _icon = '';
  private readonly _src$$ = new ReplaySubject<void>(1);
  readonly innerHTML$: Observable<SafeHtml> | undefined;

  /** Can be:
   *  1) named icon e.g. customMastercard (define them in SvgIconLoaderService)
   * 2) source code e.g. <svg>...</svg>
   * 3) external "https://some-web-icon-provider/dinosaur.svg"
   */
  @Input()
  set src(src: string) {
    this._icon = src;
    this._src$$.next();
  }

  get use(): string {
    return this._icon.includes('.svg#')
      ? this._icon
      : this.createIconName(this._icon, this._iconsPath);
  }

  private get isUse(): boolean {
    return this.use.includes('.svg#');
  }

  private get isExternal(): boolean {
    return this.isUrl || this.isUse || this.isCrossDomain;
  }

  // e.g. "https://some-web-icon-provider/dinosaur.svg"
  private get isUrl(): boolean {
    return this._icon.endsWith('.svg');
  }

  @makePure
  private createIconName(name: string, iconsPath: (val: string) => string): string {
    return iconsPath(name);
  }

  /** if we have http and not starting with app url (window.origin) */
  private get isCrossDomain(): boolean {
    const { use, isUse, _windowRef } = this;

    return (
      isUse &&
      use.startsWith('http') &&
      !!_windowRef.origin &&
      !use.startsWith(_windowRef.origin)
    );
  }


}
