import axios from 'axios';
import {GET_DOGS,GET_TEMPERAMENTS,GET_FILTER_TEMPERAMENTS,GET_BY_NAME,GET_BY_ID,SORT_BY_WEIGHT, ORDER_BY_NAME,FILTERED_BY_ORIGIN,POST_BREED} from "./action-types";

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
          dispatch({ type: GET_BY_ID, payload: res.data })
      } catch (err) {
          dispatch({ type: GET_BY_ID, payload: err.response.data })
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
      const response = await axios.post("http://localhost:3001/dogs", payload);
      console.log(response.data);
      dispatch({
          type: POST_BREED,
          payload: response.data
      });
      return response;
  }
}
