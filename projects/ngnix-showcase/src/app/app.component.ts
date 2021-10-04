import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IS_DARK_MODE_BROWSER } from './tokens/media-theme-change';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngnix-showcase';
  constructor(@Inject(IS_DARK_MODE_BROWSER) private readonly _themeChange$:Observable<MediaQueryListEvent>){
  }
}
