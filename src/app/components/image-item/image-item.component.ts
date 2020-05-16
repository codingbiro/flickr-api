import { Component, OnInit, Input } from '@angular/core';
import { FlickImage } from 'src/app/model/FlickImage';

@Component({
  selector: 'app-image-item',
  templateUrl: './image-item.component.html',
  styleUrls: ['./image-item.component.css']
})
export class ImageItemComponent implements OnInit {
  @Input() img: FlickImage;
  
  constructor() { }

  ngOnInit(): void {
  }

  getURI(): string {
    return `https://farm${this.img.farm}.staticflickr.com/${this.img.server}/${this.img.id}_${this.img.secret}.jpg`;
  }

}
