import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../CARD/Card.module.css';
import { deleteDog } from '../../redux/actions/actions';


export const handleDeleteDog = (id) => {  
    try {  
      const response = deleteDog(id); // llama a la función deleteDog() con el id del perro
      console.log(response.data); // muestra la respuesta de la API
    } catch (error) {
      console.error(error);   
    }
    console.log("Delete button clicked");
  };

const Card = ({ name,weight, image, id, temperaments, temperament, createInDb}) => {
  
  
return (
    <div className={styles.card}> 
       <Link className={styles.Link} to={`/dogs/${id}`}>
          <h3 className={styles.title}>{name}</h3>
          <div className={styles.text}>
          {createInDb &&  Array.isArray(temperaments) && temperaments.length
          ? <p>Temperaments: {temperaments.join(", ")}</p>
          : Array.isArray(temperament) && temperament.length
            ? <p>Temperaments: {temperament?.join(", ")}</p>
            : null
        }
        <p>Weight:{weight}</p> 
      
        <div>
          <img className={styles.circleImg} src={image} alt={name}/>   
        </div>      
        </div>
      </Link>
      {createInDb && (
          <button onClick={(event) => {event.preventDefault(); handleDeleteDog(id)}}>DELETE</button>
        )}
    </div>
  );
};

export default Card;





