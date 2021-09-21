import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Remember to always provide it where used
 */
@Injectable()
export class UnsubscribeService extends Subject<void> implements OnDestroy {
  ngOnDestroy() {
    this.next();
    this.complete();
  }
}
