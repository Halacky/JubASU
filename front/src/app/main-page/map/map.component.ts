import { MapsAPILoader } from '@agm/core';
import { HttpRequest } from '@angular/common/http';
import { AfterViewInit, Component, NgZone, OnInit } from '@angular/core';
import { AngularYandexMapsModule, YA_CONFIG } from 'angular8-yandex-maps';
import { Reviews } from 'src/app/shared/services/interfaces';
import { ReviewsService } from 'src/app/shared/services/reviews.service';
import { GeocodingApiService } from './GeocodingApiService';
declare let google: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit{

  lat: number =70.423568 ;
  lng: number = 81.021187 ;
  googleMapType = 'satellite';
  revArr: Reviews[] = [];
  mapTypeId!: string;
  geoCoder: any;
  zoom!: number;

  public constructor(private reviewService: ReviewsService) {

  }

  ngAfterViewInit(): void {
   
  }
  mylocations = [
    { lat: 70.423568, lng: 800.462287 }
  ];

  ngOnInit(): void {
    this.reviewService.fetch().subscribe(review => {
      this.revArr = review
      for (let i = 0; i < this.revArr.length; i++) {
        const coord = this.revArr[i].coor;
        console.log(coord)
        if(coord){
          const splitted = coord.split(",", 2); 
          this.mylocations[i] = {
            lat: +splitted[0],
            lng: +splitted[1]
          }
          console.log(splitted[0]+" "+ splitted[1]);
        }else{
          console.log("?")
        }
        
      }

    })
    
    
  }

}
