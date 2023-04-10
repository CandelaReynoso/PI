import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../CARD/Card.module.css';
import { deleteDog } from '../../redux/actions/actions';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';


const Card = ({id, name,weight, image, temperaments, temperament, createInDb}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const dispatch = useDispatch({});

  useEffect(() => {
    if (isDeleting) {
      console.log('Deleting dog...');
      setIsDeleting(false);
      setIsDeleted(false);
    }
  }, [dispatch]);

  const handleDeleteDog = async (id) => {
    try { 
      setIsDeleting(true);
      setIsDeleted(true);
     await dispatch(deleteDog(id.id));
     window.location.reload(); // recargar la página
    } catch (error) {
      console.error(error);
    }
  }


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
          <button className={styles.ButtonDelete} onClick={() => handleDeleteDog({id})}>DELETE</button>
        )}
        {isDeleted && (
          <p>Dog was deleted succesfully!</p>
        )}    
    </div>
  );
};

export default Card;





