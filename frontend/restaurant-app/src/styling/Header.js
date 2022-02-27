import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Container } from "react-bootstrap";
import {useState} from "react"



function Header({setSelection}) {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand onClick={() => setSelection('menuScreen')}>Shaun's Steak n Tacos</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link  href="#Tacos">Tacos</Nav.Link>
            <Nav.Link href="#Steaks">Steaks</Nav.Link>
            <Nav.Link href="#Sides">Sides</Nav.Link>
            <Nav.Link href="#Desserts">Desserts</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={() => setSelection('menuScreen')}>Menu</Nav.Link>
            <Nav.Link onClick={() => setSelection('myOrder')}>My Order</Nav.Link>
            <Nav.Link onClick={() => setSelection('admin')}>Admin</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
