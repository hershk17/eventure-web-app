import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { AlertController } from '@ionic/angular';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from 'firebase/firestore';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment.prod';
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
      } else {
        localStorage.setItem('user', null);
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
    querySnapshot.forEach((res) => {
      const data: any = res.data();
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
    } catch (error) {
      this.presentAlert('Error', error);
    }
  }

  public isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null && user.emailVerified !== false ? true : false;
  }

  public async isEmailVerified(): Promise<boolean> {
    try {
      const user = await this.auth.currentUser;
      await user.reload();
      return user.emailVerified !== false ? true : false;
    } catch(error) {
      console.error(error);
      this.presentAlert('Error', 'Can\'t read user\'s state');
    }
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
      lastName: user.lastName,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  public getUserByUid(userUid: string): Observable<any> {
    return this.afStore
      .collection<any>('users', (ref) => ref.where('uid', '==', userUid))
      .valueChanges();
  }

  public getUserByEmail(userEmail: string): Observable<any> {
    return this.afStore
      .collection<any>('users', (ref) => ref.where('email', '==', userEmail))
      .valueChanges();
  }

  public async signOut() {
    await this.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['landing']);
  }

  public async getCurrentUser() {
    return await getDoc(
      doc(this.db, 'users', (await this.auth.currentUser).uid)
    );
  }
}
