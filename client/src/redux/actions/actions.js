import axios from 'axios';
import {GET_DOGS,GET_TEMPERAMENTS,GET_FILTER_TEMPERAMENTS,GET_BY_NAME,DELETE_DOG_DB,SORT_BY_WEIGHT, ORDER_BY_NAME,FILTERED_BY_ORIGIN,POST_BREED,DELETE_DOG,UPDATE_BREED_REQUEST,UPDATE_BREED_SUCCESS,UPDATE_BREED_FAILURE, UPDATE_DOG} from "./action-types";

export function getDogs() {
  return async function(dispatch) {
    let json = await axios.get("http://localhost:3001/dogs");
    return dispatch({
      type: GET_DOGS,
      payload: json.data
    });
  };
}


export function getTemperaments() {
  return async function (dispatch) {
      try {
          const res = await axios.get('http://localhost:3001/temps')
          dispatch({ type: GET_TEMPERAMENTS, payload: [...res.data?.map(temp => temp.name)] })
      } catch (error) {
          alert(error.message)
      }
  };
  
} 

export function FilterByTemperament(payload) {
  return{
      type: GET_FILTER_TEMPERAMENTS,
      payload
  }
};

export function getByName(name) {
  return async function (dispatch) {
      try {
          const res = await axios.get(`http://localhost:3001/dogs?name=${name}`)
          if(res.data.length === 0){
            console.log(res.data)
            return 
          }
          if(res.data.length) {
              return dispatch({ type: GET_BY_NAME, payload: res.data })
          }  
      } catch (err) {
        return  alert(`Dog not Found! ${err.message}`);
      }
  };
}


export function getById(id) {
  return async function (dispatch) {
      try {
          const res = await axios.get(`http://localhost:3001/dogs/${id}`)
          dispatch({ type: DELETE_DOG_DB, payload: res.data })
      } catch (err) {
          dispatch({ type: DELETE_DOG_DB, payload: err.response.data })
      }
  };
}


export function FilterByWeight(payload) {
  return{
    type: SORT_BY_WEIGHT,
    payload
}
 
}

export function orderByName(payload) {
  return { type: ORDER_BY_NAME, payload };
}

export const filteredByOrigin = (payload) => { 
  return {
      type: FILTERED_BY_ORIGIN,
      payload
  }
}


export const postBreed = (payload) => { //ACTION QUE CREA UNA RAZA
  return async function (dispatch){
      const response = await axios.post('http://localhost:3001/dogs',payload);
      console.log(response.data);
      dispatch({
          type: POST_BREED,
          payload: response.data
      });
      return response;
  }
}

export const deleteDog = (id) => async (dispatch) =>{
    try {
      if (!id) {
        throw new Error("Invalid ID");
      }
      const response = await axios.delete(`http://localhost:3001/dogs/delete/${id}`);
    console.log(response.data);
    dispatch({
      type: DELETE_DOG,
      payload: response.data
  });
  return response;
  } catch (error) {
    console.error(error);
  }
};

export const updateDog = (id, dogData) => async (dispatch) => {
  try { 
    const response = await axios.put(`http://localhost:3001/dogs/update/${id}`, dogData);
    console.log(response.data);
    dispatch({ type: UPDATE_DOG, payload: response.data });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

/* export const updateDog = (id,name, height, weight,age, image, temperaments) => async (dispatch) =>{

  try { 
  const data = { name, height, weight, age, image, temperaments };
  const response = await axios.put(`http://localhost:3001/dogs/update/${id}`, {data});
  console.log(response.data);
  dispatch({ type: UPDATE_DOG, payload: response.data });
  return response.data;
} catch (error){
  console.error(error);
}
} */
  


