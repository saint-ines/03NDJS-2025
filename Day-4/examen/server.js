//point d'entrée principal de l'application
const express = require('express');
const bodyparser = require('body-parser');
const authRoutes = require('./routes/aut');
const { authenticate } = require('./middleware/auth');

const app = express();

app.use(bodyparser.json());

app.use('/api', authRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});