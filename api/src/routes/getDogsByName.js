const express = require('express');
const router = express.Router();
const { getAllDogs, getDbDogs } = require('../controllers/getAllDogs');

router.get('/dogs', async (req, res) => {
  const name = req.query.name.toLowerCase();
  try {
    
    if(name){
      const allDogs = await getAllDogs();
      const dbDogs = await getDbDogs();
      const dogs = [...allDogs, ...dbDogs].filter(d => d.name.toLowerCase().includes(name.toLowerCase()));
    }
    if (dogs.length) {
      res.status(200).json(dogs);  
    } else {
      res.status(404).json({ message: 'No se encontraron perros con ese nombre.' });
    }
  } catch (err) {
    res.status(400).json({err: err.message});
  }
});

module.exports = router;