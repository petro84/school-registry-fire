import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';

import { Admin } from '../models/admin.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  currentUser: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private fs: AngularFirestore,
    private fa: AngularFireAuth,
    private router: Router
  ) {
    this.fa.authState.subscribe((user) => {
      if (user) {
        this.currentUser.next(user);
        localStorage.setItem('user', JSON.stringify(user));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        this.currentUser.next(null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  signIn(email: string, password: string) {
    return this.fa
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.setUserData(result.user);
        this.fa.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['']);
          }
        });
      });
  }

  signUp(email: string, password: string, displayName: string) {
    return this.fa
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user.updateProfile({
          displayName
        });
        // this.setUserData(result.user);
        this.fa.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['']);
          }
        });
      });
  }

  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> =
      this.fs.doc(`admins/${user.uid}`);
    const data: Admin = {
      email: user.email,
      displayName: user.displayName
    };

    return userRef.set(data, { merge: true });
  }

  signOut() {
    return this.fa.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['']);
    });
  }
}
