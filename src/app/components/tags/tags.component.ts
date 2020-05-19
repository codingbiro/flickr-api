import { Component, OnInit } from '@angular/core';
import { FlickrImage } from 'src/app/model/FlickrModels';
import { ActivatedRoute } from '@angular/router';
import { FlickrService } from 'src/app/services/flickr.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  images: FlickrImage[];
  name: string;

  constructor(private route: ActivatedRoute, private flickrService: FlickrService) { }

  // onInit
  ngOnInit(): void {
    // Get the tag's name from URL param
    this.route.params.subscribe(async (params) => {
      this.name = String(params['tag']);
      if (this.name) {
        // Get images
        this.getImgs();
      }
    });
  }

  getImgs(): void {
    this.flickrService.getImages(this.name).subscribe((imgs) => {
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
}