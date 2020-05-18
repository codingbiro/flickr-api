import { Component, OnInit, Input, Output } from '@angular/core';
import { FlickrImage } from 'src/app/model/FlickrModels';

@Component({
  selector: 'app-image-item',
  templateUrl: './image-item.component.html',
  styleUrls: ['./image-item.component.css']
})
export class ImageItemComponent implements OnInit {
  // Image received as an Input
  @Input() img: FlickrImage;

  constructor() { }

  ngOnInit(): void { }

  // Constructing the source of the image
  getURI(): string {
    return `https://farm${this.img.farm}.staticflickr.com/${this.img.server}/${this.img.id}_${this.img.secret}.jpg`;
  }

  displayUser(theOwner): string {
    if (!theOwner) return '';
    let displayedName = theOwner.first_name ? theOwner.first_name : '';
    displayedName += theOwner.last_name ? theOwner.last_name : '';
    if (displayedName === '') return '';

    let displayedCountry = theOwner.country ? (' (' + theOwner.country + ')') : '';
    return 'by: ' + displayedName + displayedCountry;
  }
}
