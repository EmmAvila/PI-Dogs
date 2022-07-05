const axios = require('axios');
const {Temper} = require('../db');
const {API_LIMIT}=process.env

let tempersApi= [];


async function temperDb() {
    try {
      const {data} =  await axios.get(`https://api.thedogapi.com/v1/breeds${API_LIMIT}`);
      //-----Probando cosas
      // let i=0;
      // data.forEach(element => {
      //   i++,
      //   console.log(`${i}`, element.weight.metric, typeof element.weight.metric)
      // });
      // mejorar esta parte - A
      data.forEach(raza => {
        if(raza.temperament){
        tempersApi = [...new Set( [...tempersApi, ...raza.temperament.split(', ')] )].sort()
       }
      });
        // mejorar esta parte - A
      tempersApi.forEach(temp => {
        Temper.findOrCreate({where : {name: temp}})
      })
      console.log('Temperaments loaded')

    } catch (error) {
      console.error(error);
    }

}


module.exports = {
    temperDb
} 
  
  
