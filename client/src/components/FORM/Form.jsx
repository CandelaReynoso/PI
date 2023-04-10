import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getTemperaments, postBreed, updateDog} from '../../redux/actions/actions';
import {Link, useHistory, useParams} from 'react-router-dom'; 
import styles from '../FORM/Form.module.css';
import image from '../../../src/fotos/FormDog.png';




function validation (input){
  let errors = {};
  if (!input.name){
    errors.name = "Breed is required"
 } else if (!input.height) {
  errors.height = "Height is required"
  if(input.height < 20 || input.height > 25) {
    errors.height = 'The height must be between "20 cm" and "70 cm"'; 
   }
  } else if (!input.weight){
    errors.weight ="Weight is required"
    if(input.weight < 1 || input.weight > 82)
    errors.weight ='The weigth must be between "1 kg" and "82 kg"'
  } else if (!input.age) {
     errors.age = 'Age is required'
     if(input.age === 0 || input.age > 20  ) 
      errors.age = 'Age should be bigger than 0 and lower than 20 year'
  } else if (!input.image){
    errors.image = 'Image is required'
   } else if (!input.temperaments){
    errors.temperaments = 'Must select at least one temperament' 
  }
  return errors
}


export default function Creator() {
    const dispatch = useDispatch();
    const history= useHistory();
    const params= useParams();
    let dogs = useSelector(state =>state.dogs)

    const [input, setInput] = useState({   
          id:"",
          name:"",
          height:"", 
          weight:"",
          age: "",
          image:"",
          createInDb:"",
          temperament:[], 
          temperaments:[]
       });
 

    useEffect(() => {
      console.log(params.id)
     if(params.id){
       setInput(dogs.find((dog) => dog.id === params.id));
       console.log(input.id);
      } 
      dispatch(getTemperaments());
    }, [dispatch]);
    

    const temperaments = useSelector(state => state.temperaments);
    //console.log(temperaments)
    //console.log(typeof (temperaments))

    
    //Estado que almacena temps seleccionados.
    const [selectedTemperaments, setSelectedTemperaments] = useState([]);
    
    const [errors, setErrors] = useState({})
    const [filter, setFilter] = useState("");

    const filteredTemperaments = temperaments?.filter((temp) =>
      temp.toLowerCase().includes(filter.toLowerCase())
    );
  

    function handleChange(e){
      setInput({
        ...input, 
        [e.target.name]: e.target.value
      });
      setErrors(validation({
        ...input,
        [e.target.name]: e.target.value
      }))  
      
    }

  function handleSelect(e) {
  const selectedTemperament = e.target.value;
  setInput(prevState => ({
    ...prevState,
    temperament: [...prevState.temperament, selectedTemperament],
    temperaments: Array.isArray(prevState.temperaments) ? [...prevState.temperaments, selectedTemperament] : [selectedTemperament]
  }));
  setSelectedTemperaments([...selectedTemperaments, selectedTemperament]);
}

function handleSubmit(e) {
  e.preventDefault();

  const errors = validation(input);

  if (Object.keys(errors).length === 0) {
    if (params.id) {
      dispatch(updateDog(input.id, input)).then((response) => {
        console.log(response);
      });
      alert('Breed updated successfully');
    } else {
      dispatch(postBreed(input)).then((response) => {
        console.log(response);
      });
      alert('Breed created successfully');
    }
    history.push('/home');
  } else {
    if (errors.name)
      alert(`You are missing: ${errors.name}`);
    else if (errors.height)
      alert(`You are missing: ${errors.height}`);
    else if (errors.weight)
      alert(`You are missing: ${errors.weight}`);
    else if (errors.age)
      alert(`You are missing: ${errors.age}`);
    else if (errors.image)
      alert(`You are missing: ${errors.image}`);
    else if (errors.temperaments)
      alert(`You are missing: ${errors.temperaments}`);
  }
}
    
    const handleRemove = (temperament) => {
      setSelectedTemperaments(
        selectedTemperaments?.filter((temp) => temp !== temperament)
      );
    };

      
    return (
         <div>
          <div className={styles.dogImage}>  
            <img  src={image} alt="Imagen de un perro"/>  
          </div>
           <form onSubmit={(e) => handleSubmit(e)}>
            <div className={styles.Form}>  
              <h1 className={styles.FormTitle}>Create your own breed!</h1>
               <div className={styles.FormText}>
               <label>Breed:</label> 
               <input 
               type="text"
               value= {input?.name}
               name="name" 
               onChange={(e) => handleChange(e)}
               />
               {errors.name && (<p>{errors.name}</p>)}
                <br></br>
                
                <label className={styles.leftAlignText}> Height:</label>
                <input
                max="25"
                min="0"
                type="text"
                value={input?.height}
                name="height"
                onChange={(e) => handleChange(e)}
                />
                {errors.height && (<p>{errors.height}</p>)}
                <br></br>
                <label> Weight:</label>
                <input
                 min="0"
                 type="text"
                 value={input?.weight}
                 name="weight"
                 onChange={(e) => handleChange(e)}
                />
                {errors.weight && (<p>{errors.weight}</p>)}
                <br></br>
                <label>Age:</label>
               <input
               min="0"
               type="number"
               value={input?.age}
               name="age"
               onChange={(e) => handleChange(e)}
               />
               {errors.age && (<p>{errors.age}</p>)}
               <br></br>
                <label>Image:</label>
                <input
                 type="text"
                 value={input?.image}
                 name="image"
                 onChange={(e) => handleChange(e)}
                />
                {errors.image && (<p>{errors.image}</p>)}
                <br></br>
                <label htmlFor="temperament">Temperament:</label>
                 {errors.temperaments && (<p>{errors.temperaments}</p>)} 
      <select id="temperaments" onChange={handleSelect}>
        <option value="">--Select--</option>
        {filteredTemperaments?.map((temp) => (
          <option  value={temp}>
            {temp}
          </option>
        ))}
      </select>
      <ul>
        {selectedTemperaments?.map((temp) => (
          <div key={temp?.id}>
            <li> {temp}{""} <button type="button" onClick={() => handleRemove(temp)}>
              x
            </button>
            </li>     
          </div>
        ))}
      </ul>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
        <div>
        <button className={styles.SaveButton} type="submit">Save</button>
        </div>
            <div>
            <Link to = "/home" className={styles.text}>
                THE DOG APP
            </Link> 
          </div>
              </div>           
              </form>     
         </div>
    );
  }

