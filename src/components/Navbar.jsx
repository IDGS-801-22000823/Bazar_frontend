import React, { useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function CustomNavbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedTerm = searchTerm.trim();
    if (trimmedTerm) {
      // lo de buscar
      navigate(`/items?q=${encodeURIComponent(trimmedTerm)}`);
      setSearchTerm("");
    }
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm sticky-top">
      <Container fluid>
        {/*  Home */}
        <Navbar.Brand as={Link} to="/">
          <span style={{ fontSize: "1.5rem", marginRight: "5px" }}>🛍️</span>
          Bazar Universal
        </Navbar.Brand>

        {/* Barra para buscar */}
        <Form className="d-flex w-50 mx-auto" onSubmit={handleSearch}>
          <FormControl
            type="search"
            placeholder="Q search"
            aria-label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="me-2"
          />
          <Button
            variant="outline-primary"
            type="submit"
            disabled={!searchTerm.trim()}
          >
            🔍
          </Button>
        </Form>

        <Nav className="ms-auto">
          {/* Compras Registradas */}
          <Nav.Link as={Link} to="/sales">
            <span style={{ fontSize: "1.5rem" }}>🛒</span>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
