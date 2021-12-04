import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { collection, getDocs, getFirestore } from 'firebase/firestore';

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
  private app: any = firebase.initializeApp({
    apiKey: 'AIzaSyBoF4LVp-KDss5LUVLFCXVARsiCZFRx-8Q',
    authDomain: 'events-b1eb4.firebaseapp.com',
    projectId: 'events-b1eb4',
    storageBucket: 'events-b1eb4.appspot.com',
    messagingSenderId: '79393024029',
    appId: '1:79393024029:web:6b82256c0c500d86303ef4',
    measurementId: 'G-4K8TB0WSQ8',
  });
  private db = getFirestore();

  private events: any = [];

  constructor() {}

  public async getEvents(): Promise<Event[]> {
    this.events = [];
    const querySnapshot = await getDocs(collection(this.db, 'Events'));
    querySnapshot.forEach((doc) => {
      const data: any = doc.data();
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
}
