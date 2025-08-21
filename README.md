# 🎬 Cineargos-API

Cineargos-API es una **API RESTful** desarrollada con **Node.js** y **Express**, que gestiona películas, usuarios, reservas, tickets y funciones de cine.  
Implementa **autenticación JWT**, encriptación de contraseñas con **bcrypt** y persistencia de datos en **MySQL**.

---

## 🚀 Tecnologías utilizadas
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [JWT (JSON Web Token)](https://jwt.io/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)

---

## 📂 Estructura de la API
```bash
/api
├── /auth
│   ├── POST /login          ✔️
│   └── POST /register       ✔️
│
├── /movies
│   ├── GET /                (público) ✔️
│   ├── GET /:id                       ✔️
│   ├── POST /               (JWT) ✔️
│   ├── PUT /:id                   ✔️
│   └── DELETE /:id                ✔️
│
├── /users
│   ├── GET /                (admin - JWT)
│   ├── GET /:id
│   ├── POST /
│   ├── PUT /:id
│   └── DELETE /:id
│
├── /admins
│   └── mismos métodos que /users (con permisos)
│
├── /bookings
│   ├── GET /                (admin)
│   ├── GET /:id
│   ├── GET /user/:id_user
│   ├── POST /               (crear reserva)
│   └── DELETE /:id
│
├── /tickets
│   ├── GET /booking/:id_booking
│   └── GET /:id_ticket
│
├── /functions
│   ├── GET /
│   ├── GET /:id
│   └── GET /:id/seats
```
---

## 🛡️ Middlewares de validación

La API cuenta con middlewares personalizados que garantizan la seguridad y la integridad de los datos:

### 🔑 Autenticación y Roles
- **validateToken** → Verifica si el JWT es válido y no ha expirado.  
- **isAdmin** → Permite el acceso solo a usuarios con rol `admin`.  
- **validateAuthParameters** → Valida credenciales de login y registro:  
  - `email` → formato válido de correo electrónico.  
  - `password` → requerido.  
  - `firstName` (opcional) → solo letras.  

### 🎬 Películas
- **validateMovieID** → Verifica que el `id` de película sea numérico y mayor a 0.  
- **validateMovieParameters** → Comprueba que todos los campos requeridos tengan el formato correcto:  
  - `title` → STRING (letras y números).  
  - `genre` → STRING (solo letras).  
  - `releaseYear` → INT (formato año válido, ej: 1999–2025).  
  - `director` → STRING (solo letras).  
  - `image` → STRING con formato URL válido (`http/https` y extensión de imagen).  
  - `isAvailable` → BOOLEAN.  

Estos middlewares permiten manejar errores comunes (IDs inválidos, credenciales incorrectas, datos faltantes o mal formateados) y devuelven respuestas JSON claras para el cliente.

---

## 🔑 Autenticación

- Se utiliza **JWT** para rutas protegidas.
- **bcrypt** para encriptar contraseñas antes de almacenarlas en la base de datos.

---

## ⚙️ Instalación y uso

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Osvaldx/Cineargos-API.git
   cd Cineargos-API
## Instalar dependencias:
```bash
npm install
```

## Configurar variables de entorno en un archivo .env:
```js
PORT=3000

DB_HOST=ip_host
DB_PORT=3306
DB_NAME=nombre_db
DB_USER=usuario_db
DB_PASSWORD=tu_clave_db

SECRET_KEY=tu_clave_secreta
SECRET_ADMIN_KEY=tu_clave_secreta_admin
```

## Ejecutar el servidor:
```bash
npm run dev
```
## 🤝 Contribuciones
*Las contribuciones son bienvenidas.
Haz un fork, crea una rama, realiza tus cambios y abre un Pull Request.*