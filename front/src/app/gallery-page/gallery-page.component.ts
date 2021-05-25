import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MaterialInstance, MaterialService } from '../shared/classes/material.service';

@Component({
  selector: 'app-gallery-page',
  templateUrl: './gallery-page.component.html',
  styleUrls: ['./gallery-page.component.css']
})
export class GalleryPageComponent implements OnInit, OnDestroy, AfterViewInit{

  constructor() { }
  ngOnDestroy(): void {
  }
  ngAfterViewInit(): void {
  }
  ngOnInit(): void {
  }

}
