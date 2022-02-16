import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Container } from "react-bootstrap";
import {useState} from "react"



function Header({setScreen}) {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Shaun's Steak n Tacos</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link  href="#Tacos">Tacos</Nav.Link>
            <Nav.Link href="#Steaks">Steaks</Nav.Link>
            <Nav.Link href="#Sides">Sides</Nav.Link>
            <Nav.Link href="#Desserts">Desserts</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={() => setScreen(true)}>My Order</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
