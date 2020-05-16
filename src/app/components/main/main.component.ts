import { Component, OnInit } from '@angular/core';
import { FlickImage } from 'src/app/model/FlickImage';
import { FlickrService } from 'src/app/services/flickr.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  images: FlickImage[];

  constructor(private flickrService: FlickrService) { }

  ngOnInit(): void {
    this.flickrService.getImages().subscribe(imgs => this.images = imgs.photos.photo);
  }

}
