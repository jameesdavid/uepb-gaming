import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login = {
    email: null,
    senha: null,
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

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

  loginWithEmailAndPassword() {
    this.authService
      .loginWithEmailAndPassword(this.login)
      .then((res) => {
        this.router.navigate(['me']);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
