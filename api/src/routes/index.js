
const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getAllDogsMiddleware = require('./getAllDogs');
const getDogsByIdMiddleware = require('./getDogsById');
const postNewDogMiddleware = require('./postDog');
const getAllTempsMiddleware = require('./getAllTemps');
const deleteDogsMiddleware = require('./deleteDogsDb');
const editDogMiddleware = require('./editDogRoute');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', getAllDogsMiddleware);
router.use('/dogs', getDogsByIdMiddleware);
router.use('/dogs', postNewDogMiddleware);
router.use('/temps', getAllTempsMiddleware);
router.use('/dogs', deleteDogsMiddleware);
router.use('/dogs', editDogMiddleware);

module.exports = router;
