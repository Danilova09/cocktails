import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CocktailFormComponent } from './cocktail-form/cocktail-form.component';
import { CocktailsComponent } from './cocktails/cocktails.component';
import { CocktailItemComponent } from './cocktails/cocktail-item/cocktail-item.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidateImgUrlDirective } from './validate-img-url.directive';
import { ModalComponent } from './ui/modal/modal.component';
import { ValidateStringDirective } from './validate-string.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CocktailFormComponent,
    CocktailsComponent,
    CocktailItemComponent,
    ValidateImgUrlDirective,
    ValidateStringDirective,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
