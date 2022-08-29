import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RestService } from '../../services/rest.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  logged: boolean = false;

  id: any;

  user: any;

  photoURL: any = "assets/user_default.jpg";

  constructor(private authService: AuthService, private restService: RestService, private router: Router, private sanitizer: DomSanitizer) {
    this.restService.get(this.authService.userLoggedIn.uid).subscribe({
      next: (res: any) => {
        if(res) {
          this.user = res;
        } else {
          this.router.navigate(['edit']);
        }
      },
      error: (e) => console.log(e),
      complete: () => console.log("complete")
    });
  }

  ngOnInit(): void {
  }

}
