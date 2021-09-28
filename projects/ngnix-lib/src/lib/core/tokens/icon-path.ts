import { InjectionToken } from '@angular/core';
import { iconPathFactory } from '../misc';


export const TUI_ICONS_PATH: InjectionToken<
  (value: string) => string
> = new InjectionToken<(value: string) => string>(
  'Fn that takes in id to retrieve icons by their name',
  {
    factory: () => iconPathFactory('assets/ngnix-lib/icons/'),
  },
);
