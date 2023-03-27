const axios = require('axios');
require('dotenv').config
const {API_KEY} = process.env
const { getApiDogs } = require('./getApiDogs');
const { getDbDogs } = require('./getDbDogs');


const getAllDogs = async () => {
    const apiDogs = await getApiDogs();
    let dbDogs = await getDbDogs();
    const allDogs = apiDogs.concat(dbDogs);
    console.log(allDogs)
    return allDogs;
}

   module.exports = { getAllDogs };



