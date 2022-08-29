import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  displayDropdown: boolean = false;

  user;

  photoURL: any = "assets/user_default.jpg";

  constructor(private authService: AuthService, private router: Router, private sanitizer: DomSanitizer) {
    this.user = this.authService.userLoggedIn;
  }

  ngOnInit(): void {
    this.getImage()
  }

  async getImage() {
    this.photoURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.authService.userLoggedIn.photoURL);
  }

  logout() {
    this.authService.logout()
      .then(() => {
        console.log("logout");
      }).catch((e) => console.log(e));
  }

  toggleDropdown() {
    this.displayDropdown = !this.displayDropdown;
  }

}
