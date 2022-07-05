import axios from 'axios'




export  function getDogs(){
    return  async function(dispatch){
        try{
            let dogs = (await axios.get(`http://localhost:3001/api/dogs`)).data
            dispatch({
              type: 'GET_DOGS',
              payload: dogs
            })
        }catch(err){
            console.log(err)
        }
    }
}

export  function getTempers(){ //para rellenar las opciones en el filtro por temperamento
    return  async function(dispatch){
        try{
            let temperaments = (await axios.get(`http://localhost:3001/api/temperament`)).data
            dispatch({
              type: 'GET_TEMPERS',
              payload: temperaments
            })
        }catch(err){
            console.log(err)
        }
    }
}

export function filterByTemper(temper){
    return{
        type: 'FILTER_BY_TEMPER',
        payload: temper
    }
}

export function filterOrigin(origin){
    return{
        type: 'FILTER_ORIGIN',
        payload: origin
    }
}

export function orderByName(order){
    return{
        type: 'ORDER_NAME',
        payload: order
    }
}

export function orderByWeight(order){ //wehitasc
    return{
        type: 'ORDER_WEIGHT',
        payload: order
    }
}

export function getByRace(name){
    return async function(dispatch){
        try{
            let races = (await axios.get(`http://localhost:3001/api/dogs?name=${name}`)).data
            dispatch({
              type: 'GET_BY_RACE',
              payload: races
            })
        }catch(err){
            console.log(err)
        }
    }
}

export function postDog(data){
    return function(dispatch){
     let created = axios.post('http://localhost:3001/api/dogs', data)
     console.log(created)
     return created 
    }
}



export function getDetail(id){
    return async function(dispatch){
        try{
            let dog = (await axios.get(`http://localhost:3001/api/dogs/${id}`)).data
            dispatch({
              type: 'GET_DETAIL',
              payload: dog
            })
        }catch(err){
            console.log(err)
        } 
    }
}

// export function getTemperaments(){
//     return async function(dispatch){
//         try{
//             let tempers = (await axios.get(`http://localhost:3001/api/temperament`)).data
//             dispatch({
//               type: 'GET_TEMPERS',
//               payload: tempers
//             })
//         }catch(err){
//             console.log(err)
//         } 
//     }
// }
