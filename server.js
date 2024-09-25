// server.js
const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const accountRoutes = require('./routes/accountRoutes');
const errorHandler = require('./middlewares/errorMiddleware');

// Load environment variables
dotenv.config();

const app = express();

// // Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/accounts', accountRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Hello From SM@2" })
})

// Global error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
