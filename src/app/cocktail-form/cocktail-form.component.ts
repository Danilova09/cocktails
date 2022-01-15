import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { imgUrlValidator } from '../validate-img-url.directive';
import { CocktailService } from '../shared/cocktail.service';
import { Cocktail } from '../shared/cocktail.model';
import { Subscription } from 'rxjs';
import { stringValidator } from '../validate-string.directive';

@Component({
  selector: 'app-cocktail-form',
  templateUrl: './cocktail-form.component.html',
  styleUrls: ['./cocktail-form.component.css']
})
export class CocktailFormComponent implements OnInit, OnDestroy {
  cocktailForm!: FormGroup;
  addingCocktail = false;
  addingCocktailSubscription!: Subscription;

  constructor(
    private cocktailService: CocktailService,
  ) {}

  ngOnInit(): void {
    this.cocktailForm = new FormGroup({
      name: new FormControl('', [Validators.required, stringValidator]),
      imgUrl: new FormControl('', [Validators.required, imgUrlValidator]),
      type: new FormControl('', Validators.required),
      description: new FormControl(''),
      ingredients: new FormArray([
        new FormGroup({
          ingredientName: new FormControl('', [Validators.required, stringValidator]),
          ingredientAmount: new FormControl('', [Validators.required, Validators.min(1)]),
          ingredientMeasure: new FormControl('', Validators.required),
        })
      ]),
      instructions: new FormControl('', Validators.required),
    });

    this.addingCocktailSubscription = this.cocktailService.addingCocktail.subscribe((adding: boolean) => {
      this.addingCocktail = adding;
    });
  }

  getIngredients() {
    const ingredients = <FormArray>this.cocktailForm.get('ingredients');
    return ingredients.controls;
  }

  fieldHasError(fieldName: string, errorType: string) {
    const field = this.cocktailForm.get(fieldName);
    return field && field.touched && field.errors?.[errorType];
  }

  ingredientsFieldHasError(fieldName: string, errorType: string, index: number) {
    const ingredients = <FormArray>this.cocktailForm.get('ingredients');
    const fieldGroup = ingredients.at(index);
    const field = fieldGroup.get(fieldName);
    return field && field.touched && field.errors?.[errorType];
  }

  addIngredient() {
    const newIngredient = new FormGroup({
      ingredientName: new FormControl('', Validators.required),
      ingredientAmount: new FormControl('', Validators.required),
      ingredientMeasure: new FormControl('', Validators.required),
    });
    const ingredients = <FormArray>this.cocktailForm.get('ingredients');
    ingredients.push(newIngredient);
  }

  deleteIngredient(i: number) {
    const ingredientsArray = <FormArray>this.cocktailForm.get('ingredients');
    ingredientsArray.removeAt(i);
  }

  onSubmit() {
    const newCocktail = new Cocktail(
      'id',
      this.cocktailForm.controls.name.value,
      this.cocktailForm.controls.imgUrl.value,
      this.cocktailForm.controls.type.value,
      this.cocktailForm.controls.description.value,
      this.cocktailForm.controls.ingredients.value,
      this.cocktailForm.controls.instructions.value,
    );
    this.cocktailService.addCocktail(newCocktail);
  }

  ngOnDestroy() {
    this.addingCocktailSubscription.unsubscribe();
  }
}
