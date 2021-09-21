import { fromEvent, merge, Observable } from 'rxjs';
import { FullyTypedEventTarget, TypedEventWith } from 'ngnix-lib/src/lib/cdk/types';
/**
* Releasing mouse after it was pressed
 */
export function mouseDragFinish<
  T extends FullyTypedEventTarget<TypedEventWith<DragEvent, T>>>
  (target: Exclude<T, null>): Observable<TypedEventWith<MouseEvent, T>> {

  return merge(
    fromEvent(target, 'mouseup'),
    fromEvent(target, 'dragend')
  );
}
