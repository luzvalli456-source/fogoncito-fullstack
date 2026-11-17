# Guía para la presentación final "Del diseño al producto"
(Pasar a Google Slides / Canva. Las capturas marcadas con 📸 hay que sacarlas corriendo el proyecto.)

1. **Portada** — Logo Fogoncito, "Del diseño al producto", Carla Ruiz, María Luz Valli, Guadalupe Pérez.
2. **El recorrido** — 1.1 diseño (Figma) → 3.1 sitio HTML/CSS/JS → 4.1 app React → 5.1 full stack. 📸 una captura de cada etapa (están en los PDF de 3.1 y 4.1).
3. **Arquitectura** — Navegador (React, puerto 5173) → fetch con VITE_API_URL → API Express (puerto 3000) → rutas → controladores → `productos.json` (fs/promises).
4. **Endpoints** — Tabla del README.
5. **La API en acción** — 📸 Thunder Client/Postman: GET 200, POST 201, PUT 200, DELETE 204, POST con precio inválido → 400, GET /api/productos/999 → 404, GET /api/noexiste → 404 en JSON.
6. **Flujo completo** — Ejemplo: la encargada abre Administrar, completa "Nuevo producto", pulsa Crear → viaja `POST /api/productos` con el JSON → el servidor valida, agrega y escribe `productos.json` → responde 201 → la lista se actualiza sin recargar.
7. **Cierre** — Laura (60 años, quiere pedir rápido): la carta carga desde el servidor, filtra por categoría, busca y el pedido se arma en una barra flotante. Aprendimos: separar rutas/controladores, middlewares, validar datos. Mejoras: pantalla de pedido con envío, base de datos real, login para el panel de administración.
8. **Enlaces** — Repositorio, Figma (y sitio publicado si hacen el desafío opcional de Render + Vercel).
