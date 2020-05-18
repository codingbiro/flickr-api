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

  constructor(private route: ActivatedRoute, private flickrService: FlickrService) { }

  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      this.userId = String(params['id']);
      if (this.userId) {
        this.favorites = await this.getFavorites(this.userId);
        this.username = await this.getUsername(this.userId);
        // Getting the tags for each image
        for (let img of this.favorites) {
          img.tags = await this.getTags(img.id);
        }
      }
    });
  }

  // Get tags for a given Image
  async getTags(id: number): Promise<FlickrTag[]> {
    let theTags = await this.flickrService.getTags(id).toPromise();
    return theTags.photo.tags.tag;
  }

  // Get the username
  async getUsername(id: string): Promise<string> {
    let theResponse = await this.flickrService.getUsername(id).toPromise();
    return theResponse.person.username._content;
  }

  // Get favorites
  async getFavorites(id: string): Promise<FlickrImage[]> {
    let theResponse = await this.flickrService.getFavorites(id).toPromise();
    return theResponse.photos.photo;
  }
}
