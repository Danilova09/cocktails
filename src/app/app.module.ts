import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CocktailFormComponent } from './cocktail-form/cocktail-form.component';
import { CocktailsComponent } from './cocktails/cocktails.component';
import { CocktailItemComponent } from './cocktails/cocktail-item/cocktail-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CocktailFormComponent,
    CocktailsComponent,
    CocktailItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
