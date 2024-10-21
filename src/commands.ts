import { AppError } from "./app.error";
import { Recipe, RecipeType } from "./recipe";
import { Store } from "./stores/store.type";

export async function list(store: Store<RecipeType[]>, args: string[]) {
  if(args && args.length){
    throw new AppError("The list command should not have any argument.")
  }
  
  const recipe = new Recipe(store);
  const recipes = await recipe.readAll();
  const formatted = recipes
    .map((recipe) => `- [${recipe.id}] ${recipe.name}`)
    .join('\n');
  console.log('Your recipes:');
  console.log(formatted);
}

export async function details(store: Store<RecipeType[]>, args: string[]) {

  if(!args || args.length !==1 ){
    throw new AppError("The details command should have one numeric ID argument.")
  }
const id = parseInt(args[0]);

const recipe = new Recipe(store);
const recipes = await recipe.readAll();
const filteredRecipes = recipes.filter(rec=>rec.id === id);
const formatted = 
 `ID: ${filteredRecipes[0].id}\nName: ${filteredRecipes[0].name}`

  console.log('Your recipe:');
console.log(formatted);
}