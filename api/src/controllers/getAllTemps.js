const axios = require('axios');
const { API_KEY } = process.env;
const { Temperament } = require('../db')


const allTemps = async () => {
    const temps = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)//me trae los temps en forma de arrelgo

    temps.data.forEach(elem => { //analizo cada elemento del arreglo de razas
        if (elem.temperament) {
            let temps = elem.temperament.split(', ');

            temps.forEach(e => {
                Temperament.findOrCreate({//analizo los arreglos, los desarmo y guardo el name de cada temp
                    where: { name: e }//findOrCreate para que no se repita cuando analice dos con el mismo name
                })
            })
        }
    });
    const findTemps = await Temperament.findAll();//lo guardo en esta constante para no volver a hacer todo el proceso
    return findTemps;//así ya la tengo en la base de datos y la puedo sacar de ahí cuando la necesito, no hace falta volver a llamar a la api
}


module.exports = { allTemps };