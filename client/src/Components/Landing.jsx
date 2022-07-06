import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getDogs, getTempers } from "../Store/actions";
import s from './Styles/Landing.module.css'


export function Landing(){
    let dispatch = useDispatch()


 useEffect(() =>{
        console.log('entro')
        dispatch(getDogs())
        dispatch(getTempers())
    },[dispatch])

    return(
        <div className={s.conteiner}>
            <div className={s.tittle}>
              <h1>Henry's Dogs</h1>
              <Link to='/home'><button className={s.btn}>Start 
              </button>
              </Link>
                
            </div>
        </div>
    )
}