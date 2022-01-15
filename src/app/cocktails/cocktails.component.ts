import { Component, OnDestroy, OnInit } from '@angular/core';
import { CocktailService } from '../shared/cocktail.service';
import { Cocktail } from '../shared/cocktail.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cocktails',
  templateUrl: './cocktails.component.html',
  styleUrls: ['./cocktails.component.css']
})
export class CocktailsComponent implements OnInit, OnDestroy {
  cocktails: Cocktail[] = [];
  fetchingCocktails = false;
  cocktailsSubscription!: Subscription;
  fetchingCocktailsSubscription!: Subscription;
  constructor(
    private cocktailService: CocktailService,
  ) { }

  ngOnInit(): void {
    this.cocktailsSubscription = this.cocktailService.cocktailsChange.subscribe((cocktails: Cocktail[]) => {
      this.cocktails = cocktails;
    });
    this.fetchingCocktailsSubscription = this.cocktailService.fetchingCocktails.subscribe((fetching: boolean) => {
      this.fetchingCocktails = fetching;
    })
    this.cocktailService.fetchCocktailsData();
  }

  ngOnDestroy() {
    this.cocktailsSubscription.unsubscribe();
    this.fetchingCocktailsSubscription.unsubscribe();
  }
}
