import Tags from './tags';
import Ingredients from './ingredients';

const recipesData = {
  "B&G": [
    {
      id: 1,
      name: "Pasta pesto",
      image: "http://finedininglovers.cdn.crosscast-system.com/BlogPost/l_5758_StockFood-00299679.jpg",
      tags: [Tags.fast, Tags.easy, Tags.pasta],
      ingredients: [Ingredients.penne, Ingredients.mozarella],
      preparation: "Mix de pijnboompitten, knoflook en basilicum samen met de olijfolie tot een gladde massa.\nRoer de parmezaan erdoor.\n Breng op smaak met peper en zout.\nKook de pasta in voldoende gezouten water al dente.\nGiet af en meng de pesto erdoor."
    },
    {
      id: 2,
      name: "Spaghetti bolognaise",
      image: "https://img.taste.com.au/PXvnKf8Y/taste/2016/11/spaghetti-bolognaise-104579-1.jpeg",
      tags: [Tags.fast, Tags.easy, Tags.pasta],
      ingredients: [],
      preparation: ""
    },
    {
      id: 3,
      name: "Rode curry",
      image: "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2017/05/thai-red-curry.jpg",
      tags: [Tags.medium, Tags.moderate, Tags.asian],
      ingredients: [],
      preparation: ""
    },
    {
      id: 4,
      name: "Pasta met zalm",
      image: "https://www.weightwatchers.be/images/2067/dynamic/foodandrecipes/2014/05/BE-FL_7034148_800x800.jpg",
      tags: [Tags.medium, Tags.moderate, Tags.pasta],
      ingredients: [],
      preparation: ""
    },
    {
      id: 5,
      name: "Sushi",
      image: "https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/01/13/10/sushi.jpg",
      tags: [Tags.asian, Tags.takeaway],
      ingredients: [],
      preparation: "016 41 68 58"
    },
    {
      id: 6,
      name: "Kip aan het spit",
      image: "https://static01.nyt.com/images/2015/09/21/multimedia/clark-roast-chicken/clark-roast-chicken-superJumbo.jpg",
      tags: [Tags.fast, Tags.easy, Tags.poultry],
      ingredients: [],
      preparation: ""
    },
    {
      id: 7,
      name: "Pizza",
      image: "http://www.mozzarellacheeserecipes.com/wp-content/uploads/2017/05/Italian-Pizza-Recipe.jpg",
      tags: [Tags.italian, Tags.takeaway],
      ingredients: [],
      preparation: "Il Daino: 016 38 99 22\nL'Aurora: 016 29 47 90\n"
    },
    {
      id: 8,
      name: "Thai House",
      image: "https://live.staticflickr.com/2504/3834483579_4fdee4052b_z.jpg",
      tags: [Tags.asian, Tags.takeaway],
      ingredients: [],
      preparation: ""
    },
    {
      id: 9,
      name: "Balletjes met spinazie",
      image: "https://keeprecipes.com/sites/keeprecipes/files/imagecache/recipe_large/turkey-spinach-meatball-pasta-700.jpg",
      tags: [Tags.fast, Tags.easy, Tags.pasta],
      ingredients: [],
      preparation: ""
    },
    {
      id: 10,
      name: "Sla met appeltjes",
      image: "https://i.pinimg.com/originals/b7/26/79/b72679a11168fb2deb453a3f3dd7276a.jpg",
      tags: [Tags.fast, Tags.easy, Tags.healthy],
      ingredients: [Ingredients.salad],
      preparation: ""
    }
  ],
  "DIKZAK": [
    {
      id: 1,
      name: "Frieten",
      image: "https://cms.splendidtable.org/sites/default/files/styles/w2000/public/french-fries.jpg?itok=FS-YwUYH",
      tags: [Tags.unhealthy],
      ingredients: [],
      preparation: ""
    },
    {
      id: 2,
      name: "Pizza",
      image: "https://recipes.timesofindia.com/photo/53110049.cms",
      tags: [Tags.unhealthy],
      ingredients: [],
      preparation: ""
    },
    {
      id: 3,
      name: "Hamburgers",
      image: "https://recipes-secure-graphics.grocerywebsite.com/0_GraphicsRecipes/4589_4k.jpg",
      tags: [Tags.unhealthy],
      ingredients: [],
      preparation: ""
    }
  ]
};

export default recipesData;