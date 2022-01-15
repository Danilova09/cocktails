import { Component, Input, OnInit } from '@angular/core';
import { Cocktail } from '../../shared/cocktail.model';

@Component({
  selector: 'app-cocktail-item',
  templateUrl: './cocktail-item.component.html',
  styleUrls: ['./cocktail-item.component.css']
})
export class CocktailItemComponent implements OnInit {
  @Input() cocktail!: Cocktail;
  constructor() { }

  ngOnInit(): void {
  }

}
