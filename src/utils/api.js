// URL de la api en Express.js
export const API_BASE_URL = "https://bazar-backend-is5t.onrender.com/api";

/**
 * Obtiene la lista de productos de la busqueda
 * GET /api/items?q=:query
 */
export const getItems = async (queryTerm) => {
  const url = `${API_BASE_URL}/items?q=${encodeURIComponent(queryTerm)}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error al buscar ítems: ${response.statusText}`);
  }
  const data = await response.json();
  return data.items || [];
};

/**
 * Obtiene los detalles de un solo producto
 * GET /api/items/:id
 */
export const getItemDetail = async (id) => {
  const url = `${API_BASE_URL}/items/${id}`;
  const response = await fetch(url);
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Producto no encontrado.");
    }
    throw new Error(`Error al obtener detalle: ${response.statusText}`);
  }
  return await response.json();
};

/**
 * Registra una nueva venta.
 * POST /api/addSale
 */
export const addSale = async (saleData) => {
  const url = `${API_BASE_URL}/addSale`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(saleData),
  });
  if (!response.ok) {
    throw new Error(`Error al registrar venta: ${response.statusText}`);
  }
  const result = await response.json();
  return result.success;
};

/**
 * todas las ventas registradas.
 * GET /api/sales
 */
export const getSales = async () => {
  const url = `${API_BASE_URL}/sales`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error al obtener ventas: ${response.statusText}`);
  }
  const data = await response.json();
  return data.sales || [];
};
