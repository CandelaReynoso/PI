const { Router } = require('express');
const router = Router();
const { deleteDogs } = require('../controllers/deleteDogs');


router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        const dog = await deleteDogs(id);
        res.status(200).json(`the dog ${dog.name} was deleted`);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

module.exports = router;



