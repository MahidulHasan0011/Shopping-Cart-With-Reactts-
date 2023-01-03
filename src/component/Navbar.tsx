import {Container,Nav,Navbar as NavbarBs} from "react-bootstrap"
import { NavLink } from "react-router-dom"

export function Navbar(){
    return <NavbarBs className="bg-white shadow-sm mb-2">
        <Container>
            <Nav className="me-auto">
               <Nav.Link to="/" as={NavLink}>Home</Nav.Link>
               <Nav.Link to="/store"as={NavLink}>Store</Nav.Link>
               <Nav.Link to="/about"as={NavLink}>About</Nav.Link>
            </Nav>
            <button><svg width="100" height="100">
  <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
</svg></button>
        </Container>
        </NavbarBs>
}