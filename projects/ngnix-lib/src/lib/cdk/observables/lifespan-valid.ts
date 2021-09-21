import { OperatorFunction, pipe, timer } from 'rxjs';
import { distinctUntilChanged, mapTo, startWith, switchMapTo } from 'rxjs/operators';

/**
 * After lifespan value is obsolete
 */
export function lifespanValid(currentLifespan: number = 0): OperatorFunction<any, boolean> {
  return pipe(
    switchMapTo(timer(currentLifespan).pipe(mapTo(false), startWith(true))),
    distinctUntilChanged(),
  );
}
