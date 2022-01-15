import { HttpClient } from '@angular/common/http';
import { Cocktail } from './cocktail.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CocktailService {
  cocktails: Cocktail[] = [];
  addingCocktail = new Subject<boolean>();

  constructor(
    private http: HttpClient,
  ) {}

  addCocktail(cocktail: Cocktail) {
    this.addingCocktail.next(true);
    const body = {
      name: cocktail.name,
      imgUrl: cocktail.imgUrl,
      type: cocktail.type,
      description: cocktail.description,
      ingredients: cocktail.ingredients,
      instructions: cocktail.instructions,
    };
    this.http.post<Cocktail>('https://cocktails-59fbc-default-rtdb.firebaseio.com/cocktails.json', body)
      .pipe(tap(() => {
        this.addingCocktail.next(false);
      }, () => {
        this.addingCocktail.next(false);
      }))
      .subscribe();
  }
}
