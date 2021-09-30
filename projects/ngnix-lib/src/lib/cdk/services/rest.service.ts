import {Injectable} from '@angular/core';
import {Observable, Observer} from 'rxjs';
import {shareReplay} from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class RestService {
  /** Cache for all GET requests by their url, Observable */
    private _cache = new Map<string, Observable<string>>();

    makeGetRequest(url: string): Observable<string> {
        const cache = this._cache.get(url);

        if (cache) {
            return cache;
        }
        /** Create new observable that either complets on 200 or errors - 1 shot
         * also aborts request on unsub
        */
        const observable = new Observable((observer: Observer<string>) => {
            const xhr = new XMLHttpRequest();

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    const response = xhr.responseType ? xhr.response : xhr.responseText;

                    if (xhr.status === 200) {
                        observer.next(response);
                        observer.complete();
                    } else {
                        observer.error(response);
                    }
                }
            };

            xhr.open('GET', url);
            xhr.send();

            return () => {
                xhr.abort();
            };
        });
        const piped = observable.pipe(shareReplay(1));

        this._cache.set(url, piped);

        return piped;
    }
}
