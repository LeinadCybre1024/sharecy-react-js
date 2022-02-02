import React from 'react';
import {Link} from 'react-router-dom';
import {Navbar,Nav} from 'react-bootstrap';

const Navigation = () =>{
	return (
		<Navbar bg="light" expand="lg">
		<Navbar.Brand href="#/">Cyber Share</Navbar.Brand>
		<Navbar.Toggle aria-controls="basic-navbar-nav" />
		<Navbar.Collapse id="basic-navbar-nav">
		<Nav className="mr-auto">
		<Nav.Link as={Link} to={"/"}>Home</Nav.Link>
		<Nav.Link as={Link} to={"/signin"}>Login</Nav.Link>
		</Nav>
		</Navbar.Collapse>
		</Navbar>
		);
}

export default Navigation;