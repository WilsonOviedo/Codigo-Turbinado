import React, { Component} from 'react';
import { Row, Col, Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css


class TablaHoteles extends Component {

    state = {
        hoteles: []
    }

    componentDidMount (){
        this.obtenerHoteles();
    }

    obtenerHoteles = () => {
        fetch('http://localhost:3000/hoteles', {
            method: 'GET'
        })
           // El objeto JSON contiene métodos para analizar JavaScript Object Notation (JSON)
        //  y convertir valores a JSON. No puede ser llamado o construído, y aparte de 
        //  estas dos propiedades, no tiene funcionalidad interesante por sí mismo.
        .then((respuesta) => respuesta.json())
        .then((respuestaJson) => {
            console.log("Respuesta del servidor", respuestaJson);
            this.setState({
                hoteles: respuestaJson
            })
        })
    }
    confirmarEliminacion = (id) => {
        confirmAlert({
            title: 'Confirmar accion',
            message: 'Esta seguro de eliminar?.',
            buttons: [
              {
                label: 'Si',
                onClick: () => {this.eliminaHotel(id)}
              },
              {
                label: 'No',
              }
            ]
          })
    }
    eliminaHotel = (id) => {
        console.log('Se elimina un hotel');
        fetch(`http://localhost:3000/hoteles/${id}`, {
            method: 'DELETE'
        })
        .then(() => {
            this.obtenerHoteles();
        })
    }
    render(){
        return(
            <div>
                <Row>
                    <Col md={12} sm={12}>
                        <h3>Lista de Hoteles</h3>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col md={12} sm={12}>
                        <Table  striped bordered condensed hover responsive >
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Direccion</th>
                                    <th>Latitud</th>
                                    <th>Longitud</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.hoteles.map((hotel, index) => {
                                        let indice = index + 1
                                        return (
                                            <tr key={indice}>
                                                <td>{indice}</td>
                                                <td>{hotel.nombre}</td>
                                                <td>{hotel.direccion}</td>
                                                <td>{hotel.latitud}</td>
                                                <td>{hotel.longitud}</td>
                                                <td>
                                                    <LinkContainer to={`/hoteles/editar/${hotel.id}`}><a>Editar</a></LinkContainer>
                                                    {' | '}
                                                    <a onClick={() => this.confirmarEliminacion(hotel.id)}>Borrar</a>
                                                </td>
                                               
                                            </tr>
                                        )
                                    })
                                }
                                {/* <tr>
                                    <td>1</td>
                                    <td>Los Alpes</td>
                                    <td>Ciudad del Este</td>
                                    <td>12312231 12312312</td>
                                    <td><a>Borrar</a></td>
                                </tr> */}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col md={12} sm={12}>
                        <LinkContainer to="/hoteles/nuevo"><Button bsStyle="primary">Nuevo</Button></LinkContainer>
                    </Col>
                </Row>
                
            </div>
        )
    }
}

export default TablaHoteles;