const {Router} = require('express');
const {Race, Temper} = require('../db');
const { Op } = require("sequelize");
const getRaces = require('../controllers/races');

const axios = require('axios').default;
const {API_LIMIT}=process.env

const router = Router(); // instanciamos router

//get listado total o por raza query
router.get('/',getRaces)


//get detalle raza
router.get('/:id', async (req, res, next) => {
    let id = req.params.id
    // console.log(typeof id)
    let found
    try{
        if(id.length > 8) {
          found = await Race.findByPk(id, {
            // attributes: ['name', 'id'],
            include:{
              model: Temper,
              attributes: ['name'],
              through: {
                attributes:[]
              }
            }
          }) 
          
          
          if(found) {
            found.dataValues.image = found.dataValues.image? found.dataValues.image:'https://www.sopitas.com/wp-content/uploads/2017/01/snuffles-rick-and-morty.jpg?w=800'
            res.json(found)}
          else{
            throw new Error('Error en id')
          }  
        }else{
            id = parseInt(req.params.id)
            let {data} = await axios.get(`https://api.thedogapi.com/v1/breeds${API_LIMIT}`)
            // console.log(Array.isArray(data))
            data.forEach(r => {
               if(r.id === id){
                
                found = {
                  id: r.id,
                  name: r.name,

                  weight_min: r.weight.metric.split(' - ')[0] === 'NaN'? r.weight.metric.split(' - ')[1] || 'Unknow':
                  r.weight.metric.split(' - ')[0],

                  weight_max: r.weight.metric.split(' - ')[1],

                  height_min: r.height.metric.split(' - ')[0] === 'NaN'? r.height.metric.split(' - ')[1] || 'Unknow':
                  r.height.metric.split(' - ')[0],

                  height_max: r.height.metric.split(' - ')[1]? r.height.metric.split(' - ')[1]: r.height.metric.split(' - ')[0],


                  lifeSpan: r.life_span,
                  image: r.image.url, 
                  temperament: r.temperament? r.temperament: 'Unknow',
              }
               } 
            });
            if(found) {
              res.json(found)}
            else{
              throw new Error('Error en id')
            } 
        }
    }catch(err){
        console.log(err)
        next(err)
    }
    

})

// crea una raza
router.post('/', async (req, res, next) => {
    const { name, height_min, height_max, weight_min, weight_max, lifeSpan, temperament} = req.body
    // console.log( name, height, weight, lifeSpan)
    if(!name || !height_min || !height_max || !weight_max || !weight_min || !lifeSpan || temperament.length<1) return res.status(400).send('datos incorrectos')
    try{
      let newRace = await Race.create(req.body);
      let temper = await Temper.findAll({
        where: {
          name: temperament
        }
      })
      // console.log(temper.dataValues)
      
      newRace.addTemper(temper)
      res.send('se creo la raza: ' + newRace.name)
    }catch(err){
      res.status(400).send('ya existe la raza')
    }
})




module.exports = router