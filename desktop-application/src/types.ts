class Recipe {
  id: number;
  name: string;
  ingredients: IngredientInRecipe[];
  tags: Tag[];
  image: string;
  preparation: string;

  constructor(id: number, name: string, ingredients: IngredientInRecipe[], tags: Tag[], image: string, preparation: string) {
    this.id = id;
    this.name = name;
    this.ingredients = ingredients;
    this.tags = tags;
    this.image = image;
    this.preparation = preparation;
  }
}

class IngredientInRecipe {
  ingredient: Ingredient;
  amount: number;
  unit: string;

  constructor(ingredient: Ingredient, amount: number, unit: string) {
    this.ingredient = ingredient;
    this.amount = amount;
    this.unit = unit;
  }
}

class Ingredient {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

class Tag {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

class ShoppingIngredient {
  id: number;
  name: string;
  amount: number;
  unit: string;

  constructor(id: number, name: string, amount: number, unit: string) {
    this.id = id;
    this.name = name;
    this.amount = amount;
    this.unit = unit;
  }

  addAmount(amount: number) {
    this.amount += amount;
  }
}

export {
	Recipe,
  IngredientInRecipe,
	Ingredient,
	Tag,
  ShoppingIngredient
};
