import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

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
      imgUrl: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      ingredients: new FormArray([
        new FormGroup({
          ingredientName: new FormControl('', Validators.required),
          ingredientAmount: new FormControl('', Validators.required),
          ingredientMeasure: new FormControl('', Validators.required),
        })
      ]),
      instructions: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    console.log(this.cocktailForm);
  }

  getIngredients() {
    const ingredients = <FormArray>this.cocktailForm.get('ingredients');
    return ingredients.controls;
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
}
