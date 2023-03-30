import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getByName } from '../../redux/actions/actions';
import styles from '../SEARCH BAR/SearchBar.module.css'

function SearchBar() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const search = searchTerm.trim().toLowerCase(); 
     // Validar que se ingresó un valor corecto.
   if (!search){
    alert('Dog not Found.');
  } else if (!search.match(/^[a-zA-Z]+$/)) {
    alert('Please enter alphabetic characters only.');
    return;
 }
    dispatch(getByName(search));
  };

  return (
    <div className={styles.SearchBar}>
      <input className= {styles.SearchBar} type='text' value={searchTerm} onChange={handleInputChange}/>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;