export class Cocktail {
  constructor(
    public id: string,
    public name: string,
    public imgUrl: string,
    public type: string,
    public description: string,
    public ingredients: [{
      ingredientName: string,
      ingredientAmount: number,
      ingredientMeasure: string,
    }],
    public instructions: string,
  ) {}
}
