import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlickrService } from 'src/app/services/flickr.service';
import { FlickrImage, FlickrProfile } from 'src/app/model/FlickrModels';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId: string;
  images: FlickrImage[];
  theOwner: FlickrProfile;
  pageno: number;
  perPage: number;
  isNext: boolean;

  constructor(private route: ActivatedRoute, private flickrService: FlickrService) { }

  // onInit
  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      // Def values
      this.pageno = 1;
      this.perPage = 66;
      // Get URL param
      this.userId = String(params['id']);
      if (this.userId) {
        // Get user's data and images
        this.getUser(this.userId);
        this.getImgs();
      }
    });
  }

  // Get the images and their tags
  async getImgs() {
    this.isNext = await this.calcIsNext();
    this.flickrService.getUserFeedPage(this.userId, this.pageno, this.perPage).subscribe(data => {
      this.images = data.photos.photo;
      this.getTags();
    });
  }

  // Getting the tags for each image
  getTags() {
    for (let img of this.images) {
      // Get tags for a given Image
      this.flickrService.getTags(img.id).subscribe(data => {
        img.tags = data.photo.tags.tag;
      });
    }
  }

  // Get user's data for a given id
  async getUser(id: string) {
    this.flickrService.getProfileData(id).subscribe(data => {
      this.theOwner = data.profile;
      this.flickrService.getUsername(id).subscribe(uname => {
        this.theOwner.username = uname.person.username._content;
      });
    });
  }

  // Display user's name
  displayName(theOwner): string {
    if (!theOwner) return 'Loading...';
    let displayedName = theOwner.first_name ? theOwner.first_name : '';
    displayedName += theOwner.last_name ? theOwner.last_name : '';
    if (displayedName === '') return '';
    return displayedName;
  }

  // Go to next page
  async Nextpage() {
    this.pageno++;
    this.getImgs();
  }

  // Go to previous page
  async Prevpage() {
    this.pageno--;
    this.getImgs();
    this.isNext = true;
  }

  // Returns if the current page is last or not by checking the next page's size
  async calcIsNext(): Promise<boolean> {
    const cb = await this.flickrService.getUserFeedPage(this.userId, this.pageno + 1, this.perPage).toPromise();
    let nextImagesLength = cb.photos.photo.length;
    return nextImagesLength !== 0;
  }

  // If per page has changed, set the new number
  onPPChange(value: number) {
    this.setPerPage(value);
    // And go to page 1
    this.pageno = 1;
  }

  // Get the images with the new perPage number
  setPerPage(newPerPage: number) {
    this.perPage = newPerPage;
    this.getImgs();
  }
}
