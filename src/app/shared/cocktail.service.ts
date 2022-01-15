import { HttpClient } from '@angular/common/http';
import { Cocktail } from './cocktail.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CocktailService {
  cocktails: Cocktail[] = [];
  addingCocktail = new Subject<boolean>();
  cocktailsChange = new Subject<Cocktail[]>();
  fetchingCocktails = new Subject<boolean>();

  constructor(
    private http: HttpClient,
  ) {
  }

  fetchCocktailsData() {
    this.fetchingCocktails.next(true);
    this.http.get<{ [id: string]: Cocktail }>('https://cocktails-59fbc-default-rtdb.firebaseio.com/cocktails.json')
      .pipe(map((result) => {
        this.fetchingCocktails.next(false);
        return Object.keys(result).map(id => {
          const cocktailData = result[id];
          return new Cocktail(
            id,
            cocktailData.name,
            cocktailData.imgUrl,
            cocktailData.type,
            cocktailData.description,
            cocktailData.ingredients,
            cocktailData.instructions,
          );
        });
      })).subscribe((cocktails: Cocktail[]) => {
        this.cocktails = cocktails;
        this.cocktailsChange.next(cocktails);
    }, () => {
      this.fetchingCocktails.next(false);
    });
  }

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
      .subscribe(() => {
        this.fetchCocktailsData();
      });
  }

}
