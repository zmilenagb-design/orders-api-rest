const swaggerUi = require('swagger-ui-express');

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Orders API REST',
    version: '1.0.0',
    description: 'API REST para gestión de pedidos - SENA ADSO Grupo B'
  },
  servers: [{ url: '/api/v1', description: 'Servidor local' }],
  paths: {
    '/health': {
      get: {
        summary: 'Verificar disponibilidad del servicio',
        tags: ['Health'],
        responses: { '200': { description: 'Servicio activo' } }
      }
    },
    '/orders': {
      get: {
        summary: 'Listar pedidos con paginación y filtros',
        tags: ['Orders'],
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer' } },
          { name: 'limit', in: 'query', schema: { type: 'integer' } },
          { name: 'customerId', in: 'query', schema: { type: 'integer' } },
          { name: 'dateFrom', in: 'query', schema: { type: 'string' } },
          { name: 'dateTo', in: 'query', schema: { type: 'string' } },
          { name: 'sort', in: 'query', schema: { type: 'string' } }
        ],
        responses: { '200': { description: 'Lista paginada de pedidos' } }
      },
      post: {
        summary: 'Crear un pedido',
        tags: ['Orders'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  customerId: { type: 'integer', example: 1 },
                  items: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        productId: { type: 'integer', example: 1 },
                        quantity: { type: 'integer', example: 2 }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        responses: { '201': { description: 'Pedido creado' }, '400': { description: 'Datos inválidos' } }
      }
    },
    '/orders/{orderId}': {
      get: {
        summary: 'Obtener detalle de un pedido',
        tags: ['Orders'],
        parameters: [{ name: 'orderId', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { '200': { description: 'Pedido encontrado' }, '404': { description: 'No encontrado' } }
      },
      put: {
        summary: 'Reemplazar completamente un pedido',
        tags: ['Orders'],
        parameters: [{ name: 'orderId', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { '200': { description: 'Pedido actualizado' } }
      },
      patch: {
        summary: 'Actualizar parcialmente un pedido',
        tags: ['Orders'],
        parameters: [{ name: 'orderId', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { '200': { description: 'Pedido actualizado' } }
      },
      delete: {
        summary: 'Eliminar un pedido',
        tags: ['Orders'],
        parameters: [{ name: 'orderId', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { '204': { description: 'Pedido eliminado' }, '404': { description: 'No encontrado' } }
      }
    },
    '/orders/{orderId}/items': {
      get: {
        summary: 'Listar items de un pedido',
        tags: ['Order Items'],
        parameters: [{ name: 'orderId', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { '200': { description: 'Lista de items' } }
      },
      post: {
        summary: 'Agregar item a un pedido',
        tags: ['Order Items'],
        parameters: [{ name: 'orderId', in: 'path', required: true, schema: { type: 'integer' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  productId: { type: 'integer', example: 2 },
                  quantity: { type: 'integer', example: 3 }
                }
              }
            }
          }
        },
        responses: { '201': { description: 'Item agregado' } }
      }
    },
    '/orders/{orderId}/items/{itemId}': {
      patch: {
        summary: 'Actualizar item de un pedido',
        tags: ['Order Items'],
        parameters: [
          { name: 'orderId', in: 'path', required: true, schema: { type: 'integer' } },
          { name: 'itemId', in: 'path', required: true, schema: { type: 'integer' } }
        ],
        responses: { '200': { description: 'Item actualizado' } }
      },
      delete: {
        summary: 'Eliminar item de un pedido',
        tags: ['Order Items'],
        parameters: [
          { name: 'orderId', in: 'path', required: true, schema: { type: 'integer' } },
          { name: 'itemId', in: 'path', required: true, schema: { type: 'integer' } }
        ],
        responses: { '204': { description: 'Item eliminado' } }
      }
    },
    '/products': {
      get: {
        summary: 'Listar productos',
        tags: ['Products'],
        responses: { '200': { description: 'Lista de productos' } }
      }
    },
    '/products/{productId}': {
      get: {
        summary: 'Detalle de un producto',
        tags: ['Products'],
        parameters: [{ name: 'productId', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { '200': { description: 'Producto encontrado' }, '404': { description: 'No encontrado' } }
      }
    }
  }
};

function swaggerSetup(app) {
  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

module.exports = swaggerSetup;