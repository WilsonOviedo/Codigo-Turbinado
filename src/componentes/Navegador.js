import React, { Component } from 'react';
import {
    Row,
    Col,
    Nav,
    Navbar,
    NavItem
} from 'react-bootstrap';

import { LinkContainer } from 'react-router-bootstrap';

class Navegador extends Component {
    render() {
        return(
            <Row>
                <Col lg={12}>
                    <Navbar collapseOnSelect fluid>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <a href="#brand">React-Bootstrap</a>
                            </Navbar.Brand>
                             <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>
                             <Nav>
                                <LinkContainer exact to="/"><NavItem>Dashboard</NavItem></LinkContainer>
                                <LinkContainer to="/hoteles/lista"><NavItem>Hoteles</NavItem></LinkContainer>
                             </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Col>
            </Row>
        )
    }
}
export default Navegador;