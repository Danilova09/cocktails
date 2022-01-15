import { Component, Input } from '@angular/core';
import { Cocktail } from '../../shared/cocktail.model';

@Component({
  selector: 'app-cocktail-item',
  templateUrl: './cocktail-item.component.html',
  styleUrls: ['./cocktail-item.component.css']
})
export class CocktailItemComponent {
  @Input() cocktail!: Cocktail;
  modalOpen = false;

  openCocktailsDetails() {
    this.modalOpen = true;
  }

  closeCocktailsDetails() {
    this.modalOpen = false;
  }
}
