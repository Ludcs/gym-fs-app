# Elite Knights Gym - Fullstack App 🦾

## Tech Stack

**Backend:**

- NodeJs/Express
- Sequelize ORM

**Database:**

- MySQL

**Frontend:**

- NextJs14
- TailwindCSS

## Features

- Sistema de autenticacion con **login y register** (usando _cookies y token_) + **validaciones**

- Sistema de **enrutamiento y rutas protegidas** con el _middleware_ de nextjs14

- Cuenta y panel para **admin** con:

  1. Lista de los usuarios registrados.
  1. Buscar usuario por nombre y/o apellido.
  1. Filtrar usuarios por activos o inactivos.
  1. Activar un usuario (luego de que se haya registrado).
  1. Crearle una rutina (usando un _editor de texto enriquecido (WYSIWYG)_ mediante la libreria _ReactQuill_).
  1. Actualizarle su rutina (si es que ya la tiene creada).
  1. Inactivar un usuario (el cual ya no podra ver su rutina).

- Pagina para **usuario**:

  1. Si esta **inactivo** --> vera un mensaje pidiendole que hable con la administracion del gimnasio.

  1. Si aun **no tiene rutina** --> vera un mensaje notificandoselo.

  1. Si **tiene rutina ya creada** --> la podra ver.

- Sistema de **logout**.

- Diseño **responsive** para:
  - Celulares
  - Tablets
  - Laptops
  - Desktop

# Demo Video

[Youtube Video Demo](https://www.youtube.com/watch?v=m4zLLE-5mTE&ab_channel=LuchanoEsteban)

# Screenshots

## Pagina inicial

**Celular**

![Cel](/screenshots/initial/01.png)

**Tablet**

![Tablet](/screenshots/initial/02.png)

**Laptop**

![Laptop](/screenshots/initial/03.png)

## Pagina admin

**Celular**

![Cel](/screenshots/admin/01.png)

**Tablet**

![Tablet](/screenshots/admin/02.png)

**Laptop**

![Laptop](/screenshots/admin/03.png)

## Pagina admin/create

**Celular**

![Cel](/screenshots/admin/create/01.png)

**Tablet**

![Tablet](/screenshots/admin/create/02.png)

**Laptop**

![Laptop](/screenshots/admin/create/03.png)

## Pagina home (user with routine)

**Celular**

![Cel](/screenshots/home/with-routine/01.png)

**Tablet**

![Tablet](/screenshots/home/with-routine/02.png)

**Laptop**

![Laptop](/screenshots/home/with-routine/03.png)

## Pagina home (user without routine)

**Celular**

![Cel](/screenshots/home/not-routine-yet/01.png)

**Tablet**

![Tablet](/screenshots/home/not-routine-yet/02.png)

**Laptop**

![Laptop](/screenshots/home/not-routine-yet/03.png)

## Pagina home (user not active)

**Celular**

![Cel](/screenshots/home/not-active/01.png)

**Tablet**

![Tablet](/screenshots/home/not-active/02.png)

**Laptop**

![Laptop](/screenshots/home/not-active/03.png)

## DB

![DbER](/screenshots/db/diagrama-er.JPG)

![DbER](/screenshots/db/user-props.JPG)

![DbER](/screenshots/db/routine-props.JPG)
