const axios = require('axios');
const {Race, Temper} = require('../db')
const {API_LIMIT}=process.env
function compare( a, b )
  {
  if ( a.name.toLowerCase() < b.name.toLowerCase()){
    return -1;
  }
  if ( a.name.toLowerCase() > b.name.toLowerCase()){
    return 1;
  }
  return 0;
}

let getRaces = (req, res, next) => {
    let race = req.query.name
    let datApi = axios.get(`https://api.thedogapi.com/v1/breeds${API_LIMIT}`)
   
    let datDb = Race.findAll({
      
      include:{
        model: Temper,
        attributes: ['name'],
        through: {
          attributes:[]
        }
      }
    })
    
    Promise.all([datApi, datDb]).then(resp => {
        let [raceApi, raceDb] = resp
        let racesApi = raceApi.data.map((r, i)=> {
          
          return {
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
        })
        
        let formRaces = raceDb.map(r =>{
          let temp = r.Tempers.map(t => t.name).join(', ')
          return {
            name: r.name,

            weight_min: r.weight_min,

            weight_max: r.weight_max,

            height_min: r.height_min,

            height_max: r.height_max,


            lifeSpan: r.lifeSpan,
            image: r.image? r.image:'https://www.sopitas.com/wp-content/uploads/2017/01/snuffles-rick-and-morty.jpg?w=800', 
            temperament: temp,
            id: r.id,

          }
        })
        // console.log(formRaces)
        if(formRaces.length > 0) formRaces.forEach(r => {
          // console.log(r.dataValues)
          racesApi.push(r)});
        if(race){
            let filtered = racesApi.filter(r => r.name.toLowerCase().includes(race.toLowerCase()))
            
            res.json(filtered.sort(compare))
        }else{
            res.json(racesApi.sort(compare))
        } 
    }).catch(err => next(err))
}


module.exports = getRaces 