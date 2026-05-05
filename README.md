# orders-api-rest

API REST desarrollada con **Node.js + Express** para la gestión de pedidos comerciales.
Proyecto formativo SENA — Análisis y Desarrollo de Software.

## 🛠 Tecnologías utilizadas

- Node.js v24
- Express.js
- Swagger UI Express (documentación OpenAPI)
- Nodemon (desarrollo)

## 📋 Requisitos previos

- Node.js v18 o superior
- npm v9 o superior
- Git

## 🚀 Instalación y ejecución local

```bash
# 1. Clonar el repositorio
git clone https://github.com/zmilenagb-design/orders-api-rest.git
cd orders-api-rest

# 2. Instalar dependencias
npm install

# 3. Iniciar en modo desarrollo
npm run dev

# 4. O iniciar en producción
npm start
```

El servidor iniciará en: `http://localhost:3000`

## 📚 Endpoints disponibles

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /api/v1/health | Estado del servicio |
| GET | /api/v1/docs | Documentación Swagger |
| GET | /api/v1/orders | Listar pedidos |
| POST | /api/v1/orders | Crear pedido |
| GET | /api/v1/orders/:id | Detalle de pedido |
| PUT | /api/v1/orders/:id | Reemplazar pedido |
| PATCH | /api/v1/orders/:id | Actualizar parcialmente |
| DELETE | /api/v1/orders/:id | Eliminar pedido |
| GET | /api/v1/orders/:id/items | Items del pedido |
| POST | /api/v1/orders/:id/items | Agregar item |
| PATCH | /api/v1/orders/:id/items/:itemId | Actualizar item |
| DELETE | /api/v1/orders/:id/items/:itemId | Eliminar item |
| GET | /api/v1/products | Listar productos |
| GET | /api/v1/products/:id | Detalle de producto |

## 🏗 Arquitectura

    HTTP Request → Routes → Controllers → Services → Repositories → data/orders.json

La arquitectura sigue el patrón en capas:

- **Routes** → definen las URLs y métodos HTTP
- **Controllers** → reciben la petición y devuelven la respuesta
- **Services** → contienen la lógica de negocio
- **Repositories** → acceden a los datos (archivo JSON)
- **data/orders.json** → almacenamiento temporal de pedidos

## 🌿 Gitflow

- `main` → Código en producción
- `develop` → Integración continua
- `feature/*` → Funcionalidades nuevas

## 📌 Versión

v1.0.0