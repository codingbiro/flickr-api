import { Component, OnInit } from '@angular/core';
import { FlickrImage } from 'src/app/model/FlickrModels';
import { FlickrService } from 'src/app/services/flickr.service';


const DEFAULT_SEARCH_VALUE = 'banana';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  // The images from Flickr
  images: FlickrImage[];
  // The searchString for searching on Flickr
  searchString: string;

  constructor(private flickrService: FlickrService) { }

  // onInit
  ngOnInit(): void {
    // Getting data from localStorage or setting the default value
    this.searchString = localStorage.getItem('searchString') ? localStorage.getItem('searchString') : DEFAULT_SEARCH_VALUE;
    // Getting images
    this.getImgs();
  }

  // Getting the images for the given searchString
  getImgs(): void {
    this.flickrService.getImages(this.searchString).subscribe((imgs) => {
      this.images = imgs.photos.photo;
      // Getting the tags & owner data for each image
      for (let img of this.images) {
        // Get tags for a given Image
        this.flickrService.getTags(img.id).subscribe(tags => {
          img.tags = tags.photo.tags.tag;
        });
        // Get user's data for a given id
        this.flickrService.getProfileData(img.owner).subscribe(data => {
          img.theOwner = data.profile;
        });
      }
    });
  }

  // Searching for images
  searchFlickr(): void {
    // Updating localStorage with the new searchString
    localStorage.setItem('searchString', this.searchString);
    // Refetch images
    this.getImgs();
  }
}
