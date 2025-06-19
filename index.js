const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const schoolRoutes = require('./routes/schoolRoutes');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/schools', schoolRoutes);

// error 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// start server
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`API running on ${PORT}`);
});
