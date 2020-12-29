import React from 'react'
import ProductoProvider from './context/ProductoProvider';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Productos from './components/Productos';
import Pago from './components/Pago';
const App = () => {
    return (
        <ProductoProvider>
            <Router>
                <Switch>
                    <Route path="/" exact component={Productos}/>
                    <Route path="/pagar" component={Pago}/>
                </Switch>
            </Router>
        </ProductoProvider>
    )
}

export default App
