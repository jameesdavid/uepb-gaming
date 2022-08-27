import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = {
    email: null,
    senha: null
  }

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    
  }

}
