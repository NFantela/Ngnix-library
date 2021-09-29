import { Inject, Injectable, SecurityContext } from "@angular/core";
import { SafeHtml, DomSanitizer } from "@angular/platform-browser";
import { BehaviorSubject } from "rxjs";
import { ICONS } from "ngnix-lib/src/lib/core/tokens";
import { convertIcon } from "ngnix-lib/src/lib/core/utilities/dom";

@Injectable({
  providedIn: 'root',
})
export class SvgIconLoaderService {

  readonly iconItems$ = new BehaviorSubject<Map<string, SafeHtml>>(new Map());

  private baseIcons: Record<string, string> = {};

  constructor(
    @Inject(DomSanitizer) private readonly _sanitizer: DomSanitizer,
    @Inject(ICONS) icons: Record<string, string>,
  ) {
    this.define(icons);
  }

  /** Create a new icon and push it back to subject */
  define(icons: Record<string, string>) {
    const { value } = this.iconItems$;

    Object.keys(icons).forEach(key => {
      this._defineIcon(key, icons[key], value);
    });

    this.iconItems$.next(value);
  }

  /** Object of all currently available icons */
  getOriginalIcon(name: string): string | null {
    return this.baseIcons[name] || null;
  }

  /** Creates svg string adds it to map gained from subject and also to baseIcons */
  private _defineIcon(name: string, src: string, map: Map<string, SafeHtml>) {
    if (map.has(name)) {
      return;
    }
    const parsedIcon = this._parseIconSrc(name, src);

    if (!parsedIcon) {
      console.warn("Unable to parse icon " + name)
      return;
    }

    map.set(name, parsedIcon);
    this.baseIcons = {
      ...this.baseIcons,
      [name]: src,
    };
  }

  private _parseIconSrc(name: string, src: string): SafeHtml {
    return this._sanitizeIconString(convertIcon(src, name));
  }

  private _sanitizeIconString(src: string): SafeHtml {
    const sanitizedStringOrNull = this._sanitizer.sanitize(SecurityContext.HTML, src);
    return this._sanitizer.bypassSecurityTrustHtml(sanitizedStringOrNull ?? '')
  }

}
