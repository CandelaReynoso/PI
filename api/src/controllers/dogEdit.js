const { Dog } = require('../db');

const dogEdit = async (id,name, age, height, weight, image, temperament) => {
    // Verificar que el perro a actualizar existe en la base de datos
    const dogToUpdate = await Dog.findByPk(id);
    if(!dogToUpdate) {
        throw new Error ('There is no info to update');
    }
    // Actualizar los datos del perro en la base de datos
    await dogToUpdate.update({
                name:name,  
                age:age, 
                height:height, 
                weight:weight, 
                image:image,
                temperament:temperament
       })
    // Devolver los datos actualizados del perro.
    return dogToUpdate;
};

module.exports = { dogEdit }; 







