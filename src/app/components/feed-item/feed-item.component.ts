import { Component, OnInit, Input } from '@angular/core';
import { FlickrImage } from 'src/app/model/FlickrModels';

const MAX_COUNT_OF_TAGS = 5;

@Component({
  selector: 'app-feed-item',
  templateUrl: './feed-item.component.html',
  styleUrls: ['./feed-item.component.css']
})
export class FeedItemComponent implements OnInit {
  // Image received as an Input
  @Input() img: FlickrImage;

  constructor() { }

  ngOnInit(): void {
  }

  // Constructing the source of the image
  getURI(): string {
    return `https://farm${this.img.farm}.staticflickr.com/${this.img.server}/${this.img.id}_${this.img.secret}.jpg`;
  }

  // Getting the tags
  getTags(): string {
    let theTags: string = '';
    if (this.img.tags && this.img.tags.length > 0) {
      let counter = 0;
      for (let aTag of this.img.tags) {
        if (counter === MAX_COUNT_OF_TAGS) return theTags;
        theTags += `<a href="https://flickr.com/photos/tags/${aTag.raw}" target="blank"><span class="badge badge-secondary mx-1">#${aTag.raw}</span></a>`;
        counter++;
      }
    }
    return theTags;
  }
}
