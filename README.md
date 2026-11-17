# Fogoncito Hamburguesería Artesanal — Proyecto full stack

**Integrantes:** Carla Ruiz, María Luz Valli, Guadalupe Pérez

Cierre del proyecto anual (Ejercitaciones 1.1 → 3.1 → 4.1 → 5.1): carta digital de una hamburguesería, con frontend en React y backend propio en Node.js + Express que guarda los datos en un archivo JSON.

- Prototipo de Figma: https://www.figma.com/make/rL2oorWQy6fACpa2lGnbED/Hamburgueseria-FogoncitoWebsite
- Sitio 3.1: https://carlaruiz3011.github.io/FogoncitoHamburguesas/
- Repositorio 4.1 (React): https://github.com/carlaruiz3011/FogoncitoHamburguesas-React

## Cómo ejecutarlo

Se necesitan **dos terminales** abiertas a la vez (requiere Node.js 18 o superior).

**1. Backend** (http://localhost:3000)
```bash
cd backend
npm install
npm run dev
```
Probar: abrir http://localhost:3000/api/salud → debe verse `{"estado":"ok"}`.

**2. Frontend** (http://localhost:5173)
```bash
cd frontend
npm install
npm run dev
```
El archivo `frontend/.env` ya trae `VITE_API_URL=http://localhost:3000/api`. Si se modifica, hay que detener y volver a ejecutar `npm run dev`.

## Endpoints

Recurso principal: **producto** → `{ id, nombre, descripcion, precio, categoria }` (categoria: `promociones`, `menu` o `bebidas`).

| Método | Ruta | Qué hace | Respuesta exitosa | Dónde se usa en la interfaz |
|---|---|---|---|---|
| GET | /api/productos | Devuelve todos los productos. Filtros: `?categoria=bebidas`, `?q=bacon` | 200 con un array | Carta (pestañas y buscador) y panel Administrar |
| GET | /api/productos/:id | Devuelve un producto | 200 con un objeto | — (disponible para detalle) |
| POST | /api/productos | Crea un producto | 201 con el producto creado | Formulario "Nuevo producto" |
| PUT | /api/productos/:id | Modifica un producto | 200 con el producto modificado | Botón "Editar" |
| DELETE | /api/productos/:id | Elimina un producto | 204 sin contenido | Botón "Eliminar" (con confirmación) |

Errores (siempre JSON `{ "error": "mensaje" }`): **400** datos inválidos o JSON mal formado, **404** producto o ruta inexistente, **500** error interno sin detalles.

## Estructura
```
backend/src/  index.js · routes/ · controllers/ · middlewares/ (logger, notFound, errorHandler) · data/ (productos.json + almacen.js)
frontend/src/ App.jsx · api.js · components/ (ProductCard, ProductForm) · styles.css
```
