# Plan de Implementación: Frontend Wallet Segura (React)

Este documento detalla el plan paso a paso para construir la interfaz de usuario de la aplicación **Taveron Wallet**, enfocándose en una experiencia de usuario premium, seguridad en el manejo de datos y una integración fluida con el backend de FastAPI.

## 🛠 Stack Tecnológico Propuesto

- **Framework:** React 18+ con Vite (Rápido, moderno y eficiente).
- **Estilizado:** Tailwind CSS (Para un diseño "Fintech" altamente personalizado).
- **Iconografía:** Lucide React (Minimalista y consistente).
- **Animaciones:** Framer Motion (Para micro-animaciones y transiciones suaves).
- **Gestión de Estado & API:** 
    - Axios (Cliente HTTP).
    - TanStack Query (React Query) para caching, sincronización y manejo de estados de carga.
    - React Context API para el estado global de autenticación.
- **Enrutamiento:** React Router 6.

---

## 🏗 Arquitectura del Proyecto (Modular & Escalable)

Se propone una estructura organizada por responsabilidades para facilitar el mantenimiento:

```text
src/
├── api/                # Instancia de Axios e interceptores (Auth)
├── components/         # Componentes reutilizables (UI, Layouts, Forms)
│   ├── ui/             # Botones, Inputs, Cards (estilo Glassmorphism)
│   └── features/       # Componentes ligados a lógica (WalletCard, AuthForm)
├── hooks/              # Custom hooks (useAuth, usePaymentMethods)
├── layouts/            # Estructuras de página (AuthLayout, MainLayout)
├── pages/              # Vistas principales (Login, Dashboard, Profile)
├── context/            # Contexto de Autenticación
├── utils/              # Formateadores, validaciones y constantes
└── App.tsx             # Configuración de rutas y providers
```

---

## 📝 Fases de Desarrollo

### Fase 1: Configuración Inicial
1.  **Entorno:** Inicializar proyecto con Vite (`react-ts`) y configurar Tailwind CSS.
2.  **API Client:** Configurar instancia de Axios con `baseURL` apuntando al backend y un interceptor para adjuntar el `Authorization: Bearer <token>`.
3.  **Diseño Base:** Configurar paleta de colores Dark Mode (`#0f172a`) y fuentes premium (Inter/Geist).

### Fase 2: Autenticación (Auth Flow)
1.  **Contexto:** Crear `AuthContext` para gestionar el JWT almacenado en `localStorage`.
2.  **Pantallas:**
    - `Login`: Formulario con validación y manejo de Form Data para FastAPI.
    - `Registro`: Creación de cuenta.
3.  **Protección:** Implementar `ProtectedRoute` para redirigir al Login si no hay token.

### Fase 3: Dashboard y Wallet UI
1.  **UI de Tarjetas:** Crear el componente `PaymentMethodCard` con estética física (degradados, glassmorphism).
2.  **Dashboard:**
    - Consumo de `GET /payment-methods/`.
    - Implementar filtros por tipo (Tarjeta/CLABE).
    - Estado de carga (Skeletons) con React Query.
3.  **Creación:** Formulario modal para añadir nuevos métodos mediante `POST`.

### Fase 4: Gestión y Datos Sensibles
1.  **Detalle:** Vista o Modal para ver la información completa de un método.
2.  **Seguridad UI:** Implementar el botón "Revelar" que dispare la petición a `GET /payment-methods/{id}` para mostrar el número real (enmascarado por defecto).
3.  **Acciones:**
    - `PATCH`: Botón para alternar estatus (Activo/Inactivo).
    - `DELETE`: Confirmación de borrado lógico.

### Fase 5: Pulido Premium (UX/UI)
1.  **Micro-animaciones:** Agregar efectos hover y transiciones de entrada con Framer Motion.
2.  **Feedback:** Notificaciones (Toasts) para éxitos y errores de la API.
3.  **Responsividad:** Asegurar que la experiencia sea fluida en móviles (Mobile-First).

---

## 🔒 Consideraciones de Seguridad
- **Persistence:** El JWT se guardará en `localStorage`. Se implementará un interceptor que, ante un error `401`, limpie el storage y redirija al login.
- **Data Masking:** El frontend nunca "conoce" el dato sensible hasta que el usuario solicita explícitamente "Revelar", minimizando la exposición de datos en memoria.
- **Sanitización:** Validar formatos de entrada (ej. CLABE de 18 dígitos) antes de enviar al servidor.

---

## 🚀 Próximos Pasos
¿Te gustaría comenzar con la **Fase 1 (Configuración de Vite y Tailwind)** o prefieres que definamos primero el diseño de los componentes UI?
