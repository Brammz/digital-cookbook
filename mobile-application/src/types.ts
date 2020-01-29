class Recipe {
  id: number;
  name: string;
  ingredients: Ingredient[];
  tags: Tag[];
  image: string;
  preparation: string;

  constructor(id: number, name: string, ingredients: Ingredient[], tags: Tag[], image: string, preparation: string) {
    this.id = id;
    this.name = name;
    this.ingredients = ingredients;
    this.tags = tags;
    this.image = image;
    this.preparation = preparation;
  }
}

class Ingredient {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

class Tag {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

export {
	Recipe,
	Ingredient,
	Tag
};
