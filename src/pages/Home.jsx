import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // lo de  busqueda
      navigate(`/items?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <Container
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "80vh" }}
    >
      <div className="text-center mb-5">
        <span style={{ fontSize: "4.5rem" }}>🛍️</span>
        <h1 className="display-5 fw-bold mt-2">Bazar Online</h1>
      </div>

      <Row className="w-100 justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Form onSubmit={handleSearch}>
            <Form.Group className="d-flex mb-3">
              <Form.Control
                type="search"
                placeholder="Q search"
                aria-label="Search products"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-end-0"
              />
              <Button
                variant="primary"
                type="submit"
                className="rounded-start-0 px-4"
              >
                Buscar
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
