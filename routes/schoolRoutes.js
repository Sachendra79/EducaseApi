const express = require('express');
const { body, query } = require('express-validator');



const router = express.Router();
const {
  addSchool,
  listSchools
} = require('../controller/schoolController');

// POST /api/v1/schools
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('address').notEmpty().withMessage('Address is required'),
    body('latitude').isFloat().withMessage('Latitude must be a float'),
    body('longitude').isFloat().withMessage('Longitude must be a float')
  ],
  addSchool
);

// GET /api/v1/schools?latitude=..&longitude=..
router.get(
  '/',
  [
    query('latitude').isFloat().withMessage('Latitude must be a float'),
    query('longitude').isFloat().withMessage('Longitude must be a float')
  ],
  listSchools
);

module.exports = router;
