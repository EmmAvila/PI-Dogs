

const initialState = {
    temperaments: [], //solo para opciones en el selector de temperamentos
    dogs: [],//estado para mostrar en area de home
    allDogs:[], //auxiliar para filtrados
    detail: {},
    filtered: []
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case 'GET_DOGS':
            return {
                ...state, 
                dogs: action.payload,
                allDogs: action.payload,
                filtered: action.payload
            }

        case 'GET_TEMPERS':
            return{
                ...state, 
                temperaments: action.payload
            }

        case 'FILTER_BY_TEMPER':
            let temperFiltered = action.payload === 'All' ? state.allDogs
            : state.allDogs.filter((dog) => dog.temperament.split(', ').includes(action.payload))

            return{
                ...state,
                dogs: temperFiltered,
                filtered: temperFiltered
            }

        case 'FILTER_ORIGIN':
            let originFiltered = [];
            console.log('Action', action.payload)
            if(action.payload === 'All') originFiltered = state.filtered
            if(action.payload === "Api") originFiltered = state.filtered.filter((dog) => typeof(dog.id) === "number")
            if(action.payload === "Created") originFiltered = state.filtered.filter((dog) => typeof(dog.id) === "string")
            console.log(originFiltered)
            return{
                ...state,
                dogs: originFiltered
            }

            case 'ORDER_NAME':
                // console.log('order', action.payload)
                // console.log(state.dogs[0])
                //hasta aqui
                // let desOrder = [...state.dogs].reverse()
                // let asOrder= [...state.dogs]
                // let ordered = action.payload === 'asc' ? asOrder : desOrder
                // console.log(ordered[0])
                let orderName = action.payload === 'asc' ? 
            
             state.dogs.sort(function (a, b){
                if (a.name > b.name){return 1};
                if (b.name > a.name){return -1};
                return 0;
            }) :
            state.dogs.sort(function(a, b){
                if (a.name > b.name){return -1};
                if (b.name > a.name){return 1};
                return 0;
            })
                return{
                    ...state,
                    dogs: orderName
                }
            
            case 'ORDER_WEIGHT':
                let orderWeight = action.payload === 'weightAsc' ? 
           
            state.dogs.sort(function (a, b){  
             return b.weight_min - a.weight_min;
            }) :
            state.dogs.sort(function(a, b){
              return a.weight_min - b.weight_min;
            })

            return{
            ...state,
            dogs: orderWeight
            }

            case 'GET_BY_RACE':
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload,
                filtered: action.payload
            }
                
            case 'POST_DOG':
                return{
                    ...state
                }

            case 'GET_DETAIL':
                return{
                    ...state,
                    detail: action.payload
                }    

        default:
            return {...state}//revisar esto
    } 
}