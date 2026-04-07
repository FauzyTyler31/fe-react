import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import Swal from "sweetalert2";

function NavbarComponent(){
    return(
        <Navbar bg="dark" variant='dark' expand="lg">
    <Container>
        <Navbar.Brand href="#home">Belajar React</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
            <Nav.Link href="#home">Dashboard</Nav.Link>
            <Nav.Link href="#link">User</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Artha</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.2">Log Out</NavDropdown.Item>
            </NavDropdown>
        </Nav>
        </Navbar.Collapse>
    </Container>
    </Navbar>
    )
}

export default NavbarComponent