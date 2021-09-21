import { isNativeFocused } from "ngnix-lib/src/lib/cdk/utils";
import { concat, fromEvent, merge, Observable } from "rxjs";
import { distinctUntilChanged, filter, ignoreElements, mapTo, repeat, shareReplay, startWith, switchMapTo, take, withLatestFrom } from "rxjs/operators";
import { lifespanValid } from "./lifespan-valid";


let documentMouseUpExists$: Observable<boolean>;
let documentMouseDownExists$: Observable<boolean>;

export function focusVisibleObservable(element: Element): Observable<boolean> {
  const elementBlur$ = fromEvent(element, 'blur');
  const { ownerDocument } = element;

  if (!ownerDocument) {
    throw new Error('no owner document for this element' + element.nodeName);
  }

  // grab on capture phase
  if (!documentMouseDownExists$ || !documentMouseUpExists$) {
    /** These 2 are only used  */
    documentMouseUpExists$ = fromEvent(ownerDocument, 'mouseup', {
      capture: true,
    }).pipe(lifespanValid(), startWith(false), shareReplay(1));

    documentMouseDownExists$ = fromEvent(ownerDocument, 'mousedown', {
      capture: true,
    }).pipe(lifespanValid(), startWith(false), shareReplay(1));
  }
  /**
   * after focus event on element
   * we start listening to blur events and wait 1st one not including tab change
   *
    */
  return merge(
    // focus events not including ones after mouse action
    // so concat will pass first focus value
    concat(
      fromEvent(element, 'focus').pipe(take(1)),
      // filtering out blur events when element remains focused so that we ignore browser tab focus loss
      elementBlur$.pipe(
        filter(() => !isNativeFocused(element)),
        take(1),
        ignoreElements(),
      ),
    ).pipe(
      repeat(),
      // with latest from additional funcitonality:
      // 2 new observables added and 3 param is function taking
      // original event from concat() and 2 other as params
      // so we get focus event and use withLatestFrom after that we expect elementBlur$ event
      withLatestFrom(
        documentMouseDownExists$,
        documentMouseUpExists$,
        (_event, elementActual, documentActual) =>
          elementActual || documentActual,
      ),
      filter(isUserFocus => !isUserFocus),
    ),
  ).pipe(
    // when above comes we start listening to blur & until it happens we have true
    switchMapTo(elementBlur$.pipe(
      mapTo(false),
      take(1),
      startWith(true))),
    distinctUntilChanged(),
  );

}

