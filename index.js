const express = require('express');
const dotenv = require('dotenv');
const schoolRoutes = require('./routes/schoolRoutes');

dotenv.config();
const app = express();

app.use(express.json());

app.use('/api/v1', schoolRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
