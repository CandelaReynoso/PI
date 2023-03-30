import React, {useState,  useEffect } from "react";
import { useDispatch , useSelector} from "react-redux";
import { getDogs , getTemperaments, FilterByTemperament,FilterByWeight,orderByName,filteredByOrigin} from "../../redux/actions/actions";
import { Link } from "react-router-dom";
import Card from "../CARD/Card";
import Paginado from "../PAGINADO/Paginado";
import SearchBar from '../SEARCH BAR/SearchBar';
import styles from '../HOME/Home.module.css'





function Home() {
  const dispatch = useDispatch();
  //valores del estado local de redux que necesito:
  const dogs = useSelector(state => state.dogs);
  const temperamentsState = useSelector(state => state.temperaments);
  const [orden, setOrden] = useState('');


  //PAGINADO:
  const [currentPage, setCurrentPage]= useState(1) //mi pagina actual que arraca en 1
  const [dogsPerPage, setDogsPerPage]= useState(8) // Mis perros por pagina que son 8
 
  const indexOfLastDog= currentPage * dogsPerPage;
  const indexOfFirstDog= indexOfLastDog - dogsPerPage;
  const currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog);  //const que guarda todos los perros que voy a tener por pagina.

  
  const paginado = (pageNumber) =>{  
   setCurrentPage(pageNumber)
  }
  

useEffect(() => {
  //acciones a depachar luego de montar el componente
  dispatch(getDogs());
  dispatch(getTemperaments());
}, [dispatch]);

/*   function handleClick(event) {
    event.preventDefault();
    dispatch(getDogs());
  }  */
  
  const handleFilterByTemperament = (e) => {
    e.preventDefault();    
    dispatch(FilterByTemperament(e.target.value));
  };

  const handleFilterByWeight = (e) => {
    e.preventDefault();    
    dispatch(FilterByWeight(e.target.value));
    setCurrentPage(1);
    setOrden(`'Ordenado' ${e.target.value}`)
  };
  
  const handleFilterByBreed = (e) => {
    e.preventDefault();    
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`'Ordenado' ${e.target.value}`)
  };

  function handleFilteredByOrigin(e){ 
    dispatch(filteredByOrigin(e.target.value))
  }



  return (
    <div className={styles.div}>
      <Link to="/" className={styles.LinkHomeButton}> 
      <p className={styles.text}>WE ♥️ DOGS!</p>
      </Link>  
      <Link  className={styles.landingButton2} to="/">
      </Link>
      <br></br>
      <br></br>         
      <SearchBar/>
        <div>
        <Link to="/form" className={styles.ButtonCreate}>
        Create
        </Link> 
        </div>
       
  
      <br></br>
      <div>
        <div  className={styles.filterbar} >
        <select onChange={(event) => handleFilterByBreed(event)} >
          <option value="asc">Ascending by Breed</option>
          <option value="desc">Descending by Breed</option>
        </select>
        <select onChange={(event) => handleFilterByWeight(event)}>
          <option value="max">Max-Min weight</option>
          <option value="min">Min-Max weight</option>
        </select>
         
        <select onChange={event => handleFilteredByOrigin(event)}>
          <option value="all">All dogs</option>
          <option value="created">Created</option>
          <option value="api">Existent</option>
        </select>

        <select  onChange={(event) => handleFilterByTemperament(event)}>
          <option value ='All'>All Temperaments</option>
          {temperamentsState?.map(t => (
                <option key={t} value={t}>
                  {t}
                </option>
                ))}
        </select>
        </div>
        <div style={{marginBottom: '50px', marginTop: '50px' }}>
        
         <Paginado 
        dogsPerPage={dogsPerPage}
        dogs={dogs.length}
        paginado={paginado}
        />  
        
        </div>
        <>
        <br/>
        <h3 className={styles.currentPage}>Page: {currentPage} </h3>
        </> 
        
        {currentDogs?.map((dog) => {
          return (       
            <Card
              key={dog.id}
              id={dog.id}
              name={dog.name}
              image={dog.image}
              weight={dog.weight}
              temperaments={dog.temperaments}
              temperament={dog.temperament}
              createInDb = {dog.createInDb}
            /> 
            
          );
        })}
        
      </div>
    </div>
  );
 }

export default Home;