# FinalProject_Recipe
## Name of Project
“Empty Your Fridge”
## Summary
This website allows users to search by food ingredient(s). The food ingredient is what they want to use or just what they have left in their fridge. Users add their desired recipes from search results to ‘Favorite’ so that these can be easily accessed for meal prep.
## Features
Home page: 
 - Search by food ingredients

- Recipe page:
Display all recipes from search results

- “Favorite” page:
  - modify the MEMO
  - unfavorite recipe from the Favorite page

APIs & Packages Used
Search recipe:https://rapidapi.com/spoonacular/api/recipe-food-nutrition

## Routes

The following `Route`s have been created in the `React` application, however, they have not been completed.

| URL             | Component         | Intended Content                                             |
| --------------- | ----------------- | ------------------------------------------------------------ |
| "/"             | `<Home/>`         | The Home page  where can Search                 |
| "/recipe/:_id"   | `<Recipe/>` | Will display details about a given recipe and a button to add to Favorite |
| "/recipes"        | `<Recipes/>`        | Will display search results of 5 recipes contain this ingredient         |
| "/favorites*"            | `<FavPage/>`     | Will display all favorited recipes with MEMO "/"             |

Each Route's component will be found in its own folder in `/src/components`.

---

## Routes Endpoints

The following endpoints have been created in the `Express` server. They have been completed, so you will not have to edit them.

| URL            | Method | Description                                      |
| -------------- | ------ | ------------------------------------------------ |
| "/api/search"      | `GET`  | Returns an array of 5 results Recipes.  |
| "//api/recipe/:id" | `GET`  | Returns a single detailed recipe information by id. |
| "/api/favorites/add"      | `POST` | Add to Favorite by id.  |
| "/api/favorites/:id"      | `PATCH` | Update a MEMO in 'Favorite' by id.  |
| "/api/favorites/:id"      | `DELETE` | Delete a favorite recipe from 'Favorites' by id.  |