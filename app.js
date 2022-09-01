const express = require('express');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const errorMiddleware = require('./middlewares/errorMiddleware');
const productsRouter = require('./routes/productsRouter');
const salesRouter = require('./routes/salesRouter');
const swaggerFile = require('./swagger_output.json');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/products', productsRouter);
app.use('/sales', salesRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(errorMiddleware);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação
module.exports = app;
