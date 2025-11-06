import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
  ListGroup,
  Carousel,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { StarFill } from "react-bootstrap-icons";
import "../styles/Detalles.css";

// URL de tu API RESTful
const API_BASE_URL = "https://bazar-backend-is5t.onrender.com/api";

function Detalles() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saleStatus, setSaleStatus] = useState(null);

  //  detalle del producto
  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);
      setProduct(null);

      try {
        const response = await fetch(`${API_BASE_URL}/items/${id}`);

        if (!response.ok) {
          throw new Error(`Producto con ID ${id} no encontrado.`);
        }

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError(`Fallo al cargar el producto: ${err.message}.`);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  // registrar la compra
  const handlePurchase = async () => {
    if (!product) return;

    setSaleStatus("loading");

    const purchaseData = {
      productId: product.id,
      productTitle: product.title,
      price: product.price,
      quantity: 1,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/addSale`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(purchaseData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSaleStatus("success");
        setTimeout(() => navigate("/sales"), 2000);
      } else {
        throw new Error(
          result.message || "Error desconocido al registrar la compra."
        );
      }
    } catch (err) {
      console.error("Purchase Error:", err);
      setSaleStatus("error");
      setError(`Error al comprar: ${err.message}`);
    }
  };

  const formatCurrency = (amount) => {
    return amount
      ? amount.toLocaleString("es-MX", { style: "currency", currency: "USD" })
      : "$0.00";
  };

  if (isLoading)
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Cargando detalles del producto...</p>
      </Container>
    );

  if (error && saleStatus !== "error")
    return (
      <Alert variant="danger" className="m-5">
        {error}
      </Alert>
    );

  if (!product)
    return (
      <Alert variant="info" className="m-5">
        No se encontró el producto.
      </Alert>
    );

  return (
    <Container className="my-5 detalles-container">
      <Row>
        {/*Carrusel de Imagenee */}
        <Col md={6}>
          <Card className="shadow-lg mb-4">
            <Card.Body className="p-0">
              <Carousel
                indicators={product.images && product.images.length > 1}
              >
                {product.images && product.images.length > 0 ? (
                  product.images.map((imgUrl, index) => (
                    <Carousel.Item key={index}>
                      <img
                        className="d-block w-100 product-image"
                        src={imgUrl}
                        alt={`Slide ${index}`}
                        style={{ maxHeight: "450px", objectFit: "contain" }}
                      />
                    </Carousel.Item>
                  ))
                ) : (
                  <Carousel.Item>
                    <img
                      className="d-block w-100 product-image"
                      src={
                        product.thumbnail ||
                        "https://placehold.co/400x400/A0A0A0/ffffff?text=No+Image"
                      }
                      alt="Imagen Principal"
                      style={{ maxHeight: "450px", objectFit: "contain" }}
                    />
                  </Carousel.Item>
                )}
              </Carousel>
            </Card.Body>
          </Card>
        </Col>

        {/* Detalles y Compra */}
        <Col md={6}>
          <Card className="shadow-lg">
            <Card.Body>
              <Card.Subtitle className="text-muted mb-2">
                {product.category}
              </Card.Subtitle>
              <Card.Title as="h2" className="fw-bold">
                {product.title}
              </Card.Title>

              <h3 className="text-primary my-3 display-4 fw-bolder">
                {formatCurrency(product.price)}
              </h3>

              <div className="mb-3">
                <StarFill color="gold" size={18} className="me-1" />
                <span className="fw-bold">{product.rating}</span> de 5
                <span className="text-muted ms-3">
                  ({product.reviews?.length || 0} reviews)
                </span>
              </div>

              <Card.Text className="text-muted">
                {product.description}
              </Card.Text>

              <ListGroup variant="flush" className="mb-4">
                <ListGroup.Item>
                  <strong>Marca:</strong> {product.brand || "N/A"}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Stock:</strong>{" "}
                  <span
                    className={
                      product.stock > 10
                        ? "text-success"
                        : product.stock > 0
                        ? "text-warning"
                        : "text-danger"
                    }
                  >
                    {product.stock} unidades
                  </span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Envío:</strong>{" "}
                  {product.shippingInformation || "No especificado"}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Garantía:</strong>{" "}
                  {product.warrantyInformation || "No especificada"}
                </ListGroup.Item>
              </ListGroup>

              {/*btn Comprar */}
              <Button
                variant="success"
                size="lg"
                className="w-100 fw-bold py-3"
                onClick={handlePurchase}
                disabled={saleStatus === "loading" || product.stock === 0}
              >
                {saleStatus === "loading" ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Comprando...
                  </>
                ) : product.stock === 0 ? (
                  "Agotado"
                ) : (
                  `Comprar Ahora (${formatCurrency(product.price)})`
                )}
              </Button>

              {/* Mensaje de Comprado */}
              {saleStatus === "success" && (
                <Alert variant="success" className="mt-3">
                  ¡Compra registrada con éxito! Redirigiendo...
                </Alert>
              )}
              {saleStatus === "error" && (
                <Alert variant="danger" className="mt-3">
                  Error al registrar: {error}
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Detalles;
