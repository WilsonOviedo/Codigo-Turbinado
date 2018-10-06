import React, { Component } from 'react';

//Importamos componentes de Bootstrap 3
import {
    Grid, 
    Row, 
    Col
} from 'react-bootstrap';

//Importamos los componentes necesarios para la navegacion
import { BrowserRouter as Router, Route} from 'react-router-dom';

//Importamos nuestros componentes
import Navegador from './componentes/Navegador';
import Dashboard from './componentes/Dashboard';
import FormHotel from './componentes/FormHotel';
import TablaHoteles from './componentes/TablaHoteles';

class App extends Component {
    render() {
        return(
           <Router>
                <div>
                    <Navegador />
                    <Grid>
                        <Row>
                            <Col md={12}>
                                <Route exact path='/' component={ Dashboard }/>
                                <Route path='/hoteles/lista' component={ TablaHoteles }/>
                                <Route path='/hoteles/nuevo' component={ FormHotel }/>
                                <Route path='/hoteles/editar/:id' component={FormHotel} />
                            </Col>
                        </Row>
                    </Grid>
                </div>
           </Router>
        )
    }
}
export default App;