import { Component, OnInit } from '@angular/core';
import { FlickrImage, FlickrTag } from 'src/app/model/FlickrModels';
import { ActivatedRoute } from '@angular/router';
import { FlickrService } from 'src/app/services/flickr.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favorites: FlickrImage[];
  userId: string;
  username: string;
  pageno: number;
  isNext: boolean;

  constructor(private route: ActivatedRoute, private flickrService: FlickrService) { }

  // onInit
  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      this.pageno = 1;
      // Get URL param
      this.userId = String(params['id']);
      if (this.userId) {
        this.username = await this.getUsername(this.userId);
        // Get user's data and fav images
        this.getFavorites(this.userId);
      }
    });
  }

  // Get favorites
  async getFavorites(id: string) {
    this.isNext = await this.calcIsNext();
    this.flickrService.getFavorites(id, this.pageno).subscribe(data => {
      this.favorites = data.photos.photo;
      // Get tags
      this.getTags();
    });
  }

  // Getting the tags for each image
  getTags() {
    for (let img of this.favorites) {
      // Get tags for a given Image
      this.flickrService.getTags(img.id).subscribe(data => {
        img.tags = data.photo.tags.tag;
      });
    }
  }

  // Get the username
  async getUsername(id: string): Promise<string> {
    let theResponse = await this.flickrService.getUsername(id).toPromise();
    return theResponse.person.username._content;
  }

  // Go to next page
  async Nextpage() {
    this.pageno++;
    this.getFavorites(this.userId);
  }

  // Go to previous page
  async Prevpage() {
    this.pageno--;
    this.getFavorites(this.userId);
    this.isNext = true;
  }

  // Returns if the current page is last or not by checking the next page's size
  async calcIsNext(): Promise<boolean> {
    const cb = await this.flickrService.getFavorites(this.userId, this.pageno + 1).toPromise();
    let nextImagesLength = cb.photos.photo.length;
    return nextImagesLength !== 0;
  }
}
