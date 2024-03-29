import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FlickrSearchResponse, FlickrTagResponse, FlickrProfileResponse, FlickrUsernameResponse } from '../model/FlickrModels';

// The HTTP request options for the API calls
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};
// The API key from Flickr
const API_KEY: string = 'f2f9b6954909b0f8dc9fc1608ed39272';
// Default number of images per page
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
  // Get a user's profile data method
  flickrMethodProfile: string = '?method=flickr.profile.getProfile';
  // Get a user's pictures method
  flickrMethodUserPics: string = '?method=flickr.people.getPublicPhotos';
  // Method to get username
  flickrMethodUsername: string = '?method=flickr.people.getInfo';
  // Method to get a user's favorites
  flickrMethodFavorites: string = '?method=flickr.favorites.getPublicList';
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

  // Get profile data for a user
  getProfileData(id: string): Observable<FlickrProfileResponse> {
    const flickrUserId: string = `&user_id=${id}`;
    return this.http.get<FlickrProfileResponse>(this.flickrUrl + this.flickrMethodProfile + this.flickrApiKey + this.jsonResponse + this.noJsonCb + flickrUserId);
  }

  // Get pictures from a user
  getUserFeed(id: string): Observable<FlickrSearchResponse> {
    const flickrUserId: string = `&user_id=${id}`;
    return this.http.get<FlickrSearchResponse>(this.flickrUrl + this.flickrMethodUserPics + this.flickrApiKey + this.jsonResponse + this.noJsonCb + flickrUserId + this.flickrPerPage);
  }

  // Get a given page on userfeed
  getUserFeedPage(userId: string, page: number, customPerPage: number): Observable<FlickrSearchResponse> {
    // The search's value
    const flickrUserId: string = `&user_id=${userId}`;
    // The page
    const flickrPage: string = `&page=${page}`;
    // Images per page
    const perPage: string = `&per_page=${customPerPage}`;
    return this.http.get<FlickrSearchResponse>(this.flickrUrl + this.flickrMethodSearch + this.flickrApiKey + flickrUserId + this.jsonResponse + this.noJsonCb + perPage + flickrPage);
  }

  // Get the username for a userId
  getUsername(id: string): Observable<FlickrUsernameResponse> {
    // The userId
    const flickrUserId: string = `&user_id=${id}`;
    return this.http.get<FlickrUsernameResponse>(this.flickrUrl + this.flickrMethodUsername + this.flickrApiKey + this.jsonResponse + this.noJsonCb + flickrUserId);
  }

  // Get the favorites for a userId
  getFavorites(id: string, pageno: number): Observable<FlickrSearchResponse> {
    // The page
    const flickrPage: string = `&page=${pageno}`;
    // The userId
    const flickrUserId: string = `&user_id=${id}`;
    return this.http.get<FlickrSearchResponse>(this.flickrUrl + this.flickrMethodFavorites + this.flickrApiKey + flickrUserId + this.jsonResponse + this.noJsonCb + this.flickrPerPage + flickrPage);
  }
}
