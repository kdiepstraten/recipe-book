import { Injectable} from "@angular/core";
import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";



@Injectable()
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe('Pizza',
      'Here is a recipe of a delicious pizza',
      'https://www.foodandwine.com/thmb/Wd4lBRZz3X_8qBr69UOu2m7I2iw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg',
      [
        new Ingredient('Cheese', 1),
        new Ingredient('Tomato Sauce', 1),
        new Ingredient('Oregano', 1)
      ]),

    new Recipe('Creme Brulee',
      'This is a Creme Brulee recipe',
      'https://www.laurasbakery.nl/wp-content/smush-webp/2020/08/cr%C3%A8me-br%C3%BBl%C3%A9e-1a.jpg.webp',
      [
        new Ingredient('Milk', 2),
        new Ingredient('Sugar', 1),
        new Ingredient('Eggs', 2)
      ])
  ];

  constructor(private slService: ShoppingListService) {
  }

  getRecipes() {
    return this.recipes.slice();
  }


  getRecipe(index: number){
    return this.recipes[index];
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients)
  }
}
