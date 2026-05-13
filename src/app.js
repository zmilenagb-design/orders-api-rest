const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const ordersRouter = require('./routes/orders.routes');
const productsRouter = require('./routes/products.routes');
const customersRouter = require('./routes/customers.routes');
const healthRouter = require('./routes/health.routes');
const { errorHandler } = require('./middlewares/errorHandler');
const swaggerSetup = require('./docs/swagger');

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1', healthRouter);
app.use('/api/v1/orders', ordersRouter);
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/customers', customersRouter);

swaggerSetup(app);

app.use(errorHandler);

module.exports = app;