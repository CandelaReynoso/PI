const {Router} = require('express');
const {getAllDogs} = require('../controllers/getAllDogs');
const router = Router();

router.get('/', async (req,res) => {
    const name = req.query.name;
    const allDogs = await getAllDogs();
    try {
        if(name) {
            const dogName = await allDogs.filter(dog => dog.name.toLowerCase().includes(name.toLocaleLowerCase()))
            dogName.length ? res.status(200).send(dogName) : res.status(404).json({msg: "Raza no encontrada"});
        } else return res.status(200).send(allDogs);
    } catch (error) {
        res.status(404).send(error.message);
    }
})

module.exports = router;