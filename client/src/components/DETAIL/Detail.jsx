import React, { useEffect, useState } from "react";
import { useParams, Link  } from "react-router-dom";
import axios from 'axios'
import styles from '../DETAIL/Detail.module.css';

const Detail = () => {
    const { id } = useParams();
    const [doggys, setDoggys] = useState({}); 

    useEffect(() => {
        async function fetchData() {
          try {
            const response = await axios.get(`http://localhost:3001/dogs/${id}`);
            const dog = response.data;
            if (dog.id) {
                setDoggys({
                id: dog.id,
                name: dog.name,
                weight: dog.weight,
                image: dog.image,
                height: dog.height,
                age: dog.age,
                temperament: dog.temperament,
                temperaments: dog.temperaments,
                createInDb: dog.createInDb,
              });
            } else {
              alert("Dog is not available");
            }
          } catch (err) {
            alert(err.message);
          }
        }
        fetchData();
      }, [id]);

    return (
        <div className={styles.div}>
            <div>   
                <div>
                    <Link to="/home" className={styles.TheDogApp}>
                        THE DOG APP
                    </Link>
                </div>
            </div>
            
            { Object.keys(doggys).length && typeof doggys !== 'string' ? (
                <div>
                    <div>
                        <img className={styles.imgDetail}src={doggys.image} alt={doggys.name + ' img'} /> 
                    </div>

                    <div>
                            <h1 className={styles.title}>{doggys.name}</h1>
                            <div className={styles.circle}>
                            <div><span className={styles.property}>Height: </span><p className={styles.property2}>{doggys.height} cm</p></div>
                            <div><span className={styles.property}>Weight: </span><p className={styles.property2}>{doggys.weight} kg</p></div>
                            <div><span className={styles.property}>Temperaments: </span><p className={styles.temperament}>{doggys.temperament}</p></div>
                            {doggys.age && doggys.age[0] !== ' ' ? <div><span className={styles.property}>Age: </span>
                            <p className={styles.property2}>{doggys.age}</p></div> : null}
                          
                            {/* dogs api */}
                            { console.log(doggys)}
                                {doggys.createInDb === true ?
                                Array.isArray(doggys.temperaments) && doggys.temperaments.length
                                ? (doggys.temperaments.length ? <div><span  className={styles.property}>Temperaments: </span><p>
                                    {doggys.temperaments?.map(temp => <span className={styles.property2} key={temp}><ul>{temp}, </ul></span>)}</p></div> : null)
                                : null
                                :
                                Array.isArray(doggys.temperament) && doggys.temperament.length
                                ? (doggys.temperament.length ? <div><span className={styles.property}>Temperaments: </span><p>
                                    {doggys.temperament?.map(temp => <span className={styles.property2} key={temp}><ul>{temp}, </ul></span>)}</p></div> : null)
                                : null
                            }

                        </div>
                    </div>
                </div>
                
            ) : null}

            <div >
                <div className={styles.footer}>
                        <div >
                            <p>Candela Reynoso, 2023</p>
                            <a href="https://www.linkedin.com/in/CandelaReynoso/">LINKEDIN</a>    
                        </div>
                        <div>
                         <a href="https://github.com/CandelaReynoso">
                             GITHUB
                            </a>
                        </div>
                </div>
            </div>
        </div>       
    )
}

export default Detail;