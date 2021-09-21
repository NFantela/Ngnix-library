import { ChangeDetectorRef } from '@angular/core';
import { MonoTypeOperatorFunction } from 'rxjs';
import { tap } from 'rxjs/operators';

export function watchAndCheck<T>(changeDRef: ChangeDetectorRef): MonoTypeOperatorFunction<T> {
  return tap(() => {
    changeDRef.markForCheck();
  });
}
