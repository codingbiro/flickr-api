import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FlickrResponse } from '../model/FlickImage';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

const API_KEY = 'f2f9b6954909b0f8dc9fc1608ed39272';

@Injectable({
  providedIn: 'root'
})
export class FlickrService {
  flickrUrl: string = 'https://api.flickr.com/services/rest/';
  flickrMethod: string = '?method=flickr.photos.search';
  flickrApiKey: string = `&api_key=${API_KEY}`;
  flickrSearch: string = '&text=banana';
  jsonResponse: string = '&format=json';
  noJsonCb: string =  '&nojsoncallback=1';

  constructor(private http: HttpClient) { }

  // Get Images
 getImages(): Observable<FlickrResponse> {
    return this.http.get<FlickrResponse>(this.flickrUrl+this.flickrMethod+this.flickrApiKey+this.flickrSearch+this.jsonResponse+this.noJsonCb);
  }
}
