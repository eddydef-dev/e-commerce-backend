# E-commerce Backend API

Backend REST API para un sistema de e-commerce, desarrollado con Node.js y MongoDB.
Incluye autenticación con JWT, manejo de roles y CRUD de productos.

Este proyecto fue desarrollado como parte de mi portafolio backend, siguiendo buenas prácticas REST y arquitectura modular.

---

## Tecnologías

- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- Git

---

## Autenticación y Roles

La API utiliza autenticación basada en JWT.

Roles disponibles:
- **user**: usuario estándar
- **admin**: acceso a rutas protegidas (gestión de productos)

Las rutas protegidas requieren el token JWT enviado en el header:
Authorization: Bearer <token>

---

## Funcionalidades

- Registro de usuarios
- Login con generación de JWT
- Protección de rutas mediante middleware
- CRUD de productos (solo admin)
- Arquitectura modular (controllers, routes, models)

---

## Instalación y Uso

### 1. Clonar repositorio


git clone https://github.com/eddydef-dev/e-commerce-backend.git

---

### 2. Instalar dependencias

npm install

---

### 3. Variables de entorno

##Crear un archivo .env basado en .env.example:
PORT=3990
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_secret_here

---

### 4. Ejecutar Servidor

```bash
npm start

```

## El servidor quedará disponible en:
http://localhost:3990

---

### Endpoints Principales

## Auth

```bash
POST /api/user/register

POST /api/user/login

```

## Products

```bash
GET /api/products

POST /api/products (admin)

PUT /api/products/:id (admin)

DELETE /api/products/:id (admin)

```

---

### Notas

Proyecto en desarrollo (v1).

Próximas mejoras: pedidos, pagos simulados, testing y documentación con Swagger.
