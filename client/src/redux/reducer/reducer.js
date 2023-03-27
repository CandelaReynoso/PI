// estado inicial de nuestro reducer.
// acá traigo la lista de las razas, los temperamentos, y los detalles (si se pidieron)
// dogsCopy es una copia de dogs. sobre esta se hacen los filtros (para evitar problemas con array ya filtrado)


const initialState = {
    dogs: [],
    details: [],
    dogsCopy: [],
    temperaments: [],
    searchTerm: '',
};

function rootReducer(state = initialState, action) {
    switch(action.type) {
        case "GET_DOGS":
            return {
                ...state,
                dogs: action.payload,
                dogsCopy: action.payload
            }

        case "GET_TEMPERAMENTS":
        //const filteredTemp = action.payload.filter((temp) => temp.name !== ""); //eliminar razas con strings vacios
                return {
                  ...state,
                  temperaments: action.payload
                };       
        //filtrar una lista de perros según un temperamento determinado        
        case "GET_FILTER_TEMPERAMENTS":
           // Se asigna la lista completa de perros al arreglo 'allDogs'
            const allDogs= state.dogsCopy

            //El arreglo filterDog se filtra de acuerdo al valor del payload recibido en la acción. 
            //Si el value es "all", se devuelve la lista completa de perros allDogs, de lo contrario,
            //se devuelve un arreglo filtrado por el temperamento recibido en la action.
            const filterDog = (action.payload === 'All') ? allDogs : allDogs.filter(e => e.temperament?.includes(action.payload));
            
            //Se recorre la lista completa de perros allDogs 
            //y se agrega al arreglo filterDB cada uno de los temperamentos 
            //que coincida con el valor del payload recibido en la acción
            const filterDB = [];
            allDogs.forEach(e => {
                if(typeof e.id === 'string'){
                    e.temperament?.forEach(t => {
                        if(t === action.payload) filterDB.push(t);
                    })
               }
            })
            //Finalmente, se retorna un nuevo objeto de estado,
            //en el que se actualiza el arreglo dogs concatenando los arreglos filterDog y filterDB.
                return {
                      ...state,
                      dogs: filterDog.concat(filterDB)
                    };     
                    
        case 'GET_BY_NAME':
                return {
                ...state,
                dogs: action.payload
             }
        
        
        case "SEARCH_BREED":
                return {
                ...state,
                searchTerm: action.payload
             };

        case "GET_BY_ID":
                return {
                    ...state,
                    details: action.payload
                }
        case  "SORT_BY_WEIGHT":
            if (state.dogs === 'Breed not found :(') return {...state}
            const pesoOrdenado =
            (action.payload === "min")
                ? state.dogs.sort((a, b) => {
                    if (a.weight.includes('NaN')) {
                    return 1000;
                    } else {
                        if (parseInt(a.weight.split(' - ')[0]) > parseInt(b.weight.split(' - ')[0])) return 1;
                        if (parseInt(a.weight.split(' - ')[0]) < parseInt(b.weight.split(' - ')[0])) return -1;
                        return 0;
                    }
                })

                : state.dogs.sort((a, b) => {
                    if (a.weight.includes('NaN')) {
                    return 1000;
                    } else {
                        if (parseInt(a.weight.split(' - ')[0]) > parseInt(b.weight.split(' - ')[0])) return -1;
                        if (parseInt(a.weight.split(' - ')[0]) < parseInt(b.weight.split(' - ')[0])) return 1;
                        return 0;
                    }
                });
            
            return {
                ...state,
                dogs: pesoOrdenado
            };

            case 'ORDER_BY_NAME':
                let sortedArr = action.payload === 'asc' ?
                    state.dogs.sort(function (a, b) {
                        if(a.name > b.name){
                            return 1;
                        }
                        if(b.name > a.name){
                            return -1;
                        }
                        return 0;
                    }) :
                    state.dogs.sort(function (a,b) {
                        if(a.name >b.name) {
                            return -1;
                        }
                        if(b.name > a.name) {
                            return 1;
                        }
                    })
                    return {
                        ...state,
                        dogs: sortedArr
                    };

            
                        case "FILTERED_BY_ORIGIN":
                            const allDoggys1 = state.dogsCopy;
                            const filteredDogs = allDoggys1.filter((el) => action.payload === 'created' ? el.createInDb : !el.createInDb);
                            return {
                                ...state,
                                dogs: filteredDogs
                            };
                        case "POST_BREED":
                                return {
                                  ...state,
                                  dogs: [...state.dogs, action.payload],
                                };
                        
                       
                              
            
                    
                      default:
                      return state;
    }
}
export default rootReducer;