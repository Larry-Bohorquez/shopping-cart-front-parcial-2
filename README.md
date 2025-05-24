# shopping-cart-front-parcial-2

Aplicación web para una empresa con consumo de la API [DummyJSON](https://dummyjson.com/).

---

## Índice

- [Descripción General](#descripción-general)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Tecnologías Usadas](#tecnologías-usadas)
- [Guía de Archivos](#guía-de-archivos)
- [Flujo de la Aplicación](#flujo-de-la-aplicación)
- [Desarrolladores](#desarrolladores)

---

## Descripción General

Este proyecto es una aplicación web que permite gestionar usuarios, productos y carritos de compras consumiendo la API DummyJSON. Incluye autenticación, panel de administración y visualización de datos en tablas y modales.

---

## Estructura del Proyecto

```
index.html
README.md
admin/
    dashboard.html
js/
    cartService.js
    dashboardService.js
    loginService.js
    productService.js
    userService.js
```

---

## Tecnologías Usadas

- **HTML5**
- **CSS3** (Bootstrap 5)
- **JavaScript** (Vanilla JS)
- **Bootstrap Icons**

---

## Guía de Archivos

### `index.html`

Página principal con el formulario de login. Incluye:
- Formulario de acceso (`loginForm`)
- Mensajes de alerta
- Redirección al dashboard tras login exitoso

### `admin/dashboard.html`

Panel de administración:
- Navegación para usuarios, productos y carritos
- Área dinámica para mostrar tablas y detalles
- Modal para ver detalles de usuario

### `js/loginService.js`

Lógica de autenticación:
- Envía credenciales a DummyJSON
- Maneja respuestas y muestra alertas
- Guarda el token en `localStorage` y redirige al dashboard

### `js/dashboardService.js`

Control de acceso al dashboard:
- Verifica la existencia del token
- Permite cerrar sesión (elimina token y redirige al login)

### `js/userService.js`

Gestión de usuarios:
- Obtiene y muestra la lista de usuarios en una tabla
- Permite ver detalles de usuario en un modal
- Maneja errores de la API

### `js/productService.js`

Gestión de productos:
- Obtiene y muestra productos en una tabla paginada
- Visualiza propiedades como nombre, año y color

### `js/cartService.js`

Gestión de carritos:
- Obtiene y muestra carritos en una tabla
- Permite ver detalles de cada carrito (función `getCart` pendiente de implementación)

---

## Flujo de la Aplicación

1. **Login:**  
   El usuario accede a `index.html`, ingresa sus credenciales y, si son válidas, es redirigido al dashboard.

2. **Dashboard:**  
   En `admin/dashboard.html`, el usuario puede navegar entre usuarios, productos y carritos.  
   - Al seleccionar una opción, se muestra la información correspondiente en la tabla central.
   - Puede ver detalles de usuarios en un modal.
   - Puede cerrar sesión desde el botón "Salir".

3. **Seguridad:**  
   El acceso al dashboard está protegido por token. Si no existe token, se redirige al login.

---

## Desarrolladores

👨‍💻 **Larry Bohórquez** - 192359  
👨‍💻 **Joan Monroy** - 192374