const { Dog } = require('../db');

const deleteDogs = async (req, res) => {
  const id = req.params.id;

  try {
    // Busca el perro por ID
    const dog = await Dog.findByPk(id);
    console.log(dog);
    // Si no se encuentra el perro, devuelve un error
    if (!dog) {
      return res.status(404).send('Dog not found');
    }

    // Elimina el perro de la base de datos
    await dog.destroy();

    res.send('Dog deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  deleteDogs,
};