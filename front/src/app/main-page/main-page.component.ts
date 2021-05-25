import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { MaterialInstance, MaterialService } from '../shared/classes/material.service';
import { Reviews } from '../shared/services/interfaces';
import { ReviewsService } from '../shared/services/reviews.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit, AfterViewInit, OnDestroy{
  @ViewChild("tapTarget") tapTargetRef!:ElementRef
  @ViewChild("modal") modalRef!: ElementRef;
  @ViewChild("input") inputRef!: ElementRef;
  tapTarget!: MaterialInstance


  modal!: MaterialInstance;
  image: any = null;
  imagePrev: any = '';
  reviews$!: Observable<Reviews[]>; 
  form! : FormGroup


  constructor(private reviewService: ReviewsService, private router: Router) { }
  ngAfterViewInit(): void {
    this.tapTarget = MaterialService.initTapTarget(this.tapTargetRef);
    this.modal = MaterialService.initModal(this.modalRef);
  }

  ngOnDestroy(): void {
    this.tapTarget.close();
    this.modal.destroy();
  }

  onInfo(){
    this.tapTarget.open();
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
      feedback: new FormControl(null, Validators.required),
      
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
      this.form.enable();
      

    },error=>{
      this.form.enable();
    },()=>{
      this.image = null;
      this.form.reset();
      this.modal.close();
      this.router.navigate(["/reviews"])
    });

  }

}
