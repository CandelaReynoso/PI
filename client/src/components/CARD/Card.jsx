import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../CARD/Card.module.css'



const Card = ({ name,weight, image, id, temperaments, temperament, createInDb }) => {
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
        <div>
        </div>
      </Link>
    </div>
  );
};

export default Card;



//probando commits
