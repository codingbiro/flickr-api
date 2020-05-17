import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FlickrSearchResponse, FlickrTagResponse } from '../model/FlickrModels';

// The HTTP request options for the API calls
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
// The API key from Flickr
const API_KEY: string = 'f2f9b6954909b0f8dc9fc1608ed39272';
const IMAGES_PER_PAGE: number = 66;

@Injectable({
  providedIn: 'root'
})
export class FlickrService {
  // Base URL for FlickR API
  flickrUrl: string = 'https://api.flickr.com/services/rest/';
  // Search method
  flickrMethodSearch: string = '?method=flickr.photos.search';
  // Get Tags for a Photo method
  flickrMethodTags: string = '?method=flickr.tags.getListPhoto';
  // The API KEY
  flickrApiKey: string = `&api_key=${API_KEY}`;
  // Response in JSON format
  jsonResponse: string = '&format=json';
  // Response without JSON callback
  noJsonCb: string = '&nojsoncallback=1';
  // Images per page
  flickrPerPage: string = `&per_page=${IMAGES_PER_PAGE}`;

  constructor(private http: HttpClient) { }

  // Get Images
  getImages(searchString: string): Observable<FlickrSearchResponse> {
    // The search's value
    const flickrSearch: string = `&text=${searchString}`;
    return this.http.get<FlickrSearchResponse>(this.flickrUrl + this.flickrMethodSearch + this.flickrApiKey + flickrSearch + this.jsonResponse + this.noJsonCb + this.flickrPerPage);
  }

  // Get Tags for an Image
  getTags(id: number): Observable<FlickrTagResponse> {
    const flickrPhotoId: string = `&photo_id=${id}`;
    return this.http.get<FlickrTagResponse>(this.flickrUrl + this.flickrMethodTags + this.flickrApiKey + this.jsonResponse + this.noJsonCb + flickrPhotoId);
  }

  getPage(searchString: string, id: number) {
    // The search's value
    const flickrSearch: string = `&text=${searchString}`;
    // The page
    const flickrPage: string = `&page=${id}`;
    return this.http.get<FlickrSearchResponse>(this.flickrUrl + this.flickrMethodSearch + this.flickrApiKey + flickrSearch + this.jsonResponse + this.noJsonCb + this.flickrPerPage + flickrPage);
  }
}
