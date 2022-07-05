import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getByRace } from "../Store/actions";
import s from './Styles/SearchBar.module.css'


export default function SearchBar(){
    const dispatch=useDispatch()
    const [name, setName] = useState('')

    function handleChange(event){
        event.preventDefault()
        setName(event.target.value)
        console.log(name)
    }

    function handleSubmit(event){
        console.log('hola')
        event.preventDefault()
        dispatch(getByRace(name))
        setName(name)// revisar que esto funcione o quitarlo

    }
    return(
        <div className={s.search}>
            <input className={s.input} type="text" placeholder="Buscar raza" onChange={(event) => handleChange(event)}/>
            <button className={s.btn} type="submit" onClick={(event) => handleSubmit(event)}>ir</button>
        </div>
    )
}