
require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.get('/api/search', async (req, res) => {
    const { query } = req.query;
    const encodedQuery = encodeURIComponent(query); // Encode the query parameter
    const apiKey = process.env.API_KEY;

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
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}
    res.status(500).json({ error: 'Failed to fetch recipes' });
    }
);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});