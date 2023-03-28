const { Dog } = require('../db');



const deleteDogs = async (id) => {

 if(!id) {
  throw new Error ('This Dog does not exist') 
 } else if(typeof id === 'number') throw new Error ('You can not erase this game')
  const foundDog = await Dog.findByPk(id)

  foundDog.destroy({
    where: { id: id }
   })
   return foundDog;
}

module.exports = {deleteDogs};