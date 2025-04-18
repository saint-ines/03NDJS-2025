//point d'entrée principal de l'application
const express = require('express');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const { authenticate } = require('./middleware/auth');

const app = express();

app.use(express.json());

app.use('/api', authRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});