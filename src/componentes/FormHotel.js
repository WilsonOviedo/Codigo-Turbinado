import React, { Component } from 'react';
import {
    Row,
    Col,
    FormGroup,
    FormControl,
    ControlLabel,
    Button,
    ButtonToolbar
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Redirect } from 'react-router-dom';

class FormHotel extends Component {
    state = {
        nombre: '',
        direccion: '',
        latitud: '',
        longitud: '',
        redirect: false
    }
    componentDidMount = () => {
        console.log("Objeto match",this.props.match);
        console.log("Objeto history",this.props.history);
        if(this.props.match.params.id) {
            //Recuperamos los datos del hotel
            fetch(`http://localhost:3000/hoteles/${this.props.match.params.id}`)
            .then(result => result.json())
            .then(resultJson => {
                // console.log(resultJson);
                this.setState({
                    nombre: resultJson.nombre,
                    direccion: resultJson.direccion,
                    latitud: resultJson.latitud,
                    longitud: resultJson.longitud
                })
            })
        }
        
    }
    guardarHotel = () => {
        // console.log('Datos del Hotel: ', this.state)
        let valores = {
            nombre: this.state.nombre,
            direccion: this.state.direccion,
            latitud: this.state.latitud,
            longitud: this.state.longitud
        }
       if(this.props.match.params.id) {
            fetch(`http://localhost:3000/hoteles/${this.props.match.params.id}`, {
                method: 'PUT',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(valores)
            })
            .then(result => result.json())
            .then((resultJson) => {
                console.log('Datos insertador: ' ,resultJson)
                this.setState({
                    redirect: true
                })
            })
            .catch((error) => {
                console.log(error);
            })

       } else {
            fetch('http://localhost:3000/hoteles', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(valores)
            }).then(() => {
                this.props.history.push(`/hoteles/lista`);
            })
            .catch((error) => {
                console.log(error);
            })
            
       }
    }

    render() {
        if(this.state.redirect){
            return <Redirect to='/hoteles/lista'/>
        } else {
            return(
                <div>
                    <Row>
                        <Col md={8} xs={12}>
                            <h3>Nuevo Hotel</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={8} xs={12}>
                            <form>
                                <FormGroup>
                                    <ControlLabel>Nombre</ControlLabel>
                                    <FormControl type="text" value={this.state.nombre} onChange={(event) => this.setState({nombre: event.target.value})}/>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Direccion</ControlLabel>
                                     <FormControl type="text" value={this.state.direccion} onChange={(event) => this.setState({direccion: event.target.value})}/>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Latitud</ControlLabel>
                                     <FormControl type="text" value={this.state.latitud} onChange={(event) => this.setState({latitud: event.target.value})}/>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Logitud</ControlLabel>
                                     <FormControl type="text" value={this.state.longitud} onChange={(event) => this.setState({longitud: event.target.value})}/>
                                </FormGroup>
                            </form>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={8} xs={12}>
                            <ButtonToolbar>
                                <Button bsStyle="primary" onClick={() => this.guardarHotel()}>Guardar</Button>
                                <LinkContainer to="/hoteles/lista"><Button bsStyle="danger">Volver</Button></LinkContainer>
                            </ButtonToolbar>
                           
                        </Col>
                    </Row>
                </div>
            )
        }
    }
}

export default FormHotel;