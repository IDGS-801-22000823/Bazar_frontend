import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { getItems } from "../utils/api";
import ItemCard from "../components/ItemCard";
import "../styles/Resultados.css";

const Resultados = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryTerm = queryParams.get("q") || "";

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!queryTerm) {
      setItems([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    getItems(queryTerm)
      .then((fetchedItems) => {
        setItems(fetchedItems);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching items:", err);
        setError("Error al cargar los resultados. Inténtalo de nuevo.");
        setLoading(false);
      });
  }, [queryTerm]);

  return (
    <Container className="resultados-container">
      <Row>
        <Col>
          <h2 className="resultados-header">
            Resultados de la búsqueda de "{queryTerm}"
            <small className="text-muted"> ({items.length} productos)</small>
          </h2>
        </Col>
      </Row>
      <Row xs={1} md={2} lg={3} className="g-4">
        {loading ? (
          <Col>
            <p>Cargando resultados...</p>
          </Col>
        ) : error ? (
          <Col>
            <p className="text-danger">{error}</p>
          </Col>
        ) : items.length === 0 ? (
          <Col>
            <p>No se encontraron productos para "{queryTerm}".</p>
          </Col>
        ) : (
          items.map((item) => (
            <Col key={item.id}>
              <ItemCard item={item} />
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default Resultados;
