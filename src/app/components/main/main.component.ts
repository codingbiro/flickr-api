import { Component, OnInit } from '@angular/core';
import { FlickImage, FlickrTag } from 'src/app/model/FlickrModels';
import { FlickrService } from 'src/app/services/flickr.service';


const DEFAULT_SEARCH_VALUE = 'banana';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  // The images from Flickr
  images: FlickImage[];
  // The searchString for searching on Flickr
  searchString: string;

  constructor(private flickrService: FlickrService) { }

  ngOnInit(): void {
    // Getting data from localStorage or setting the default value
    this.searchString = localStorage.getItem('searchString') ? localStorage.getItem('searchString') : DEFAULT_SEARCH_VALUE;
    // Getting the images for the given searchString
    this.flickrService.getImages(this.searchString).subscribe(async (imgs) => {
      this.images = imgs.photos.photo;
      // Getting the tags for each image
      for (let img of this.images) {
        img.tags = await this.getTags(img.id);
      }
    });
  }

  // Searching for images
  searchFlickr(): void {
    // Updating localStorage with the new searchString
    localStorage.setItem('searchString', this.searchString);
    // Refetch images
    this.flickrService.getImages(this.searchString).subscribe(imgs => this.images = imgs.photos.photo);
  }

  // Get tags for a given Image
  async getTags(id: number): Promise<FlickrTag[]> {
    let theTags = await this.flickrService.getTags(id).toPromise();
    return theTags.photo.tags.tag;
  }
}
