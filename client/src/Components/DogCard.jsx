import { Link } from "react-router-dom";
import s from './Styles/DogCard.module.css'

export default function DogCard({dog}){
    let tempFromCreated
    dog.Tempers? tempFromCreated = dog.Tempers.map(tem => tem.name).join(', ') : tempFromCreated =''
    console.log('soy' ,tempFromCreated)
    
    return(
        <div className={s.conteiner}>
            <div className={s.divImg}>
            <Link to={`/detail/${dog.id}`}><img src={dog.image} alt={dog.image} className={s.img} /></Link>
            </div>
            <div className={s.info} >
                <b className={s.name}>{dog.name}</b>
                <div className={s.data}>
                    <div>
                        <b>Weight</b>
                        <p>{dog.weight_min} kg</p>
                    </div>
                    <div>
                        <b>Height</b>
                        <p>{dog.height_min} cm</p>
                    </div>

                </div>
                <div>
                    <b>Temperaments</b>
                    <p>{dog.temperament || tempFromCreated}</p>
                </div>
            </div>

            
        </div>
    )
}