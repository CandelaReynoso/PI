import React from 'react'
import { Link } from 'react-router-dom';
import image from '../../../src/fotos/dog.png'
import styles from '../LANDING/Landing.module.css'

const LandingPage = () => {
    
    return (
            <div  className={styles.landingWrapper}>
                <img className={styles.img} src={image} alt="Imagen de un perro"/> 
                
            <Link className={styles.landingButton} to="/home">
                    <button className={styles.text}>THE DOG APP</button>
                </Link>
        </div>
    );

};

export default LandingPage;
