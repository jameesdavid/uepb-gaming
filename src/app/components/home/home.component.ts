import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  displayLogin: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  loginWithGoogleAuth() {
    this.authService
      .GoogleAuth()
      .then((res) => {
        this.router.navigate(['me']);
      })
      .catch((err) => {
        console.log(err);
      });
  }

}
