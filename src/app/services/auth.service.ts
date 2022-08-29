import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;

  constructor(private auth: AngularFireAuth, private router: Router) {
    this.auth.authState.subscribe({
      next: (user) => {
        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user')!);
        } else {
          this.userData = null;
          localStorage.setItem('user', 'null');
          JSON.parse(localStorage.getItem('user')!);
          this.router.navigate(['']);
        }
      },
      error: (e) => console.log(e),
      complete: () => console.log("Auth State Completed")
    });
  }

  get userLoggedIn() {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user ? user : null;
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    // return user !== null && user.emailVerified !== false ? true : false;
    return user ? true : false;
  }

  async logout() {
    this.userData = null;
    return await this.auth.signOut();
  }

  loginWithEmailAndPassword(log: any) {
    return this.auth.signInWithEmailAndPassword(log.email, log.password);
  }

  AuthLoginWithGoogle(provider: any) {
    return this.auth.signInWithPopup(provider);
  }

  GoogleAuth() {
    return this.AuthLoginWithGoogle(new GoogleAuthProvider())
  }
}
