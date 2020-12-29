import React, {createContext, useState} from 'react'
export const ProductoContext = createContext();


const ProductoProvider = (props) => {
    const [carrito, setCarrito] = useState([])
    return (
        <ProductoContext.Provider value={{carrito, setCarrito}}>
            {props.children}
        </ProductoContext.Provider>
    )
}

export default ProductoProvider
