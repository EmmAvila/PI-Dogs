import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTempers, postDog } from "../Store/actions";
import s from './Styles/CreateDog.module.css'

function validate(input) {
    let errors = {};
    console.log('entro', input.temperament)

    if(!/^[A-Za-z0-9\s]+$/g.test(input.name)) errors.name = '❌ Only letter or number allowed';
   
    if(!/^[1-9]\d*(\.\d+)?$/.test(input.height_min)) errors.height_min = '❌ Only positive numbers allowed'
    if(!/^[1-9]\d*(\.\d+)?$/.test(input.height_max)) errors.height_max = '❌ Only positive numbers allowed'
    if(parseInt(input.height_min) > parseInt(input.height_max))errors.height_min = "❌ Height (min) can't be greater than Height (max)"
    
    if(!/^[1-9]\d*(\.\d+)?$/.test(input.weight_min)) errors.weight_min = '❌ Only positive numbers allowed'
    if(!/^[1-9]\d*(\.\d+)?$/.test(input.weight_max)) errors.weight_max = '❌ Only positive numbers allowed'
    if(parseInt(input.weight_max) < parseInt(input.weight_min))errors.weight_min = "❌ Weight (min) can't be greater than Weight (max)"

    if(!/^[1-9]\d*(\.\d+)?$/.test(input.lifeSpan)) errors.lifeSpan = '❌ Only positive numbers allowed'

    if( input.image && !/[a-z0-9-.]+\.[a-z]{2,4}\/?([^\s<>#%",{}\\|^[\]`]+)?$/.test(input.image)) errors.image='❌ Valid URL required or left empty'
    
    if(input.temperament.length === 0) errors.temperament = '❌ Must have at least 1 temper'

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
        let exist = input.temperament.find(temp => temp === event.target.value)
        if(!exist){
            setInput({
                ...input,
                temperament: [...input.temperament, event.target.value]
            })
    
            setError(validate({
                ...input,
                temperament: [...input.temperament, event.target.value]
            }))

        }else{
            alert('El temperamento ya esta elegido')
        }

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
            alert('All fields with (*) must be filled')
        }
    }

    function handleDelete(el){
        console.log(el.target.value)
        let filtrado = input.temperament.filter(temp => temp !== el.target.value)
        setError(validate({
            ...input,
            temperament: filtrado
        }))
        setInput({
            ...input,
            temperament: filtrado
        })
    }
   
    return (
        <div className={s.conteiner}>
            <div >
              <h1 className={s.tittle}>Crea tu raza!!</h1>
              
            </div>

            <div className={s.formConteiner}>
              <form className={s.form} onSubmit={event => handleSubmit(event)}>
                    <h2>* Name</h2>
                <div className={s.fields}>
                    <br />
                    <input className={s.input} type="text" value={input.name} name='name' onChange={event =>handleChange(event)} 
                    placeholder="Enter a name"/>
                    {error.name? <p>  {error.name}</p> : null}
                </div>
                    <h2>* Weight</h2>
                <div className={s.fields}>
                    <div>
                    <label htmlFor="">Weight (min) </label>
                    <br />
                    <input className={s.input} type="text" value={input.weight_min} name='weight_min' onChange={event =>handleChange(event)}
                    placeholder="Enter a number"/>
                    <br />
                    {error.weight_min? <p>  {error.weight_min}</p> : null}
                    <label  htmlFor="">Weight (max)</label>
                    <br />
                    <input className={s.input} type="text" value={input.weight_max} name='weight_max' onChange={event =>handleChange(event)}
                    placeholder="Enter a number"/>
                    <br />
                    {error.weight_max? <p>  {error.weight_max}</p> : null}
                    </div>
                    {/* <div>

                    {error.weight_min? <p>  {error.weight_min}</p> : null}
                    {error.weight_max? <p>  {error.weight_max}</p> : null}
                    </div> */}
                </div>
                    <h2>* Height</h2>
                <div className={s.fields}>
                    <div>
                    <label className={s.input} htmlFor="">Height (min) </label>
                    <br />
                    <input className={s.input} type="text" value={input.height_min} name='height_min' onChange={event =>handleChange(event)}
                    placeholder="Enter a number"/>
                    <br />
                    {error.height_min? <p>  {error.height_min}</p> : null}
                    <label htmlFor="">Height (max)</label>
                    <br />
                    <input className={s.input} type="text" value={input.height_max} name='height_max' onChange={event =>handleChange(event)}
                    placeholder="Enter a number"/>
                    <br />
                    {error.height_max? <p>  {error.height_max}</p> : null}

                    </div>

                </div>
                    <h2>* LifeSpan</h2>
                <div className={s.fields}>
                    <label  htmlFor="">LifeSpan</label>
                    <br />
                    <input className={s.input} type="text" value={input.lifeSpan} name='lifeSpan' onChange={event =>handleChange(event)}
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
                    <h2>* Temperaments</h2>
                <select className={s.selectTemp}  name='temperament' onChange={event => handleSelect(event)}>
                   
                    {temperaments && temperaments.map((temp) => (
                    <option key={temp.id} value={temp.name}>
                        {temp.name}
                    </option>
                    ))} 
                </select>
                
                {/* {input.temperament.map(temp => {
                    
                      return  <><span>{temp}</span>
                                <button>x</button>
                      </>
                            
                    
                })} */}


                {error.temperament? <span>  {error.temperament}</span> : null}
                <div className={s.buttons}>
                {Object.keys(error).length > 0? null
                :<button className={s.btn} type="submit">Create</button> }
                <Link to= '/home'><button className={s.btn} >Home</button></Link>
                

                </div>
            
                
              </form>
              <ul className={s.temp}>
                    {input.temperament.map(temp =>{
                     return <li key={temp}>
                        <button className={s.delete} value={temp} onClick={(el) => handleDelete(el)}>x</button>
                        <span>{temp}, </span>
                        </li> 
                    
                    })}
                    
                </ul>
            </div>

        </div>
    )
}
