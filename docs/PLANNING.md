# Hoja de Ruta de Desarrollo Frontend (PLANNING.md) 📅

Este documento describe el plan de ejecución para la interfaz de usuario de **Taveron Wallet**, integrándose con el backend existente y enfocándose en una experiencia premium.

---

## 🏗 Fase 1: Cimientos y Configuración
**Objetivo:** Tener un entorno de desarrollo moderno y la base de estilos configurada.

- [x] **1.1 Inicialización de Proyecto**
    - [x] Crear proyecto con Vite (React + TypeScript).
    - [x] Instalar dependencias base (Axios, React Router, Lucide).
    - [x] Configurar variables de entorno (`.env`) para el backend.
- [x] **1.2 Diseño y Estilos Base**
    - [x] Configurar Tailwind CSS con paleta Dark Mode Fintech.
    - [x] Definir tipografía premium e instalar fuentes necesarias.
    - [x] Crear variables CSS para efectos de Glassmorphism.
- [x] **1.3 Cliente de API**
    - [x] Configurar instancia de Axios con `baseURL`.
    - [x] Implementar manejo básico de errores de red.

## 🔐 Fase 2: Autenticación y Usuarios
**Objetivo:** Permitir el acceso seguro y la gestión de sesión del usuario.

- [x] **2.1 Gestión de Estado de Auth**
    - [x] Crear `AuthContext` para manejar el JWT.
    - [x] Implementar persistencia de sesión en `localStorage`.
- [x] **2.2 Desarrollo de Pantallas**
    - [x] Vista de Login con validaciones de formulario.
    - [x] Vista de Registro de nuevos usuarios.
- [x] **2.3 Seguridad y Rutas**
    - [x] Implementar interceptores de Axios para el `Bearer Token`.
    - [x] Crear componentes de `ProtectedRoute` para el Dashboard.

## 💳 Fase 3: Dashboard y Billetera (Core)
**Objetivo:** Visualización principal de la billetera y listado de métodos.

- [x] **3.1 Layout y Navegación**
    - [x] Diseñar el Layout principal con Sidebar y perfil de usuario.
    - [x] Implementar consumo de `/users/me` para el header.
- [x] **3.2 Visualización de Tarjetas**
    - [x] Crear componente `PaymentMethodCard` con estética física.
    - [x] Implementar listado dinámico consumiendo `GET /payment-methods/`.
- [x] **3.3 Filtros y Paginación**
    - [x] Agregar filtros por tipo (Tarjeta, CLABE) en la UI.
    - [x] Implementar carga perezosa o paginación en el listado.

## 👁️ Fase 4: Operaciones y Datos Sensibles
**Objetivo:** Permitir la creación, edición y visualización protegida de datos.

- [x] **4.1 Registro de Métodos**
    - [x] Crear formulario modal para añadir nuevos métodos de pago.
    - [x] Validar formatos de entrada (Luhn para tarjetas, 18 dígitos para CLABE).
- [x] **4.2 Acciones de Gestión**
    - [x] Botón de "Revelar" que consume el detalle descifrado del backend.
    - [x] Implementar cambios de estatus (Activo/Inactivo) vía `PATCH`.
    - [x] Flujo de eliminación con confirmación.

## 💎 Fase 5: UX/UI Premium y Calidad
**Objetivo:** Elevar la experiencia de usuario y asegurar la robustez.

- [x] **5.1 Animaciones y Transiciones**
    - [x] Implementar transiciones de página y entradas suaves con Framer Motion.
    - [x] Añadir micro-interacciones en botones y estados hover.
- [x] **5.2 Feedback y Notificaciones**
    - [x] Sistema de Toasts para confirmación de acciones exitosas/errores.
    - [x] Implementar Skeletons para estados de carga.
- [x] **5.3 Responsividad**
    - [x] Optimizar todas las vistas para dispositivos móviles.

## 🎨 Fase 6: Personalización y Configuración
**Objetivo:** Permitir al usuario adaptar la plataforma a sus preferencias visuales y regionales.

- [x] **6.1 Sistema de Temas y Acentos**
    - [x] Implementar selector de colores de acento (Taveron Green, Ocean Blue, Sunset Orange).
    - [x] Persistencia de preferencias en LocalStorage/API.
- [x] **6.2 Preferencias Regionales**
    - [x] Selector de moneda predeterminada (MXN, USD, EUR).
    - [x] Ajuste de formatos de fecha y números.
- [x] **6.3 Gestión de Cuenta Básica**
    - [x] Formulario de actualización de perfil (Nombre/Apellido).
- [x] **6.4 Refactorización y Modularización**
    - [x] Dividir Settings.tsx en sub-componentes (Appearance, Regional, Profile).
    - [x] Implementar navegación por pestañas funcional (Active Tab).

---

## 📈 Estado del Proyecto
| Fase | Estado | Progreso |
| :--- | :--- | :--- |
| Fase 1 | ✅ Completado | 100% |
| Fase 2 | ✅ Completado | 100% |
| Fase 3 | ✅ Completado | 100% |
| Fase 4 | ✅ Completado | 100% |
| Fase 5 | ✅ Completado | 100% |
| Fase 6 | ✅ Completado | 100% |
