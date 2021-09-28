import {InjectionToken} from '@angular/core';

export const ICONS = new InjectionToken<Record<string, string>>(
    'A record of icon names and src to be defined with SvgIconLoaderService',
    {
        factory: () => ({}),
    },
);
