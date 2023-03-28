const { Router } = require('express');
const router = Router();
const { deleteDogs } = require('./deleteDogs');

router.delete('/dogs/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const dog = await deleteDogs(id);
        if (dog) {
            res.status(200).send(dog);
        } else {
            res.status(404).json({msg: "Raza no encontrada"});
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
});

module.exports = router;



