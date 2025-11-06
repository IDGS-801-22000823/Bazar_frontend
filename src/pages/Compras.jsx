import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";
import { getSales } from "../utils/api"; // Importamos la función API
import "../styles/Compras.css";

const Compras = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getSales()
      .then((fetchedSales) => {
        // Ordenamos por fecha de compra
        fetchedSales.sort(
          (a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate)
        );
        setSales(fetchedSales);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching sales:", err);
        setError("Error al cargar las compras registradas.");
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <Container className="my-5 text-center">
        Cargando historial de compras...
      </Container>
    );

  return (
    <Container className="compras-container my-5">
      <h1 className="mb-4">Historial de Compras Registradas</h1>

      {error && <Alert variant="danger">{error}</Alert>}

      {sales.length === 0 ? (
        <Alert variant="info">Aún no se han registrado compras.</Alert>
      ) : (
        <Row xs={1} md={1} lg={2} className="g-4">
          {sales.map((sale) => (
            <Col key={sale.id}>
              <Card className="sale-card">
                <Card.Body>
                  <Card.Title>{sale.productTitle}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    ID de Venta: {sale.id}
                  </Card.Subtitle>

                  <ul className="list-unstyled">
                    <li>
                      **Fecha de Compra:**{" "}
                      {new Date(sale.purchaseDate).toLocaleString()}
                    </li>
                    <li>**Cantidad:** {sale.quantity} unidad(es)</li>
                    <li>**Precio Unitario:** ${sale.price.toFixed(2)}</li>
                    <li className="fw-bold">
                      **Monto Total:** ${sale.totalAmount.toFixed(2)}
                    </li>
                    <li>**Producto ID:** {sale.productId}</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Compras;
