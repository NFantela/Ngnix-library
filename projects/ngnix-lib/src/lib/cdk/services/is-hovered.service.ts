import { DOCUMENT } from "@angular/common";
import { Inject, Injectable, NgZone } from "@angular/core";
import { fromEvent, merge, Observable } from "rxjs";
import { distinctUntilChanged, filter, mapTo, startWith, switchMap, take } from 'rxjs/operators';
import { zoneOptimized } from 'ngnix-lib/src/lib/cdk/observables';
import { getEventTarget } from 'ngnix-lib/src/lib/cdk/utils';

@Injectable({
  providedIn: 'root',
})
export class IsHoveredService {

  constructor(
    @Inject(DOCUMENT) private readonly _documentRef: Document,
    private readonly ngZone: NgZone,
  ) {
    this.mouseMoveAndTouchDocumentEvents$ = merge(
      fromEvent(_documentRef, 'mousemove'),
      fromEvent(_documentRef, 'touchend'),
    );
  }

  private readonly mouseMoveAndTouchDocumentEvents$: Observable<Event>;

  /** We register mouseenter or touchstart on element
   * when they fire we start listening to : mouseleave or
   * global mousemove | touchend events (which dont have our target) meaning user left the area
  */
  createHovered$(target: Element, options: AddEventListenerOptions = { passive: true }): Observable<boolean> {
    return merge(
      fromEvent(target, 'mouseenter', options),
      fromEvent(target, 'touchstart', options),
    ).pipe(
      switchMap(() =>
        merge(
          fromEvent(target, 'mouseleave', options),
          this.mouseMoveAndTouchDocumentEvents$.pipe(
            filter(event => !target.contains(getEventTarget(event))),
            zoneOptimized(this.ngZone),
            take(1),
          ),
        ).pipe(mapTo(false), startWith(true)),
      ),
      distinctUntilChanged(),
    );
  }
}
