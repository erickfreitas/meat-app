import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from 'app/restaurants/restaurants.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements OnInit {

  reviews: Observable<any>

  constructor(private restaurantsServices: RestaurantsService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.reviews = this.restaurantsServices.reviewsOfRestaurant(this.route.parent.snapshot.params['id'])
      // .subscribe(reviews => this.reviews = reviews)
  }

}
