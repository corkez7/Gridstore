const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/user');
const configurationRoutes = require('./routes/configuration');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection
const MONGO_URI = 'YOUR_MONGODB_ATLAS_CONNECTION_STRING_HERE';
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/configuration', configurationRoutes);
app.use('/api/auth', authRoutes);

// Initial Route
app.get('/', (req, res) => {
  res.send('Gridfinity Backend API is up and running');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
