const express = require('express');
const { body, query,validationResult } = require('express-validator');





const {
  addSchool,
  listSchools
} = require('../controller/schoolController');

const router = express.Router();


// POST /api/v1/schools/addSchool
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

router.post(
  '/addSchool',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('address').trim().notEmpty().withMessage('Address is required'),
    body('latitude')
      .isFloat({ min: -90, max: 90 })
      .withMessage('Latitude must be between -90 and 90'),
    body('longitude')
      .isFloat({ min: -180, max: 180 })
      .withMessage('Longitude must be between -180 and 180')
  ],
  validate,   
  addSchool
);

// GET /api/v1/schools/listSchools?latitude=...&longitude=...
router.get(
  '/listSchools',
  [
    query('latitude')
      .isFloat({ min: -90, max: 90 })
      .withMessage('Latitude must be a float between -90 and 90'),
    query('longitude')
      .isFloat({ min: -180, max: 180 })
      .withMessage('Longitude must be a float between -180 and 180')
  ],
  listSchools
);

module.exports = router;
