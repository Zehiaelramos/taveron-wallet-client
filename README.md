# Taveron Wallet - Frontend 💳📱

Bienvenido al repositorio del cliente de **Taveron Wallet**, una aplicación web moderna y segura diseñada para la gestión de métodos de pago con una experiencia de usuario premium tipo Fintech.

## ✨ Características Principales

- **🛡️ Autenticación Segura:** Sistema de Login y Registro basado en JWT.
- **💳 Gestión de Billetera:** CRUD completo de tarjetas de crédito/débito y cuentas bancarias (CLABE).
- **🔒 Privacidad de Datos:** Enmascaramiento de información sensible con lógica de "revelado" bajo demanda.
- **🎨 Diseño Premium:** Interfaz Dark Mode con estética Glassmorphism, micro-animaciones y diseño Mobile-First.
- **⚡ Rendimiento:** Construido sobre Vite para una experiencia de desarrollo y carga ultrarrápida.

## 🛠️ Stack Tecnológico

- **Core:** [React 18+](https://reactjs.org/) & [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Animaciones:** [Framer Motion](https://www.framer.com/motion/)
- **Gestión de Estado:** [TanStack Query (React Query)](https://tanstack.com/query/latest) & Context API
- **Iconos:** [Lucide React](https://lucide.dev/)

## 🚀 Configuración del Proyecto

### Requisitos Previos
- [Node.js](https://nodejs.org/) (v16 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)
- Backend de Taveron Wallet ejecutándose (por defecto en `http://127.0.0.1:8000`)

### Instalación
1. Clonar el repositorio:
   ```bash
   git clone <repo-url>
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```

### Variables de Envío
Crea un archivo `.env` en la raíz del proyecto y añade la URL de tu backend:
```env
VITE_API_URL=http://127.0.0.1:8000
```

### Ejecución
Para iniciar el servidor de desarrollo:
```bash
npm run dev
```

---

## 📂 Estructura y Documentación

Para entender mejor el proceso de desarrollo y la arquitectura, consulta los siguientes documentos:

- 🗺️ **[PLANNING.md](./PLANNING.md):** Hoja de ruta y seguimiento del progreso.
- 🏗️ **[FRONTEND.md](./FRONTEND.md):** Plan detallado de implementación técnica.
- 🎨 **[FRONTEND_INSTRUCTIONS.md](./FRONTEND_INSTRUCTIONS.md):** Guía de diseño y requerimientos originales.

---

## 🔐 Seguridad
Esta aplicación maneja datos financieros sensibles. Se han implementado las siguientes medidas:
1. No se almacenan datos sensibles en texto plano en el estado global.
2. Los tokens JWT se gestionan de forma segura para evitar ataques XSS.
3. El frontend actúa como un visor; el descifrado real de los datos ocurre siempre en el servidor.
