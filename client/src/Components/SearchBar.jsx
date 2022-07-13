import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getByRace } from "../Store/actions";
import s from './Styles/SearchBar.module.css'

function validate(input) {
    let errors = {};
    console.log('entro', input)

    if(!/^[A-Za-z0-9\s]+$/g.test(input)) errors.name = '❌ Only letter or number allowed';

  return errors
}


export default function SearchBar({paginado}){
    const dispatch=useDispatch()
    const [name, setName] = useState('')
    let [error, setError] = useState('')
    console.log('soy name', name)

    function handleChange(event){
        // event.preventDefault()
        setName(event.target.value)
        setError(validate(event.target.value))
        console.log(error)
    }

    function handleSubmit(event){
        console.log('hola')
        // event.preventDefault()
        dispatch(getByRace(name))
        setName('')
        paginado(1)

    }
    return(
        <div className={s.search}>
            <input className={s.input} value= {name} type="text" placeholder="Buscar raza" onChange={(event) => handleChange(event)}/>
            {/* <button className={s.btn} type="submit" onClick={(event) => handleSubmit(event)}>ir</button> */}
            {error.name? <p>  {error.name}</p> : <button className={s.btn} type="submit" onClick={(event) => handleSubmit(event)}>ir</button>}
        </div>
    )
}