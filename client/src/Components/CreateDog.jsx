import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTempers, postDog } from "../Store/actions";
import s from './Styles/CreateDog.module.css'

function validate(input) {
    let errors = {};

    if(!/^[A-Za-z0-9\s]+$/g.test(input.name)) errors.name = 'Only letter or number allowed';
   
    if(!/^[1-9]\d*(\.\d+)?$/.test(input.height_min)) errors.height_min = 'Only numbers allowed'
    if(!/^[1-9]\d*(\.\d+)?$/.test(input.height_max)) errors.height_max = 'Only numbers allowed'
    if(parseInt(input.height_min) > parseInt(input.height_max))errors.height_min = "Height (min) can't be greater than Height (max)"
    
    if(!/^[1-9]\d*(\.\d+)?$/.test(input.weight_min)) errors.weight_min = 'Only numbers allowed'
    if(!/^[1-9]\d*(\.\d+)?$/.test(input.weight_max)) errors.weight_max = 'Only numbers allowed'
    if(parseInt(input.weight_max) < parseInt(input.weight_min))errors.weight_min = "Weight (min) can't be greater than Weight (max)"

    if(!/^[1-9]\d*(\.\d+)?$/.test(input.lifeSpan)) errors.lifeSpan = 'Only numbers allowed'

    if( input.image && !/[a-z0-9-.]+\.[a-z]{2,4}\/?([^\s<>#%",{}\\|^[\]`]+)?$/.test(input.image)) errors.image='Valid URL required or left empty'
    
    if(input.temperament.length === 0) errors.temperament = 'Must have at least 1 temper'

  return errors
}

export default function CreateDog(){
    let dispatch = useDispatch()
    let temperaments = useSelector((state) => state.temperaments) 
    let [error, setError] = useState('')

    let [input, setInput] = useState({
        name: '',
        weight_min: '',
        weight_max: '',
        height_min: '',
        height_max: '',
        lifeSpan: '',
        image: '',
	    temperament: []
    })

    useEffect(() =>{
        dispatch(getTempers())
    },[dispatch])

    function handleChange(event){
        
        setInput(previus => {
            return {
                ...previus,[event.target.name]: event.target.value
            }
        }) 
        
        setError(validate({
            ...input, [event.target.name]: event.target.value
        }))
    }

    function handleSelect(event){
      
        setInput({
            ...input,
            temperament: [...input.temperament, event.target.value]
        })

        setError(validate({
            ...input,
            temperament: [...input.temperament, event.target.value]
        }))
    }

    function handleSubmit(event){
        event.preventDefault()
        if(input.name){
            dispatch(postDog(input))
            alert('personaje creado')
            setInput({
                name: '',
                weight_min: '',
                weight_max: '',
                height_min: '',
                height_max: '',
                lifeSpan: '',
                image: '',
                temperament: []
            })

        }else{
            alert('There are request fields unfilled')
        }
    }
   
    return (
        <div className={s.conteiner}>
            <div className={s.tittle}>
              <h1 className={s.tittle}>Crea tu raza!!</h1>
              
            </div>

            <div className={s.formConteiner}>
              <form className={s.form} onSubmit={event => handleSubmit(event)}>
                <div className={s.name}>
                    <h2>Name</h2>
                    <br />
                    <input className={s.input} type="text" value={input.name} name='name' onChange={event =>handleChange(event)} 
                    placeholder="Enter a name"/>
                    {error.name? <p>  {error.name}</p> : null}
                </div>
                    <h2>Weight</h2>
                <div className={s.fields}>
                    <div>
                    <label htmlFor="">Weight (min) </label>
                    <br />
                    <input className={s.input} type="number" value={input.weight_min} name='weight_min' onChange={event =>handleChange(event)}
                    placeholder="Enter a number"/>
                    <br />
                    {error.weight_min? <p>  {error.weight_min}</p> : null}
                    <label  htmlFor="">Weight (max)</label>
                    <br />
                    <input className={s.input} type="number" value={input.weight_max} name='weight_max' onChange={event =>handleChange(event)}
                    placeholder="Enter a number"/>
                    <br />
                    {error.weight_max? <p>  {error.weight_max}</p> : null}
                    </div>
                    {/* <div>

                    {error.weight_min? <p>  {error.weight_min}</p> : null}
                    {error.weight_max? <p>  {error.weight_max}</p> : null}
                    </div> */}
                </div>
                    <h2>Height</h2>
                <div className={s.fields}>
                    <div>
                    <label className={s.input} htmlFor="">Height (min) </label>
                    <br />
                    <input className={s.input} type="number" value={input.height_min} name='height_min' onChange={event =>handleChange(event)}
                    placeholder="Enter a number"/>
                    <br />
                    {error.height_min? <p>  {error.height_min}</p> : null}
                    <label htmlFor="">Height (max)</label>
                    <br />
                    <input className={s.input} type="number" value={input.height_max} name='height_max' onChange={event =>handleChange(event)}
                    placeholder="Enter a number"/>
                    <br />
                    {error.height_max? <p>  {error.height_max}</p> : null}

                    </div>

                </div>
                    <h2>LifeSpan</h2>
                <div className={s.fields}>
                    <label  htmlFor="">LifeSpan</label>
                    <br />
                    <input className={s.input} type="number" value={input.lifeSpan} name='lifeSpan' onChange={event =>handleChange(event)}
                    placeholder="Enter a number"/>
                    {error.lifeSpan? <p>  {error.lifeSpan}</p> : null}
                </div>
                    <h2>Image</h2>
                <div className={s.fields}>
                    <label className={s.input} htmlFor="">Image</label>
                    <br />
                    <input className={s.input} type="text" value={input.image} name='image' onChange={event =>handleChange(event)}
                    placeholder="Enter a URL"/>
                    {error.image? <p>  {error.image}</p> : null}
                </div>

                <select className={s.select}  name='temperament' onChange={event => handleSelect(event)}>
                    {/* <option value="adorable" key='555555'>adorable</option>
                    <option value="adorable" key='555554'>abominable</option> */}
                    {temperaments && temperaments.map((temp) => (
                    <option key={temp.id} value={temp.name}>
                        {temp.name}
                    </option>
                    ))} 
                </select>
                <ul>
                    <li>{input.temperament.map(temp => `${temp}, `)}</li>
                </ul>
                {error.temperament? <span>  {error.temperament}</span> : null}
                <div className={s.buttons}>
                {Object.keys(error).length > 0? 
                <Link to= '/home'><button className={s.btn} >Volver a Pagina Principal</button></Link>
                :<button className={s.btn} type="submit">Crear</button> }
                

                </div>
            
                
              </form>
            </div>

        </div>
    )
}
