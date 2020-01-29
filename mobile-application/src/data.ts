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

const penne = new Ingredient('penne');
const spaghetti = new Ingredient('spaghetti');
const mozarella = new Ingredient('mozarella');
const tomatensaus = new Ingredient('tomatensaus');
const kaas = new Ingredient('kaas');
const gehakt = new Ingredient('gehakt');
const kip = new Ingredient('kip');
const rijst = new Ingredient('rijst');
const zalm = new Ingredient('zalm');
const ingredients = [penne, spaghetti, mozarella, tomatensaus, kaas, gehakt, kip, rijst, zalm];

const easy = new Tag('easy');
const fast = new Tag('fast');
const asian = new Tag('asian');
const takeaway = new Tag('takeaway');
const tags = [easy, fast, asian, takeaway];

const recipe1 = new Recipe(1, 'Pasta pesto', [penne, mozarella], [fast, easy], 'http://finedininglovers.cdn.crosscast-system.com/BlogPost/l_5758_StockFood-00299679.jpg', 'Mix de pijnboompitten, knoflook en basilicum samen met de olijfolie tot een gladde massa.>Roer de parmezaan erdoor.>Breng op smaak met peper en zout.>Kook de pasta in voldoende gezouten water al dente.>Giet af en meng de pesto erdoor.');
const recipe2 = new Recipe(2, 'Spaghetti bolognaise', [spaghetti, tomatensaus, kaas, gehakt], [fast, easy], 'https://img.taste.com.au/PXvnKf8Y/taste/2016/11/spaghetti-bolognaise-104579-1.jpeg', '');
const recipe3 = new Recipe(3, 'Rode curry', [kip, rijst], [asian], 'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2017/05/thai-red-curry.jpg', '');
const recipe4 = new Recipe(4, 'Pasta met zalm', [penne, zalm], [zalm], 'https://www.weightwatchers.be/images/2067/dynamic/foodandrecipes/2014/05/BE-FL_7034148_800x800.jpg', '');
const recipe5 = new Recipe(5, 'Sushi', [rijst], [takeaway], 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/01/13/10/sushi.jpg', '');
const recipes = [recipe1, recipe2, recipe3, recipe4, recipe5];

export default recipes;

export {
  Recipe,
  Ingredient,
  Tag,
  recipes,
  ingredients,
  tags
};
