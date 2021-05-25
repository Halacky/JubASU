import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MaterialInstance, MaterialService } from '../shared/classes/material.service';
import { Reviews } from '../shared/services/interfaces';
import { ReviewsService } from '../shared/services/reviews.service';
import {} from "moment";
import * as moment from 'moment';

@Component({
  selector: 'app-reviews-page',
  templateUrl: './reviews-page.component.html',
  styleUrls: ['./reviews-page.component.css']
})


export class ReviewsPageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild("modal") modalRef!: ElementRef;
  @ViewChild("input") inputRef!: ElementRef;

  modal!: MaterialInstance;
  image: any = null;
  imagePrev: any = '';
  reviews$!: Observable<Reviews[]>; 

  form! : FormGroup
  loading = true; 
  revArr: Reviews[] = [];

  constructor(private reviewService: ReviewsService) { }

  ngOnDestroy(): void {
    this.modal.destroy();
  }

  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  triggerClick(){
    this.inputRef.nativeElement.click(); 
  }
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      group: new FormControl(null, Validators.required),
      placeOfWork: new FormControl(null),
      city: new FormControl(null),
      photo: new FormControl(""),
      feedback: new FormControl(null, [Validators.minLength(1500), Validators.minLength(3)]),
      mail: new FormControl(null, Validators.email)
    })
    //this.reviews$ = this.reviewService.fetch();

    this.reviewService.fetch().subscribe(review => {
      this.revArr = review
      this.loading = false
    })
  }
  createReview(){
   
    this.modal.open();
  }

  onFileUpload(event: any){
    const file = event.target.files[0];
    this.image = file;
    const reader = new FileReader();
    reader.onload=()=>{
      this.imagePrev = reader.result
    }

    reader.readAsDataURL(file);
  }

  onCancel(){
    this.modal.close();
    this.modal.destroy();
  }

  onSubmit(){
    this.form.disable();

    this.reviewService.create(this.form.value.name,this.form.value.group,this.form.value.city,
                              this.form.value.placeOfWork,this.form.value.feedback,moment.now.toString(),this.image).subscribe((review)=>{
      MaterialService.toast("Отзыв отправлен");
      this.revArr.push(review);
      this.form.enable();
      

    },error=>{
      this.form.enable();
    },()=>{
      this.image = null;
      this.form.reset();
      this.modal.close();
    });

  }

}
