

const { Router } = require('express');
const { createDog } = require('../controllers/postDog');
const router = Router();
require('dotenv').config();

router.post('/', async (req, res) => {
  const {name, height, weight, age, image, temperament, createInDb} = req.body;

  try {
    if (!name || !height || !weight || !age || !image || !temperament) {
      throw Error ('Falta informacion para crear el perro');
    } else {
      const newDog = await createDog(name, height, weight, age, image, createInDb, temperament);
      res.status(200).json(newDog);
    }
    
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;

