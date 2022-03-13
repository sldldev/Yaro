


import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { darkTheme, lightTheme } from './themes';
import { ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  darkTheme = false;

  private theme = new BehaviorSubject<boolean>(this.darkTheme);
  themeObs = this.theme.asObservable();

  setTheme(isDark: boolean, theme: {}) {
    Object.keys(theme).forEach(k =>
      document.documentElement.style.setProperty(`--${k}`, theme[k])
    );
    this.theme.next(isDark);
  }

  getCurrTheme(): Observable<any> {
    return this.themeObs;
  }

  // The router only destroys and recreates the component when it navigates to a different route.
  // When only route params or query params are updated but the route is the same, the component  won't be destroyed and recreated.
  // Thus, Force init on page reload to get latest dark mode from the local storage.
  constructor(route: ActivatedRoute) {
    route.params.subscribe(val => {
      // put the code from `ngOnInit` here
      const darkMode = localStorage.getItem('darkMode');
      this.darkTheme = true;
      if (typeof (darkMode) === 'undefined' || darkMode === 'enabled') {
        this.darkTheme = false;
      }
      this.toggleTheme();
    });
  }


/**
 * method responsible to change app theme
 */
  toggleTheme() {
    this.darkTheme = !this.darkTheme;
    if (this.darkTheme) {
      this.setTheme(true, darkTheme);
      localStorage.setItem('darkMode', 'enabled');
    } else {
      this.setTheme(false, lightTheme);
      localStorage.setItem('darkMode', null);
    }
  }

}
