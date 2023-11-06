import axios from 'axios';
import { useState, useEffect } from 'react';

import styles from './style.module.css';

export default function MainPage()
{
    const [ variants, setVariants ] = useState([]);
    const [ mlb, setMlb ] = useState("");

    const api = axios.create({ baseURL: "https://api.mercadolibre.com/items" });

    async function getItems() {
        try
        {
            const items = await api.get(`/${mlb}`);
    
            if (items.data)
            {
                setVariants(items.data.variations);
            }
        } catch (e)
        {
            console.log("Erro")
        }
        
    }

    function show()
    {
        console.log(variants);
    }

    // useEffect(() => {
    //     const items = async () => {
    //         return await getItems();
    //     };

    //     items();
    // }, []);

    // MLB2673411634

    return (
        <>
        <div className={styles.main}>

            <div className={styles.searchBox}>
                <input type='text' name='mlb' onChange={e => setMlb(e.target.value)}/>
                <button onClick={() => getItems()}>Buscar</button>
            </div>

            <div className={styles.variations}>
                {
                    variants !=  undefined ? 
                    (
                        variants.map((item : any) => {
                            console.log(item)
                            return (
                                <div key={item.id} className={styles.variationsBox}>
                                    <p><b>Variação:</b> {item.attribute_combinations[0].value_name}</p>
                                    <p><b>Id:</b>  {item.id} </p>
                                    <p><b>Preço:</b>  {item.price} </p>
                                    
                                </div>
                            )
                        })
                    ) : false
                }

            </div>

        </div>
            
            
        </>
    )
};