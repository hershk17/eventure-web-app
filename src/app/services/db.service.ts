import { Injectable, NgZone } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { AlertController } from '@ionic/angular';
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  FieldValue,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { uploadBytes, getDownloadURL, ref, getStorage } from 'firebase/storage';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';
import { User } from '../shared/auth';
import { Observable } from 'rxjs';
import uniqid from 'uniqid';

export interface TomtomAddress {
  freeformAddress: string;
  streetNumber: number;
  streetName: string;
  country: string;
  countryCode: string;
  countrySubdivisionName: string;
  extendedPostalCode: string;
  municipality: string;
}

export interface Post {
  postid: string;
  timestamp: number;
  uid: string;
  imagePost: ImagePost;
  textPost: TextPost;
  type: string;
}

export interface TextPost {
  text: string;
}

export interface ImagePost {
  caption: string;
  image: any;
}

export interface TomtomLocation {
  address: TomtomAddress;
  category: string;
  id: string;
}

export interface Event {
  id: string;
  capacity: number;
  category: string[];
  date: string;
  description: string;
  entryFee: number;
  eventName: string;
  images: string[];
  location: TomtomLocation;
  organizer: string;
  participants: string[];
  reviews: string[];
  score: number;
  time: string;
  visibility: string;
}

@Injectable({
  providedIn: 'root',
})
export class DbService {
  public userData: any = null;
  public currentUser: any;

  private app = firebase.initializeApp(environment.firebase);
  private db = getFirestore();

  private events: any = [];
  private storage = getStorage();
  private posts: any = [];

