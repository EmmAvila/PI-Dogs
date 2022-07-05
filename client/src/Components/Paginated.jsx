import React from "react";
import s from './Styles/Paginated.module.css'

export default function Paginated({numDogs, dogs, paginado}){
    let pageNumbers = []

    for(let i=1; i <= Math.ceil(dogs/numDogs); i++){
        pageNumbers.push(i)
    }

    return(
        <nav className={s.lista}>
            <ul >
                {pageNumbers && pageNumbers.map(num => {
                    // return <li><a onClick={() => paginado(num)}>{num}</a></li>
                    return <li className={s.lista} key={num}><button className={s.btn}  onClick={() => paginado(num)} >{num}</button></li>
                }) }
            </ul>
        </nav>
    )
}