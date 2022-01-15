import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { imgUrlValidator } from '../validate-img-url.directive';

@Component({
  selector: 'app-cocktail-form',
  templateUrl: './cocktail-form.component.html',
  styleUrls: ['./cocktail-form.component.css']
})
export class CocktailFormComponent implements OnInit {
  cocktailForm!: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    this.cocktailForm = new FormGroup({
      name: new FormControl('', Validators.required),
      imgUrl: new FormControl('', [Validators.required, imgUrlValidator]),
      type: new FormControl('', Validators.required),
      description: new FormControl(''),
      ingredients: new FormArray([
        new FormGroup({
          ingredientName: new FormControl('', Validators.required),
          ingredientAmount: new FormControl('', [Validators.required, Validators.min(0)]),
          ingredientMeasure: new FormControl('', Validators.required),
        })
      ]),
      instructions: new FormControl('', Validators.required),
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
    console.log(this.cocktailForm);
  }


}
