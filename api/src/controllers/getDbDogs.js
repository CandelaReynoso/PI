const axios = require('axios');
const Sequelize = require('sequelize');
require('dotenv').config();
const { Dog, Temperament } = require('../db');

const getDbDogs = async () => {
    const dbDogs = await Dog.findAll({
      include: {
        model: Temperament,
        attributes: ['name'],
        through: {
          attributes: [],
        },
        raw: true,
      },
    })
  
    const formattedDogs = dbDogs?.map(dbDog => {
      return {
        id: dbDog.id,
        name: dbDog.name,
        weight: dbDog.weight,
        height: dbDog.height,
        age: dbDog.age,
        image: dbDog.image,
        createInDb: dbDog.createInDb,
        temperament: dbDog.temperaments?.map(temperament => temperament.name),
      }
    })
  
    return formattedDogs;
  }

module.exports = { getDbDogs };
