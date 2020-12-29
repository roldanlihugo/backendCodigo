import React, {useEffect, useState, useContext} from 'react'
import Producto from './Producto'
import {devolverProductos} from '../services/productoservice';
import {ProductoContext} from '../context/ProductoProvider'
const Productos = () => {
    const {carrito} = useContext(ProductoContext);
    const [productos, setProductos] = useState([]);
    useEffect(() => {
        async function traerProductos(){
            let productos = await devolverProductos();
            // console.log(productos);
            setProductos(productos.content)
        }
        traerProductos();
    }, [])
    const realizarPago = ()=>{
        console.log(carrito);

    }
    return (
        <div className="container-fluid">
            <div className="row">
            {
                productos.map(producto=>(
                    <Producto key={producto._id} producto={producto}/>
                ))
            }
            <button onClick={realizarPago}>Pagar</button>
            </div>
        </div>
    )
}

export default Productos
