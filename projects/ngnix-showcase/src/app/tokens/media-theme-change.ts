import { inject, InjectionToken } from "@angular/core";
import { WINDOW } from "@ng-web-apis/common";
import { fromEvent } from "rxjs";
import { startWith, map } from "rxjs/operators";

export const IS_DARK_MODE_BROWSER = new InjectionToken<any>('A browser has changed theme', {
  factory: () => {
    const window = inject(WINDOW);
    if (!window) {
      throw new Error("no window found")
    }
    const query = window.matchMedia('(prefers-color-scheme: dark)');

    return fromEvent<MediaQueryListEvent>(query, 'change').pipe(
      map<MediaQueryListEvent, boolean>(mQueryListEv => mQueryListEv.matches),
      startWith(query?.matches),
    );
  }
})
