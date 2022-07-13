import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDogs, getTempers } from "../Store/actions";
import s from './Styles/Landing.module.css'


export function Landing(){
let dogs = useSelector(state => state.dogs) //conectamos con el store a travez de useSelctor
    let tempers = useSelector(state => state.temperaments)
let dispatch = useDispatch()


 useEffect(() =>{
        console.log('entro')
        dispatch(getDogs())
        dispatch(getTempers())
    },[])



    return(
        <div className={s.conteiner}>
            {dogs.length<1 || tempers.length<1? null 
            :
            <div className={s.tittle}>
              <h1>Henry's Dogs</h1>
              <Link to='/home'><button className={s.btn}>Start 
              </button>
              </Link>
                
            </div>
            } 
        </div>
    )
}