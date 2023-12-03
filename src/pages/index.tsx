import axios from 'axios';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify'

import styles from './style.module.css';
import 'react-toastify/dist/ReactToastify.css';

export default function MainPage()
{
    const [ variants, setVariants ] = useState([]);
    const [ mlb, setMlb ] = useState("");
    const [ adTitle, setAdTitle ] = useState("");

    const api = axios.create({ baseURL: "https://api.mercadolibre.com/items" });

    async function getItems() {
        try
        {
            const items = await api.get(`/${mlb}`);
    
            if (items.data)
            {
                setVariants(items.data.variations);
                setAdTitle(items.data.title)
            }
        } catch (e)
        {
            console.log("Erro")
        }
        
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
                    <button type="submit"  onTouchStart={() => getItems()}>Buscar</button>
                </div>

                {
                    adTitle != "" ? 
                    (
                        <div className={styles.title}>
                            <h3>{ adTitle }</h3>
                            <h3>{ mlb }</h3>
                        </div>
                    ) 
                    : 
                    (
                        <></>
                    )
                }

                <div className={styles.variations}>
                    {
                        variants !=  undefined ? 
                        (
                            variants.map((item : any) => {
                                console.log(item)
                                return (
                                    <div key={item.id} className={styles.variationsBox}>
                                        <p><b>Variação:</b> {item.attribute_combinations[0].value_name}</p>
                                        <p>
                                            <b>Id:</b>  {item.id} 
                                            <img src="copy.png" onClick={e => {
                                                navigator.clipboard.writeText(item.id);
                                                toast.success('Texto Copiado!', {
                                                    position: "bottom-center",
                                                    autoClose: 500,
                                                    hideProgressBar: false,
                                                    closeOnClick: true,
                                                    pauseOnHover: false,
                                                    draggable: true,
                                                    progress: undefined,
                                                    theme: "light",
                                                });
                                            }}
                                            /> 
                                        </p>
                                        <p><b>Preço:</b>  {item.price} </p>
                                        
                                    </div>
                                )
                            })
                        ) : false
                    }

                </div>

            </div>
                
            <ToastContainer />
        </>
    )
};