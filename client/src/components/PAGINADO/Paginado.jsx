import React from "react";
import styles from '../PAGINADO/Paginado.module.css'


function Paginado ({dogsPerPage, dogs, paginado}){ // declaro mi paginado, traigo las props del otro componente
  const pageNumber = []

  for (let i = 0; i <= Math.floor(dogs/dogsPerPage); i++) {
    pageNumber.push(i+1);
  }
  return (
    <nav className={styles.nav}>
        <div className={styles.paginado}>
           {
           pageNumber?.map(number => (
            <div className={styles.number} key={number}>
            <button type="button" onClick={() => paginado(number)}>{number}</button>   
          </div>
           ))
}
        </div>
    </nav>
  )
}
export default Paginado;