  constructor(
    public auth: AngularFireAuth,
    public afStore: AngularFirestore,
    public router: Router,
    public ngZone: NgZone,
    private alertController: AlertController
  ) {
    this.auth.authState.subscribe(async (user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        this.getUserByUid(user.uid).subscribe((data) => {
          this.currentUser = data[0];
        });
      } else {
        localStorage.setItem('user', null);
      }
    });
  }
  /**
   * Do any validation to event data
   *
   * @param event
   * @returns true if valid
   */
  public validateEvent(event: Event): boolean {
    return true;
  }

  /**
   * @param imgFile a blob
   * @returns an url if upload successfully or null if fail
   */
  public async uploadImg(imgFile: any): Promise<string> {
    try {
      const name = uniqid('img-');
      const storageRef = ref(this.storage, name);
      const snapshot = await uploadBytes(storageRef, imgFile);
      const url = await getDownloadURL(ref(this.storage, name));
      return url;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  /**
   * @param event
   * @returns true if the event is uploaded successfully
   */
  public async uploadEvent(event: Event, imgFile: any): Promise<boolean> {
    const valid = this.validateEvent(event);
    if (!valid) {
      return false;
    }
    try {
      const url = await this.uploadImg(imgFile);
      if (!url) {
        return false;
      }
      event.images = [];
      event.images.push(url);
      await setDoc(doc(this.db, 'Events2', event.id), event);
      await this.afStore
        .doc(`users/${this.userData.uid}`)
        .update({ organized: arrayUnion(event.id) });
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  }

  public async joinEvent(eventID: string): Promise<boolean> {
    try {
      await this.afStore
        .doc(`users/${this.userData.uid}`)
        .update({ joined: arrayUnion(eventID) });
      await this.afStore
        .doc(`Events2/${eventID}`)
        .update({ participants: arrayUnion(this.userData.uid) });
      console.log('Joined event successfully');
    } catch (err) {
      console.error(err);
      return false;
    }
    return true;
  }

  public async leaveEvent(eventID: string): Promise<boolean> {
    try {
      await this.afStore
        .doc(`users/${this.userData.uid}`)
        .update({ joined: arrayRemove(eventID) });
      await this.afStore
        .doc(`Events2/${eventID}`)
        .update({ participants: arrayRemove(this.userData.uid) });
      console.log('Left event successfully');
    } catch (err) {
      console.error(err);
      return false;
    }
    return true;
  }

  public hasUserJoined(eventId) {
    if (
      this.currentUser === undefined ||
      this.currentUser.joined === undefined
    ) {
      return false;
    } else {
      return this.currentUser.joined.includes(eventId);
    }
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
    let following = [];
    this.getCurrentUser().then(async (userRes) => {
      const u = userRes.data();
      following = u.followings;
      const querySnapshot = await getDocs(collection(this.db, 'Events2'));
      querySnapshot.forEach((res) => {
        const event: any = res.data();
        if (
          event.visibility === 'Public' ||
          event.organizer === u.uid ||
          u.joined.includes(event.id) ||
          following.includes(event.organizer)
        ) {
          this.events.unshift(event);
        }
      });
    });
    return this.events;
  }

  public async removeEvent(id: string): Promise<boolean> {
    try {
      await this.afStore
        .doc(`users/${this.userData.uid}`)
        .update({ organized: arrayRemove(id) });
      await this.afStore.doc(`Events2/${id}`).delete();
      this.getEventByID(id).participants.forEach(async (participant) => {
        await this.afStore
          .doc(`users/${participant}`)
          .update({ joined: arrayRemove(id) });
      });
      await this.getEvents();
    } catch (err) {
      console.error(err);
      return false;
    }
    return true;
  }

  public async getJoined(): Promise<Event[]> {
    const joinedEvents: Event[] = [];
    this.getCurrentUser().then(async (userRes) => {
      const usr = userRes.data();
      this.events.forEach((event) => {
        if (usr.joined.includes(event.id)) {
          joinedEvents.push(event);
        }
      });
    });
    return joinedEvents;
  }

  public async getCreated(): Promise<Event[]> {
    const joinedEvents: Event[] = [];
    this.getCurrentUser().then(async (userRes) => {
      const usr = userRes.data();
      this.events.forEach((event) => {
        if (usr.organized.includes(event.id)) {
          joinedEvents.push(event);
        }
      });
    });
    return joinedEvents;
  }

  // either make this reference the database or set up observer/subscription to events collection for dynamic updates
  public getEventByID(id: string): Event {
    for (const event of this.events) {
      if (event.id === id) {
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
    } catch (error) {
      console.error(error);
      this.presentAlert('Error', 'Can\'t read user\'s state');
    }
  }

  public async setImagePost(aCaption: string, imgFile: any): Promise<boolean> {
    const timeStamp = new Date();
    // upload the image
    try {
      const url = await this.uploadImg(imgFile);
      console.log(url);
      if (!url) {
        console.log('no url');
        return false;
      }
      // create post locally
      const userPost: Post = {
        postid: 'p-' + timeStamp.getTime(),
        timestamp: timeStamp.getTime(),
        uid: (await this.currentUser).uid,
        textPost: null,
        imagePost: {
          image: [],
          caption: aCaption,
        },
        type: 'image',
      };

      // save the uploaded image to the imagePost
      userPost.imagePost.image.push(url);

      console.log(userPost);

      //save the post to posts
      await setDoc(doc(this.db, 'posts', userPost.postid), userPost);

      //save the postid to the user
      await this.afStore
        .doc(`users/${this.userData.uid}`)
        .update({ posted: arrayUnion(userPost.postid) });
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  }
  public async setTextPost(aTextPost: string): Promise<boolean> {
    const timeStamp = new Date();
    // create post locally
    const userPost: Post = {
      postid: 'p-' + timeStamp.getTime(),
      timestamp: timeStamp.getTime(),
      uid: this.currentUser.uid,
      textPost: {
        text: aTextPost,
      },
      imagePost: null,
      type: 'text',
    };

    //save the post to firestore
    await setDoc(doc(this.db, 'posts', userPost.postid), userPost);

    //save the postid to the user
    await this.afStore
      .doc(`users/${this.userData.uid}`)
      .update({ posted: arrayUnion(userPost.postid) });

    return true;
  }
  public setUserData(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      firstName: user.firstName,
      lastName: user.lastName,
      organized: [],
      joined: [],
      followings: [],
      followers: [],
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  public getUserByUid(userUid: string): Observable<any> {
    return this.afStore
      .collection<any>('users', (userRef) =>
        userRef.where('uid', '==', userUid)
      )
      .valueChanges();
  }

  public getUserByEmail(userEmail: string): Observable<any> {
    return this.afStore
      .collection<any>('users', (userRef) =>
        userRef.where('email', '==', userEmail)
      )
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

  //server
  public async getUserBySearchWord(searchWord) {
    console.log(this.userData.uid);
    const res = await fetch(
      `${environment.serverUrl}/api/search/users?byName=${searchWord}`,
      {
        method: 'GET',
        headers: {
          uid: this.userData.uid,
        },
      }
    );
    const data = await res.json();
    return data;
  }

  public unfollowUser(uid) {
    // const currentUserRef: AngularFirestoreDocument<any> = this.afStore.doc(
    //   `users/${uid}`
    // );
    // currentUserRef.update({ followings: arrayRemove(uid) });
    this.afStore
      .doc(`users/${uid}`)
      .update({ followers: arrayRemove(this.currentUser.uid) });

    this.afStore
      .doc(`users/${this.currentUser.uid}`)
      .update({ followings: arrayRemove(uid) });

    // userRef is the reference to user with uid passed in
    // const userRef: AngularFirestoreDocument<any> = this.afStore.doc(
    //   `users/${uid}`
    // );
    // userRef.update({ followers: arrayRemove(this.currentUser.uid) })
  }

  public followUser(uid) {
    this.afStore
      .doc(`users/${uid}`)
      .update({ followers: arrayUnion(this.currentUser.uid) });

    this.afStore
      .doc(`users/${this.currentUser.uid}`)
      .update({ followings: arrayUnion(uid) });
  }

  public async getPostsFromFollowingList(): Promise<Post[]> {
    this.posts = [];
    let following = [];
    this.getCurrentUser().then(async (userRes) => {
      const u = userRes.data();
      following = u.followings;
      const querySnapshot = await getDocs(collection(this.db, 'posts'));
      querySnapshot.forEach((res) => {
        const post: any = res.data();
        if (u.uid === post.uid || following.includes(post.uid)) {
          this.posts.unshift(post);
        }
      });
    });
    return this.posts;
  }
}
