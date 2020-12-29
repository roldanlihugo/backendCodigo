import React, {useState, useContext} from 'react';
// import {Link} from 'react-router-dom'
import {ProductoContext} from '../context/ProductoProvider';

const Producto = ({producto}) => {
    const {carrito, setCarrito} = useContext(ProductoContext);
    const [cantidad, setCantidad] = useState(1)
    // console.log(producto);
    const agregarProducto = ()=>{
        let nuevoProducto = {
            "id":producto._id,
            "nombre":producto.productoTitulo,
            "precio":producto.productoPrecio,
            "cantidad":cantidad
        }
        console.log(nuevoProducto);
        setCarrito([...carrito, nuevoProducto]);
        
    }
    return (
        <div className="card" style={{width: "18rem"}}>
            <img src={producto.productoImagen} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{producto.productoTitulo}</h5>
                <p className="card-text">{producto.productoDescripcion}</p>
                <p className="card-text">S/. {producto.productoPrecio}</p>
                <input type="number" onChange={e=>setCantidad(e.target.value)} value={cantidad}/>
                <button className="btn btn-primary" to="/" onClick={agregarProducto}>Añadir al carrito</button>
            </div>
        </div>
    )
}

export default Producto
