import { Inject, Injectable } from "@angular/core";
import { SafeHtml, DomSanitizer } from "@angular/platform-browser";
import { BehaviorSubject } from "rxjs";
import { ICONS } from "ngnix-lib/src/lib/core/tokens";

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

  define(icons: Record<string, string>) {

  }

}
