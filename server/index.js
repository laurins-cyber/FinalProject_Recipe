
require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.get('/api/search', async (req, res) => {
    const { query } = req.query;
    const encodedQuery = encodeURIComponent(query); // Encode the query parameter
    const url = `https://webknox-recipes.p.rapidapi.com/recipes/findByIngredients?ingredients=${encodedQuery}&number=10`;
    const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'webknox-recipes.p.rapidapi.com'
    }
    };

    try {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error('Failed to fetch recipes');
    }
    const data = await response.json();
    res.json(data);
    } catch (error) {
    console.error('Error searching recipes:', error);
    res.status(500).json({ error: 'Failed to fetch recipes' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});