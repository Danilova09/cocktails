import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CocktailsComponent } from './cocktails/cocktails.component';
import { CocktailFormComponent } from './cocktail-form/cocktail-form.component';

const routes: Routes = [
  {path: '', component: CocktailsComponent},
  {path: 'new-cocktail', component: CocktailFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
