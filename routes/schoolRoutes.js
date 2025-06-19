const express = require('express');
const { body, query } = require('express-validator');





const {
  addSchool,
  listSchools
} = require('../controller/schoolController');

const router = express.Router();


// POST /api/v1/schools/addSchool
router.post(
  '/addSchool',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('address').notEmpty().withMessage('Address is required'),
    body('latitude').isFloat().withMessage('Latitude must be a float'),
    body('longitude').isFloat().withMessage('Longitude must be a float')
  ],
  addSchool
);

// GET /api/v1/schools/listSchools?latitude=...&longitude=...
router.get(
  '/listSchools',
  [
    query('latitude').isFloat().withMessage('Latitude must be a float'),
    query('longitude').isFloat().withMessage('Longitude must be a float')
  ],
  listSchools
);

module.exports = router;
