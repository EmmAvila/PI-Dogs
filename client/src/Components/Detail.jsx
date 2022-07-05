import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getDetail } from "../Store/actions";
import s from './Styles/Detail.module.css'



export default function Detail(){
    let {id} = useParams()
    
    let dog = useSelector(state => state.detail) 
    let tempFromCreated
    dog.Tempers? tempFromCreated = dog.Tempers.map(tem => tem.name).join(', ') : tempFromCreated =''
    
    let dispatch = useDispatch()
    
    useEffect(() => {
      dispatch(getDetail(id))  
    },[dispatch,id])

    return(
        <div className={s.conteiner}>
            {Object.keys(dog).length > 0?
                <div>
                    <h1 className={s.tittle}>{dog.name}</h1>
                    <img className={s.img} src={dog.image} alt={dog.image} />
                    <div className={s.infoConteiner}>
                        <div className={s.info} >
                            <b>Weight</b>
                            <p className={s.info}>Max {dog.weight_max} kg </p>
                            <p className={s.info}>Min {dog.weight_min} kg </p>
                        </div>
                        <div>
                            <b>Height</b>
                            <p className={s.info}>Max {dog.height_max} cm </p>
                            <p className={s.info}>Min {dog.height_min} cm </p>
                        </div>
                        <div>
                            <b>Life span</b>
                            <p className={s.info}>{dog.lifeSpan}</p>
                        </div>

                    </div>
                    <div className={s.temper}>
                        <b>Temperaments</b>
                        <p className={s.info}>{dog.temperament || tempFromCreated}</p>
                    </div>

            
                </div>
                : <div >
                    <h1>Loading...</h1>
                    <img src='https://estaticos.muyinteresante.es/uploads/images/gallery/5a84260b5cafe8505a3c986b/perro-mirando-desconfiado.jpg' alt='Not found' width='400px' height='400px'/>  
                  </div> 
            }

            <Link to='/home'> <button className={s.btn}> Volver </button> </Link>
            
        </div>

    )
    
}