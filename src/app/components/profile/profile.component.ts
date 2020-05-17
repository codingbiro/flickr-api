import { Component, OnInit, ɵangular_packages_core_core_bb } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlickrService } from 'src/app/services/flickr.service';
import { FlickrImage, FlickrTag, FlickrProfile } from 'src/app/model/FlickrModels';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId: string;
  images: FlickrImage[];
  theOwner: FlickrProfile;

  constructor(private route: ActivatedRoute, private flickrService: FlickrService) { }

  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      this.userId = String(params['id']);
      if (this.userId) {
        this.theOwner = await this.getUser(this.userId);
        const cb = await this.flickrService.getUserFeed(this.userId).toPromise();
        this.images = cb.photos.photo;
        // Getting the tags & owner data (once) for each image
        for (let img of this.images) {
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

  // Get user's data for a given id
  async getUser(id: string): Promise<FlickrProfile> {
    let theUser = await this.flickrService.getProfileData(id).toPromise();
    return theUser.profile;
  }

  displayName(theOwner): string {
    if (!theOwner) return 'Loading...';
    let displayedName = theOwner.first_name ?  theOwner.first_name : '';
    displayedName += theOwner.last_name ? theOwner.last_name : '';
    if (displayedName === '') return '';
    return displayedName;
  }
}