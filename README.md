# AutoVeritas Dashboard

Sistema de gestión para concesionario de vehículos desarrollado con React, TypeScript y Tailwind CSS.

## Descripción

AutoVeritas Dashboard es una aplicación web diseñada para la administración interna de un dealer de vehículos. Permite gestionar vehículos, empleados, usuarios y ventas desde una interfaz moderna y responsiva.

El proyecto fue desarrollado como una Single Page Application (SPA) utilizando React y TypeScript, siguiendo una arquitectura basada en componentes para facilitar el mantenimiento y la escalabilidad del código.

## Características

### Dashboard

* Visualización de métricas principales.
* Tarjetas de indicadores.
* Gráficos de ventas.
* Resumen general del negocio.

### Gestión de Vehículos

* Registro de nuevos vehículos.
* Listado de vehículos disponibles.
* Búsqueda de vehículos.
* Eliminación de registros.

### Gestión de Empleados

* Registro de empleados.
* Consulta de información del personal.
* Búsqueda de empleados.
* Eliminación de registros.

### Gestión de Usuarios

* Creación de usuarios del sistema.
* Asociación de usuarios a empleados.
* Gestión de roles.
* Búsqueda de usuarios.
* Eliminación de usuarios.

### Gestión de Ventas

* Registro de ventas.
* Visualización de historial de ventas.
* Seguimiento de transacciones.

## Tecnologías Utilizadas

* React
* TypeScript
* Tailwind CSS
* Lucide React
* Vite

## Estructura del Proyecto

```text
src/
│
├── components/
│   ├── auth/
│   ├── dashboard/
│   ├── empleados/
│   ├── layout/
│   ├── usuarios/
│   ├── vehiculos/
│   └── ventas/
│
├── data/
│
├── helpers/
│
├── types/
│
├── App.tsx
└── main.tsx
```

## Instalación

### Clonar el repositorio

```bash
git clone <url-del-repositorio>
```

### Entrar al proyecto

```bash
cd autoveritas-dashboard
```

### Instalar dependencias

```bash
npm install
```

### Ejecutar en modo desarrollo

```bash
npm run dev
```

La aplicación estará disponible en:

```text
http://localhost:5173
```

## Construcción para Producción

```bash
npm run build
```

## Vista Previa de Producción

```bash
npm run preview
```

## Usuarios de Prueba

Los usuarios iniciales se encuentran definidos en los archivos de datos del proyecto.

Ejemplo:

| Usuario   | Rol           |
| --------- | ------------- |
| admin     | Administrador |
| vendedor1 | Empleado      |

> Las credenciales pueden variar según la configuración actual del archivo de datos.

## Arquitectura

El proyecto utiliza una arquitectura basada en componentes reutilizables.

Principios aplicados:

* Separación de responsabilidades.
* Componentes desacoplados.
* Tipado fuerte mediante TypeScript.
* Reutilización de componentes.
* Organización modular por funcionalidad.

## Estado Actual

Actualmente la aplicación utiliza datos simulados almacenados localmente mediante archivos TypeScript.

En futuras versiones se contempla la integración con una Web API para:

* Persistencia en base de datos.
* Autenticación real de usuarios.
* Gestión de roles y permisos.
* Reportes y estadísticas avanzadas.

## Autor
Bierka Vallejo
Hianny Marte
Camila Hierro
Yohandel Cuevas Morillo

## Licencia

Proyecto desarrollado con fines académicos y educativos.
