require('dotenv').config();
const express = require('express');
const cors = require('cors');
//const fetch = require('node-fetch');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const apiKey = process.env.API_KEY;

app.use(cors());
app.use(express.json());

let favoriteRecipes = [];

let db;
MongoClient.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        db = client.db('Fridge');
        console.log('Connected to MongoDB');
    })
    .catch(error => console.error(error));

// Get search 5 results and add into MongoDB 'SearchList' collection
app.get('/api/search', async (req, res) => {
    const ingredients = req.query.ingredients;
    if (!ingredients) return res.status(400).send('Ingredients query parameter is required.');
    const encodedQuery = encodeURIComponent(ingredients);

    const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=${encodedQuery}&number=5&ignorePantry=true&ranking=1`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const recipes = await response.json();
        const recipesCollection = db.collection('SearchList');
        await recipesCollection.insertMany(recipes);
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// New endpoint to fetch detailed recipe information by ID
app.get('/api/recipe/:id', async (req, res) => {
    const recipeId = req.params.id;
    console.log(`Fetching recipe with ID: ${recipeId}`)
    const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeId}/information`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
    };

    try {
      // Fetch recipe information from Spoonacular API
      const response = await fetch(url, options);
      const recipe = await response.json();

      // Insert recipe into MongoDB "Recipes" collection
      const recipesCollection = db.collection('Recipes');
      await recipesCollection.insertOne(recipe);

      res.json(recipe);
    } catch (error) {
      console.error(`Error in API call: ${error.message}`);
      res.status(500).json({ error: error.message });
    }
});
// Add to Favorite
app.post('/api/favorites/add', async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).send('Recipe ID is required!');
    }
    try {
        // Fetch detailed recipe information from the '/api/recipe/:id' endpoint
        const response = await fetch(`http://localhost:3001/api/recipe/${id}`);
        const recipe = await response.json();
        // Insert the detailed recipe information into the "Favorites" collection
        const favoriteCollection = db.collection('Favorites');
        await favoriteCollection.insertOne(recipe);
        res.status(201).send('Recipe added to Favorites!');
    } catch (error) {
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



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});