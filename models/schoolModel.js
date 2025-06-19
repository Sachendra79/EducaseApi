const db = require('../config/database');

// add Schol model

const addSchool = async (schoolData) => {
  const { name, address, latitude, longitude } = schoolData;
  const [result] = await db.execute(
    'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
    [name, address, latitude, longitude]
  );
  return result;
};


//getallschool model 
const getAllSchools = async () => {
  const [schools] = await db.execute('SELECT * FROM schools');
  return schools;
};

module.exports = {
  addSchool,
  getAllSchools
};
