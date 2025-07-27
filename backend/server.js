const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Serve static files from the frontend's public directory
app.use('/models', express.static(path.join(__dirname, '..', 'frontend', 'public')));

app.post('/generate-model', (req, res) => {
    const { prompt } = req.body;
    console.log(`Received prompt: "${prompt}"`);

    // Simulate 3D model generation based on fixed prompts
    let modelImage = null;
    if (prompt.toLowerCase() === 'a medieval armor') {
        modelImage = 'armor-default.jpg';
    } else if (prompt.toLowerCase() === 'a flying dragon') {
        modelImage = 'dragon-default.jpg';
    } else if (prompt.toLowerCase() === 'a medieval sword') {
        modelImage = 'sword-default.jpg';
    } else if (prompt.toLowerCase() === 'a model of ozzy osbourne') {
        modelImage = 'ozzy-model-default.jpg';
    }

    if (modelImage) {
        res.json({ 
            message: '3D model generation simulated successfully!', 
            modelImageUrl: `http://localhost:${port}/models/${modelImage}`,
            prompt: prompt
        });
    } else {
        res.status(404).json({ 
            message: 'No specific model found for this prompt. Try "a medieval armor", "a flying dragon", "a medieval sword", or "a model of ozzy osbourne".',
            prompt: prompt
        });
    }
});

app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});
