# Sistema de Gestión de Reservas de Hotel

En este proyecto, realizarás dos actividades principales:

1. **Construir una Aplicación de Gestión de Reservas de Hotel**: Esta aplicación incluirá las cuatro operaciones CRUD y seis funcionalidades adicionales relacionadas con filtros, todo utilizando Node.js y Express.

2. **Investigación Opcional sobre Documentación de API**: Explorarás la documentación de API utilizando Swagger y el estándar OPENAPI, comúnmente utilizado en equipos internacionales para construir servicios escalables.

## Características del Proyecto
- **Desarrollo del Servidor**: Utiliza Node.js y Express.
- **Variables de Entorno**: Incluye un archivo `.env` especificando la configuración del puerto.
- **Control de Versiones**: Implementa un archivo `.gitignore` para excluir carpetas y archivos especificados del repositorio.
- **Arquitectura de Carpetas Clara**: Estructura tu proyecto como se muestra a continuación. Puedes añadir más archivos, rutas, controladores, o simplificar según lo prefieras. El objetivo es localizar fácilmente las asignaciones de responsabilidad dentro de tu código.

### Estructura del Proyecto

EJEMPLO_TU_PROYECTO
├─ .env
├─ .prettierrc
├─ README.md
├─ controllers
│ └─ TU_CONTROLADOR.js
├─ package-lock.json
├─ package.json
├─ routes
│ └─ TU_RUTA.js
└─ server.js <- ARCHIVO DE ENTRADA



## Implementación de Endpoints
Implementa los siguientes 10 endpoints:

| Descripción | Método | Endpoint | Ejemplo de Caso de Uso |
|-------------|--------|----------|------------------|
| Crear Reserva | POST | `/api/reservas` | Como viajero, quiero hacer una reserva en el hotel "Hotel Paraíso" para el 15 de mayo de 2023. Necesito una habitación doble para dos adultos y un niño. |
| Listar Todas las Reservas | GET | `/api/reservas` | Como gerente del hotel, quiero ver una lista de todas las reservas de hoy para planificar el trabajo del personal de limpieza y recepción. |
| Obtener Información de una Reserva Específica | GET | `/api/reservas/:id` | Como recepcionista, necesito verificar los detalles de la reserva de un huésped que acaba de llegar al hotel. Su número de reserva es 12345. |
| Actualizar Información de una Reserva | PUT | `/api/reservas/:id` | Como huésped, necesito cambiar mi reserva en el hotel "Hotel Paraíso". Originalmente reservé una habitación doble, pero ahora necesito una suite familiar. Mi número de reserva es 12345. |
| Eliminar una Reserva Específica | DELETE | `/api/reservas/:id` | Como viajero, tuve un cambio de planes y ya no necesito la habitación que reservé en el hotel "Hotel Paraíso". Mi número de reserva es 12345. |
| Filtrar Reservas por Hotel | GET | `/api/reservas?hotel=HOTEL` | Como gerente de una cadena de hoteles, quiero ver todas las reservas para el "Hotel Paraíso" para el próximo mes. |
| Filtrar Reservas por Rango de Fechas | GET | `/api/reservas?fecha_inicio=FECHA_INICIO&fecha_fin=FECHA_FIN` | Como gerente del hotel, quiero ver todas las reservas para la semana de Navidad para poder planificar el personal y las actividades necesarias. |
| Filtrar Reservas por Tipo de Habitación | GET | `/api/reservas?tipo_habitacion=TIPO_HABITACION` | Como gerente del hotel, quiero ver todas las reservas para nuestras suites de lujo para el próximo mes para asegurarme de que todo esté en perfectas condiciones para nuestros huéspedes VIP. |
| Filtrar Reservas por Estado | GET | `/api/reservas?estado=ESTADO` | Como gerente del hotel, quiero ver todas las reservas que están pendientes de pago para poder hacer un seguimiento con los clientes. |
| Filtrar Reservas por Número de Huéspedes | GET | `/api/reservas?num_huespedes=NUM_H


