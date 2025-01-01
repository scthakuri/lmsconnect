const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const ideaRoutes = require('./routes/ideaRoutes');
const { authMiddleware } = require('./middleware/authMiddleware');

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

app.use('/api/auth', authRoutes);
app.use('/api/ideas', authMiddleware, ideaRoutes);

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
