const express = require('express');
const app = express();
const PORT = process.env.PORT || 5001;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server and log output
app.listen(PORT, () => {
    console.log(`Test server running on http://localhost:${PORT}`);
});

