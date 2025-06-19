const { validationResult } = require('express-validator');
const School = require('../models/schoolModel');


//calculating the distance on basis of lat and long
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (val) => (val * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};


//adding school 
const addSchool = async (req, res) => {


  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
     
     //fetching data from  req body
  const { name, address, latitude, longitude } = req.body;

  try {
    const result = await School.addSchool({ name, address, latitude, longitude });
    res.status(201).json({ message: 'School added successfully', id: result.insertId });
  } 
  catch (error) {
    res.status(500).json({ error: 'Database error', details: error.message });
  }
};


//finding the list of school
const listSchools = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

    //getting lat and long freom request para
  const userLat = parseFloat(req.query.latitude);
  const userLon = parseFloat(req.query.longitude);

  try {
    const schools = await School.getAllSchools();


    //sorting school on basis of distance
    const sortedSchools = schools.map((school) => ({
      ...school,
      distance: calculateDistance(userLat, userLon, school.latitude, school.longitude)
    })).sort((a, b) => a.distance - b.distance);

    res.status(200).json(sortedSchools);
  } catch (error) {
    res.status(500).json({ error: 'Database error', details: error.message });
  }
};

module.exports = {
  addSchool,
  listSchools
};
