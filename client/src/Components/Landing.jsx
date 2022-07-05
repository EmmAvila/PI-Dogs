import React from "react";
import { Link } from "react-router-dom";
import s from './Styles/Landing.module.css'


export function Landing(){
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