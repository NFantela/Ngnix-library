import { fromEvent, Observable } from 'rxjs';
import { filter, mapTo, startWith, switchMapTo, take } from 'rxjs/operators';
import { mouseDragFinish } from './mouse-drag-finish';


/** This one will emit only if mouse down and mouseup | dragend finished on the same target */
export function pressedStream(element: Element): Observable<boolean> {
  const { ownerDocument } = element;

  if (!ownerDocument) {
    throw new Error('element does not have ownerDocument');
  }

  return fromEvent(element, 'mousedown').pipe(
    // trusted is generated by user action
    filter(({ isTrusted }) => isTrusted),
    switchMapTo(
      mouseDragFinish(ownerDocument).pipe(
        mapTo(false),
        take(1),
        startWith(true),
      ),
    ),
  );
}