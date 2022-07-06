import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterByTemper, getDogs, getTempers, filterOrigin, orderByName, orderByWeight } from '../Store/actions'
import DogCard from './DogCard'
import SearchBar from './SearchBar'
import { Link } from 'react-router-dom'
import Paginated from './Paginated'
import s from './Styles/Home.module.css'

export default function Home(){
    let dogs = useSelector(state => state.dogs) //conectamos con el store a travez de useSelctor
    let tempers = useSelector(state => state.temperaments)
   
    //Paginado !!!
    let [order, setOrder] = useState('')
    let [currentPage, setCurrentPage] = useState(1)
    let numDogs  = 8 // este numero representa las razas por seccion
    let lastDogIndex = currentPage * numDogs
    let firstDogIndex = lastDogIndex - numDogs
    let curretDogs = dogs.slice(firstDogIndex, lastDogIndex)
    console.log(order)

    let paginado = (numPage) => {
        setCurrentPage(numPage)
    } 

    let dispatch = useDispatch()

    useEffect(() =>{
        console.log(dogs)
        dispatch(() => dogs.length <1? getDogs(): null)
        // dispatch(getTempers())
    },[dispatch]) // [] -> component didmount
    
    function handleClick(event){//Traer todos los perros
        event.preventDefault();
        dispatch(getDogs())
    //     setOrder(`${event.target.value}`)
    }

    function handleFilterByTemper(event){
        event.preventDefault();
        dispatch(filterByTemper(event.target.value))
        setCurrentPage(1)
        setOrder(`${event.target.value}`)
    }

    function handleOrigin(event){
        event.preventDefault();
        dispatch(filterOrigin(event.target.value))
        setCurrentPage(1)
        setOrder(`${event.target.value}`)
    }

    function orderName(event){
        
        event.preventDefault();
        dispatch(orderByName(event.target.value))
        setCurrentPage(1)
        setOrder(`${event.target.value}`)
    }

    function orderWeight(event){
        
        event.preventDefault();
        dispatch(orderByWeight(event.target.value)) //wehghasc
        setCurrentPage(1)
        setOrder(`${event.target.value}`)
    }
    
    return (
        <div className={s.conteiner}>
            <div>
                <ul className={s.navbar}>
                    <li><img className={s.icon} src="https://cdn-icons-png.flaticon.com/512/91/91544.png" alt="icono" /></li>
                    <li><h1>Dogos</h1></li>
                    <li><SearchBar/></li>
                    
                </ul>
            </div>
    
            <div className={s.content}>
                <div className={s.filters}>
                    {/* ordenamiento ascendente y descendente*/}
                    <div className={s.filter}>
                    <select className={s.select} defaultValue='Alphabetical order' onChange={(event) => orderName(event)}>
                        <option disabled="disabled">Alphabetical order</option>
                        <option value="asc">A-Z</option>
                        <option value="desc">Z-A</option>
                    </select>

                    </div>

                    <div className={s.filter}>
                    <select className={s.select} defaultValue='Weight order' onChange={(event) => orderWeight(event)}>
                        <option disabled>
                        Weight order
                        </option>
                        <option value="weightAsc">Heavier</option>
                        <option value="weightDesc">Lighter</option>
                        
                    </select>

                    </div>

                    <div className={s.filter}>
                    <select className={s.select} defaultValue='Filter by temper' onChange={(e) => handleFilterByTemper(e)}>
                    <option disabled="disabled" >Filter by temper</option>    
                    <option value="All">All</option>
                        {tempers && tempers.map((temp) => (
                        <option key={temp.id} value={temp.name}>
                            {temp.name}
                        </option>
                        ))}   
                    </select>

                    </div>

                    <div className={s.filter}>
                    {/* por peso */}
                    {/* Por temperaments */}
                    <select className={s.select} defaultValue='By origin' onChange={(e) => handleOrigin(e)}>
                        {/* perros creados y no creados  */}
                        <option disabled="disabled">By origin</option>
                        <option value="All">All</option>
                        <option value="Api">Existing</option>
                        <option value="Created">Created</option>
                    </select>

                    <Link to='/create'><button className={s.btn}>Create</button> </Link>
                    <button className={s.btn} onClick={(event) => handleClick(event)}> Reload Dogs </button>
                    </div> 
                    
                </div>
                
                {/* searchbar */}
                <div className={s.show}>
                        {/* Paginacion */}
                        <Paginated key={currentPage} numDogs={numDogs} dogs={dogs.length} paginado={paginado}/>
                    <div className={s.group}>
                        {curretDogs.length>0? curretDogs.map(dog => {
                        return <DogCard key={dog.id} dog={dog}/>
                        }): <div> 
                                <h1>Loading... </h1>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?20170503175831" alt="loadin" />
                            </div>
                        }
                    </div>
                </div>
    
            </div>


        </div>
    )
       

    
}
