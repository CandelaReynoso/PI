const {Dog, Temperament} = require('../db.js');
const { Op } = require('sequelize');
require('dotenv').config();
const{allTemps}= require('./getAllTemps');

const createDog = async (
  name,
  height,
  weight,
  age,
  image,
  createInDb,
  temperament,
) => {

try {
  const responseDb = await Dog.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
  });
  if (responseDb.length) return 'Ya existe un perro con ese nombre';

  const newDog = await Dog.create({
    name: name,
    height: height,
    weight: weight,
    age: age,
    image: image,
    createInDb: true,
  });
  
   //Verifico que la tabla de Temps esté cargada, sino la crea.

   const  TemperamentCount = await Temperament.count();
   if (TemperamentCount === 0) { //Verifico si ya está cargado el modelo.
       await allTemps();
   }
   
// Asocia los temps al perro.
const tempsEncontrados = await Promise.all(
 temperament.map(async (temp) => {
   const tempEncontrado = await Temperament.findOne({ where: { name: temp } });


   if (!tempEncontrado) {
     throw new Error(`Tipo de ${temp} no existe`);
   }
   return tempEncontrado;
 })
);
await newDog.addTemperament(tempsEncontrados);

return newDog;

} catch (error) {
  return error.message;
}
};

module.exports = {createDog};



