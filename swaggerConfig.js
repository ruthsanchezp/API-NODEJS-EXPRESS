const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Hotel Reservation API',
            version: '1.0.0',
            description: 'Documentación'
        },
    },
    apis: ['./controllers/*.js'], // Cambia esto según la ubicación de tus controladores
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpec;
