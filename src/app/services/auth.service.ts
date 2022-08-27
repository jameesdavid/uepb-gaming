import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  AuthLogin(provider: any) {
    return this.afAuth.signInWithPopup(provider)
      .then((res) => console.log("Logged In ", res))
      .catch((err) => console.log("Error: ", err));
  }

  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }
}
