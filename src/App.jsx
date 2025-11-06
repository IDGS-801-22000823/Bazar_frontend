import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Resultados from "./pages/Resultados.jsx";
import Detalles from "./pages/Detalles.jsx";
import Compras from "./pages/Compras.jsx";

import CustomNavbar from "./components/Navbar.jsx";
import { Container } from "react-bootstrap";

const LayoutWithNavbar = ({ children }) => (
  <>
    <CustomNavbar />
    <Container className="pt-3">{children}</Container>
  </>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/items"
          element={
            <LayoutWithNavbar>
              <Resultados />
            </LayoutWithNavbar>
          }
        />

        <Route
          path="/item/:id"
          element={
            <LayoutWithNavbar>
              <Detalles />
            </LayoutWithNavbar>
          }
        />

        <Route
          path="/sales"
          element={
            <LayoutWithNavbar>
              <Compras />
            </LayoutWithNavbar>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
