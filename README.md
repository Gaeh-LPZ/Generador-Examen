## Equipo de Desarrollo
Proyecto realizado por:
* **Gael López Bautista** (Ingeniería en Computación, Grupo 602-A).
* **Erick Iván Valeriano Santiago** (Ingeniería en Computación, Grupo 602-A).

# Generador de Exámenes con IA

Este proyecto es una plataforma web innovadora diseñada para automatizar la creación, gestión y aplicación de evaluaciones académicas, enfocada específicamente en el área de programación web. Su característica principal es el aprovechamiento de la **Inteligencia Artificial** para dinamizar el aprendizaje.

## Descripción del Proyecto
La aplicación funciona como un ecosistema integral donde los docentes y/o administradores pueden generar bancos de preguntas de alta calidad técnica de forma instantánea. Gracias a la integración con la **API de Google Gemini**, el sistema es capaz de crear reactivos precisos y variados, eliminando la carga administrativa de la creación manual de exámenes.

El sistema permite a los estudiantes poner a prueba sus conocimientos en una interfaz interactiva, manteniendo un seguimiento detallado de su progreso y puntajes obtenidos a través de un perfil personalizado.

---

## Stack Tecnológico

El desarrollo se basó en tecnologías de última generación para garantizar un rendimiento óptimo y una arquitectura escalable:

* **Frontend**: [Next.js 16](https://nextjs.org/) (App Router) y [React 19](https://react.dev/), utilizando **Tailwind CSS** para un diseño responsivo y moderno.
* **Backend**: Implementado con **Server Actions** para una comunicación segura y eficiente entre el cliente y el servidor.
* **Base de Datos**: **PostgreSQL** montado sobre un contenedor de **Docker** para asegurar un entorno de desarrollo consistente.
* **ORM**: [Prisma 7](https://www.prisma.io/), facilitando la gestión de modelos y la integridad de los datos de usuarios y preguntas.
* **Autenticación**: [Auth.js (NextAuth)](https://authjs.dev/) para el manejo de sesiones seguras y protección de rutas.
* **IA Generativa**: Conexión directa con la API de **Google Gemini 2.0** para la nutrición automática del banco de preguntas.

---

## Funcionalidades Principales

### Generación de Contenido con IA
A través de un módulo especializado, el sistema se comunica con Gemini para generar preguntas de opción múltiple sobre desarrollo web, las cuales se formatean e insertan automáticamente en la base de datos.

### Interfaz de Evaluación (Juego)
Una sección interactiva donde el usuario puede responder las preguntas generadas, interactuando con la interfaz para validar sus conocimientos en tiempo real.

### Gestión de Perfiles
Sistema de autenticación que permite a cada usuario tener una identidad propia, consultar su puntaje acumulado y visualizar su progreso dentro de la plataforma.

### Panel de Administración (CRUD)
Herramienta visual para que los administradores puedan gestionar manualmente el banco de preguntas (Crear, Leer, Actualizar y Eliminar) y supervisar el crecimiento del sistema.

---

