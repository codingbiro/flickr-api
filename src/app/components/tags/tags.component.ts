import { Component, OnInit } from '@angular/core';
import { FlickrImage, FlickrTag, FlickrProfile } from 'src/app/model/FlickrModels';
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

  ngOnInit(): void {
    // Get the tag's name from URL param
    this.route.params.subscribe(async (params) => {
      this.name = String(params['tag']);
      if (this.name) {
        this.getImgs();
      }
    });
  }

  // Getting the images for the given searchString
  getImgs(): void {
    this.flickrService.getImages(this.name).subscribe(async (imgs) => {
      this.images = imgs.photos.photo;
      // Getting the tags & owner data for each image
      for (let img of this.images) {
        img.tags = await this.getTags(img.id);
        img.theOwner = await this.getUser(img.owner);
      }
    });
  }

  // Get tags for a given Image
  async getTags(id: number): Promise<FlickrTag[]> {
    let theTags = await this.flickrService.getTags(id).toPromise();
    return theTags.photo.tags.tag;
  }

  // Get user's data for a given id
  async getUser(id: string): Promise<FlickrProfile> {
    let theUser = await this.flickrService.getProfileData(id).toPromise();
    return theUser.profile;
  }
}