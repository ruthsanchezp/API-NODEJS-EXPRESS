require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const reservationRoutes = require('./routes/userRoutes');
const swaggerSpec = require('./swaggerConfig'); // Importar configuración de Swagger

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', reservationRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
    console.log('Server running on port ' + port);
});
