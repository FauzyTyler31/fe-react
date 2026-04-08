import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import Swal from "sweetalert2";

function NavbarComponent(){
    
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        Swal.fire({
            title: "Logout?",
            text: "Are you sure you want to logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Yes, Logout"
        }).then((result) => {
    if (result.isConfirmed) {
      // hapus data login
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    
      // redirect
    navigate("/login");
    }
});
    }
    return(
        <Navbar bg="dark" variant='dark' expand="lg">
    <Container>
        <Navbar.Brand href="#home">Belajar React</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
            <Nav.Link href="#dashboard">Dashboard</Nav.Link>
            <Nav.Link href="#user">User</Nav.Link>
            <Nav.Link href="#user">Role</Nav.Link>
            <NavDropdown title={user?.name} id="basic-nav-dropdown"> 
            <NavDropdown.Item href='#action/3.1'>{user?.name}</NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item onClick={handleLogout}>Log Out</NavDropdown.Item>
            </NavDropdown>
        </Nav>
        </Navbar.Collapse>
    </Container>
    </Navbar>
    )
}

export default NavbarComponent