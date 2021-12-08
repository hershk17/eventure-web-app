import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { AlertController } from '@ionic/angular';
import { collection, doc, getDoc, getDocs, getFirestore } from 'firebase/firestore';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { User } from '../shared/auth';
import { Observable } from 'rxjs';

export interface Event {
  capacity: number;
  date: string;
  deleted: boolean;
  description: string;
  entryFee: number;
  eventID: string;
  eventName: string;
  feeReqd: boolean;
  images: string[];
  locationID: string;
  organizers: string[];
  participants: string[];
  reviews: string[];
  score: number;
  time: string[];
  visibility: string;
}

@Injectable({
  providedIn: 'root',
})
export class DbService {
  userData: any;

  private app = firebase.initializeApp(environment.firebase);
  private db = getFirestore();

  private events: any = [];

  constructor(
    public auth: AngularFireAuth,
    public afStore: AngularFirestore,
    public router: Router,
    public ngZone: NgZone,
    private alertController: AlertController
  ) {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  async presentAlert(title: string, msg: string): Promise<void> {
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: [
        {
          text: 'OK',
        },
      ],
    });
    await alert.present();
  }

  public async getEvents(): Promise<Event[]> {
    this.events = [];
    const querySnapshot = await getDocs(collection(this.db, 'Events'));
    querySnapshot.forEach((docu) => {
      const data: any = docu.data();
      const event: Event = data;
      this.events.push(event);
    });
    return this.events;
  }

  public getEventByID(id: string): Event {
    for (const event of this.events) {
      if (event.eventID === id) {
        return event;
      }
    }
    return null;
  }

  public signinAsGuest(email: string, pass: string) {
    this.auth
      .signInAnonymously()
      .then((res: any) => console.log(res))
      .catch((error: any) => console.error(error));
  }

  public signInUsingEmail(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  public registerUsingEmail(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  public async sendVerificationMail() {
    await (await this.auth.currentUser).sendEmailVerification();
    this.router.navigate(['verify-email']);
  }

  public async sendPasswordResetMail(passwordResetEmail: any) {
    try {
      await this.auth.sendPasswordResetEmail(passwordResetEmail);
      window.alert(
        'Password reset email has been sent, please check your inbox.'
      );
    } catch (error) {
      window.alert(error);
    }
  }

  public isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null && user.emailVerified !== false ? true : false;
  }

  public async isEmailVerified(): Promise<boolean> {
    (await this.auth.currentUser).reload();
    return (await this.auth.currentUser).emailVerified !== false ? true : false;
  }

  public setUserData(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      // displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      firstName: user.firstName,
      lastName: user.lastName
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  public getUserByUid( userUid: string ): Observable<any> {
    return this.afStore.collection<any> ( 'users' , ref => ref.where ( 'uid' , '==' , userUid ) ).valueChanges ();
  }

  public getUserByEmail( userEmail: string ): Observable<any> {
    return this.afStore.collection<any> ( 'users' , ref => ref.where ( 'email' , '==' , userEmail ) ).valueChanges ();
  }


  public async getUserData() {
    const userDoc = await getDoc(doc(this.db, 'users', (await this.auth.currentUser).uid));
    console.log(userDoc.data());
  }
  // public async getUserDataByUid(uid: string): Promise<User>  {
  //   const userDoc = await getDoc(doc(this.db, 'users', (await this.auth.currentUser).uid));
  //   console.log(userDoc.data());
  // }

  public async signOut() {
    await this.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }
}
