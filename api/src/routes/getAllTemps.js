const {Router} = require('express');
const {allTemps} = require('../controllers/getAllTemps');
const router = Router();

router.get('/', async (req,res)=>{
    const temps = await allTemps();
    try {
        res.status(200).send(temps);
    } catch (error) {
        res.status(404).send(error.message);
    }
})

module.exports = router;