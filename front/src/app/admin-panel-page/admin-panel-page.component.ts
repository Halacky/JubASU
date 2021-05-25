import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialService } from '../shared/classes/material.service';
import { AuthService } from '../shared/services/auth.service';
import { Reviews } from '../shared/services/interfaces';
import { ReviewsService } from '../shared/services/reviews.service';

@Component({
  selector: 'app-admin-panel-page',
  templateUrl: './admin-panel-page.component.html',
  styleUrls: ['./admin-panel-page.component.css']
})
export class AdminPanelPageComponent implements OnInit {

  constructor(private reviewService: ReviewsService,private route: ActivatedRoute,private router: Router, private auth: AuthService) { }
  loading = true; 
  revArr: Reviews[] = [];
  reviewId = null as any;
  form!: FormGroup 
  review!: Reviews

  ngOnInit(): void {
    this.reviewService.fetch().subscribe(review => {
      this.revArr = review
      this.loading = false
    })
  }

  onSelectPosition(review: Reviews){
    this.reviewId = review._id
  }

  logout(event: Event) {
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/login'])
  }
  onDeletePosition(event: Event, review:Reviews ){

    // const decision = window.confirm(`Вы уверены, что хотите удалить категорию "${this.review}"`)

    // if (decision) {
    //   this.reviewService.delete(this.review)
    //     .subscribe(
    //       response => MaterialService.toast(response.message),
    //       error => MaterialService.toast(error.error.message),
    //       () => this.router.navigate(['/adminPanel'])
    //     )
    // }
    
    // event.stopPropagation()
    // const decision = window.confirm(`Удалить отзыв "${review.name}"?`)

    // if (decision) {
    //   this.reviewService.delete(review).subscribe(
    //     response => {
    //       const idx = this.revArr.findIndex(r => r._id === review._id)
    //       this.revArr.splice(idx, 1)
    //       MaterialService.toast(response.message)
    //     },
    //     error => MaterialService.toast(error.error.message)
    //   )
    // }
  }

}
