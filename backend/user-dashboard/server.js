//server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // Importing your authentication routes

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5005;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' })); // Enable CORS if needed (adjust the origin as per your frontend location)
app.use(express.json()); // Parse JSON payloads

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Use Authentication Routes
app.use('/', authRoutes); // Use the auth routes on the root path

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'An internal error occurred!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
