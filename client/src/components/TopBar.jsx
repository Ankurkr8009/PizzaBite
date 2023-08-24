import React from "react";
import { Navbar, Nav, Container,Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { MdLocalOffer } from "react-icons/md";

const TopBar = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
        <Navbar.Brand>
            <Image
              src="images/logo2.png"
              alt="logo"
              style={{ height: "45px" ,width : "100px" }}
            />
          </Navbar.Brand>
          <Nav className="ms-auto">
            <LinkContainer to="/" activeClassName="">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about" activeClassName="">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contact" activeClassName="">
              <Nav.Link>Contact</Nav.Link>
            </LinkContainer>
            {/* <LinkContainer to="/policy" activeClassName="">
              <Nav.Link>Terms and policy</Nav.Link>
            </LinkContainer> */}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default TopBar;
