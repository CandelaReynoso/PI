const { Router } = require('express');
const router = Router();
const { dogEdit } = require('../controllers/dogEdit');

router.put('/update/:id', async (req, res) => {
    const { id }  = req.params; // Obtener el ID del perro a actualizar.
    const { name, age, height, weight, image, temperament } = req.body; // Obtener los nuevos datos del perro.
    try {
        const updateDog = await dogEdit(id, name, age, height, weight, image, temperament);
        res.status(200).json(updateDog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error in updating dog' });
    }
});

module.exports = router;


/* const { Router } = require('express');
const router = Router();
const { dogEdit } = require('../controllers/dogEdit');

router.put('/update/:id', async (req, res) => {
    const { id }  = req.params; // Obtener el ID del perro a actualizar.
    const { name, age, height, weight, image, temperament } = req.body; // Obtener los nuevos datos del perro.
    try {
        const updateDog = await dogEdit(id, name, age, height, weight, image, temperament);
        res.status(200).json(updateDog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error in updating dog' });
    }
});

module.exports = router; */