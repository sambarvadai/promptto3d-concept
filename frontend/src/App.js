import React, { useState } from 'react';
import './App.css';

function App() {
    const [prompt, setPrompt] = useState('');
    const [modelResult, setModelResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setModelResult(null);
        setError(null);

        try {
            const response = await fetch('http://localhost:5000/generate-model', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setModelResult(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Text to 3D Model Generator</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Enter your prompt for a 3D model (e.g., 'a red car')"
                        disabled={loading}
                    />
                    <button type="submit" disabled={loading || !prompt}>
                        {loading ? 'Generating...' : 'Generate 3D Model'}
                    </button>
                </form>

                {modelResult && (
                    <div className="result-container">
                        <h2>Generation Result:</h2>
                        <p>{modelResult.message}</p>
                        <p>Prompt: <strong>{modelResult.prompt}</strong></p>
                        {modelResult.modelImageUrl && (
                            <>
                                <img 
                                    src={modelResult.modelImageUrl}
                                    alt={`Generated 3D Model for ${modelResult.prompt}`}
                                    style={{ maxWidth: '100%', height: 'auto', marginTop: '10px' }}
                                />
                                <p>
                                    <a href={modelResult.modelImageUrl} download>
                                        Download Model Image
                                    </a>
                                </p>
                            </>
                        )}
                        {!modelResult.modelImageUrl && (
                            <p><em>(No specific image found for this prompt.)</em></p>
                        )}
                    </div>
                )}

                {error && (
                    <div className="error-container">
                        <h2>Error:</h2>
                        <p>{error}</p>
                        <p>Please ensure the backend server is running on http://localhost:5000.</p>
                    </div>
                )}
            </header>
        </div>
    );
}

export default App;
