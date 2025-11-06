import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function ItemCard({ item }) {
  const renderStars = (rating) => {
    const fullStars = Math.min(5, Math.max(0, Math.round(rating)));
    return "⭐️".repeat(fullStars);
  };

  return (
    // La tarjetaes un enlace al detalle
    <Card
      className="mb-3 d-flex flex-row p-2 shadow-sm"
      as={Link}
      to={`/item/${item.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      {/* Imagen */}
      <div
        className="product-thumbnail-container me-3"
        style={{ minWidth: "100px" }}
      >
        <Card.Img
          style={{
            width: "100px",
            height: "100px",
            objectFit: "cover",
            borderRadius: "5px",
          }}
          src={item.thumbnail || item.images?.[0] || "placeholder.png"}
          alt={item.title}
        />
      </div>

      {/* Tarjeta */}
      <Card.Body className="p-0 d-flex flex-column justify-content-between">
        <Card.Title className="h6 mb-1">{item.title}</Card.Title>
        <Card.Subtitle className="mb-1 text-muted small">
          {item.category}
        </Card.Subtitle>

        {/* Descripcion*/}
        <Card.Text
          className="small flex-grow-1"
          style={{ maxHeight: "2.5em", overflow: "hidden" }}
        >
          {item.description.substring(0, 70)}...
        </Card.Text>

        <div className="d-flex justify-content-between align-items-end pt-1">
          <span className="fw-bold text-success">${item.price.toFixed(2)}</span>
          <span className="small">{renderStars(item.rating)}</span>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ItemCard;
