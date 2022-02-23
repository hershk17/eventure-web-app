import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Observable } from 'rxjs';

export interface POI {
  address: any;
  dist: number;
  id: string;
  poi: any;
  position: any;
  score: number;
  type: string;
  category: string;
  distance: number;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public pois: Observable<POI[]>;

  private baseURL = 'https://api.tomtom.com';
  private searchParam = '/search';
  private poiSearch = '/poiSearch/';
  private versionNumber = '/2';
  private responseFormat = '.json';
  private apiKey = 'YlHRCAWHnD2YVU8wWQqwfJA5VRKpHOPm';

  private location: any = {};

  constructor(
    private httpClient: HttpClient,
    private geolocation: Geolocation
  ) {
    this.geolocation
      .getCurrentPosition()
      .then((res) => (this.location = res))
      .catch((error) => console.log('Error getting location', error));
  }

  public getPOI(query: string): any {
    try {
      this.pois = this.httpClient.get<POI[]>(
        this.baseURL +
          this.searchParam +
          this.versionNumber +
          this.poiSearch +
          query +
          this.responseFormat +
          '?lat=' +
          this.location.coords.latitude +
          '&lon=' +
          this.location.coords.longitude +
          '&key=' +
          this.apiKey
      );
      return this.pois;
    } catch (err) {
      console.log('ERROR: ' + err);
    }
  }
  public getPOIdetails(id: string): any {
    try{
      //https://{baseURL}/search/{versionNumber}/poiDetails.{ext}?key={Your_API_Key}&id={id}&sourceName={sourceName}
      let url = this.baseURL + 
      this.searchParam +
      this.versionNumber +
      "/poiDetails" + 
      this.responseFormat +
      "?key=" +
      this.apiKey +
      "&id=" + id;
      console.log(url);
      let res = this.httpClient.get(
        this.baseURL + 
        this.searchParam +
        this.versionNumber +
        "/poiDetails" + 
        this.responseFormat +
        "?key=" +
        this.apiKey +
        "&id=" + id
       );
      return res;     
      
    }catch (err) {
      console.log('ERROR: ' + err);
    }
  }
}
