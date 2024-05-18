
require('dotenv').config();
const express = require('express');
//const fetch = import("node-fetch");
const app = express();
const { MongoClient } = require('mongodb');

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const apiKey = process.env.API_KEY;

app.use(express.json());

//connecting to mongoDB
let db;
MongoClient.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        db = client.db('Fridge');
        console.log('Connected to MongoDB');
    })
    .catch(error => console.error(error));

//Get search 5 results and add into mongoDB 'Recipes' collection
app.get('/api/search', async (req, res) => {
  const ingredients = req.query.ingredients;
  if (!ingredients) return res.status(400).send('Ingredients query parameter is required.');
    const encodedQuery = encodeURIComponent(ingredients); // Encode the query parameter

const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=${encodedQuery}&number=5&ignorePantry=true&ranking=1`;
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': apiKey,
    'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
  }
};
console.log(fetch);
try {
	const response = await fetch(url, options);
	if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
}
  const recipes = await response.json();
  // Save search results to "Recipes" collection
  const recipesCollection = db.collection('Recipes');
  await recipesCollection.insertMany(recipes);

  res.json(recipes);
} catch (error) {
  res.status(500).json({ error: error.message });
}
});

//Add to Favorite
app.post('/api/favorites', async(req, res) => {
  const recipe = req.body;

  if(!recipe || !recipe.id) {
    return res.status(400).send('Recipre data is required!');
  }
  try{
    const favoriteCollection = db.collection('Favorites');
    await favoriteCollection.insertOne(recipe);

    res.status(201).send('Recipe added to Favorites!');
  } catch(error) {
    res.status(500).json({error: error.message});
  }
})

// Get all recipes from "Recipes" collection
app.get('/api/recipes', async (req, res) => {
  try {
      const recipesCollection = db.collection('Recipes');
      const recipes = await recipesCollection.find().toArray();
      res.json(recipes);
  } catch (error) {
      console.error('Error fetching recipes:', error);
      res.status(500).json({ error: error.message });
  }
});

// Get all favorite recipes from "Favorites" collection
app.get('/api/favorites', async (req, res) => {
  try {
      const favoritesCollection = db.collection('Favorites');
      const favorites = await favoritesCollection.find().toArray();
      res.json(favorites);
  } catch (error) {
      console.error('Error fetching favorite recipes:', error);
      res.status(500).json({ error: error.message });
  }
});

// Fetch a single recipe by ID
app.get('/api/recipe/:id', async (req, res) => {
  const { id } = req.params;

  try {
      const recipe = await db.collection('Recipes').findOne({ id: parseInt(id) });
      if (!recipe) {
          return res.status(404).send('Recipe not found');
      }
      res.json(recipe);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});