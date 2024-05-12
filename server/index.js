
require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = 3001;
const API_KEY = 'YOUR_API_KEY';

app.use(express.json());

app.get('/api/search', async (req, res) => {
    const { query } = req.query;
    try {
    const response = await fetch(`https://webknox-recipes.p.rapidapi.com/recipes/search?query=${query}&number=10`, {
        headers: {
        'X-RapidAPI-Key': API_KEY,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch recipes');
    }
    const data = await response.json();
    res.json(data);
    } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Failed to fetch recipes' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});