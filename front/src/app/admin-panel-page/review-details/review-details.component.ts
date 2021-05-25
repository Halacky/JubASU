import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { Reviews } from 'src/app/shared/services/interfaces';
import { ReviewsService } from 'src/app/shared/services/reviews.service';

@Component({
  selector: 'app-review-details',
  templateUrl: './review-details.component.html',
  styleUrls: ['./review-details.component.css']
})
export class ReviewDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute,private reviewsService: ReviewsService, private router: Router) { }
  review!: Reviews
  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            if (params['id']) {
              console.log(params['id']);
              return this.reviewsService.getById(params['id'])
            }

            return of(null)
          }
        )
      )
      .subscribe(
        (review: any) => {
          if (review) {
            this.review = review
          }
        }
      )
  }
  deleteReview(){
    const decision = window.confirm(`Удалить отзыв "${this.review.name}"?`)

    if (decision) {
      if(this.review._id){
        this.reviewsService.delete(this.review._id).subscribe(
          (response)=>{ MaterialService.toast(response.message)},
          (error)=> {MaterialService.toast(error.error.message)},
          ()=>{this.router.navigate(["/adminPanel"])})
      }
    }
  }
}
