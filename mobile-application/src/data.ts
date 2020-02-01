import { Recipe, Ingredient, Tag } from './types';

const penne = new Ingredient(1, 'penne');
const spaghetti = new Ingredient(2, 'spaghetti');
const mozarella = new Ingredient(3, 'mozarella');
const tomatensaus = new Ingredient(4, 'tomatensaus');
const kaas = new Ingredient(5, 'kaas');
const gehakt = new Ingredient(6, 'gehakt');
const kip = new Ingredient(7, 'kip');
const rijst = new Ingredient(8, 'rijst');
const zalm = new Ingredient(9, 'zalm');
const ingredients = [penne, spaghetti, mozarella, tomatensaus, kaas, gehakt, kip, rijst, zalm];

const easy = new Tag(1, 'easy');
const fast = new Tag(2, 'fast');
const asian = new Tag(3, 'asian');
const takeaway = new Tag(4, 'takeaway');
const tags = [easy, fast, asian, takeaway];

const recipe1 = new Recipe(1, 'Pasta pesto', [penne, mozarella], [easy, fast], 'http://finedininglovers.cdn.crosscast-system.com/BlogPost/l_5758_StockFood-00299679.jpg', 'Mix de pijnboompitten, knoflook en basilicum samen met de olijfolie tot een gladde massa.>Roer de parmezaan erdoor.>Breng op smaak met peper en zout.>Kook de pasta in voldoende gezouten water al dente.>Giet af en meng de pesto erdoor.');
const recipe2 = new Recipe(2, 'Spaghetti bolognaise', [spaghetti, tomatensaus, kaas, gehakt], [easy, fast], 'https://img.taste.com.au/PXvnKf8Y/taste/2016/11/spaghetti-bolognaise-104579-1.jpeg', '');
const recipe3 = new Recipe(3, 'Rode curry', [kip, rijst], [asian], 'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2017/05/thai-red-curry.jpg', '');
const recipe4 = new Recipe(4, 'Pasta met zalm', [penne, zalm], [easy, fast], 'https://www.weightwatchers.be/images/2067/dynamic/foodandrecipes/2014/05/BE-FL_7034148_800x800.jpg', '');
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
