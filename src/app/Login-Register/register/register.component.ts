import { ThemeService } from '../../Services/theme.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  cloudAnimation = false;

  darkTheme = false;

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    // make clud animation once per a session
    if (!sessionStorage.getItem('cloudAnim')) {
      this.cloudAnimation = true;
    }
    sessionStorage.setItem('cloudAnim', 'true');

    this.themeService.getCurrTheme().subscribe(v => {
      this.darkTheme = v;
    });
  }

  // if (themeService.isDark()) {
  //   this.darkThemeLogo = true;
  // }
}


