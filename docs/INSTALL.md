# Guía de Instalación y Configuración 🛠️🚀

Bienvenido al manual de configuración de **Taveron Wallet**. Sigue estos pasos para levantar el ecosistema completo (Frontend + Backend) en tu entorno local.

---

## 📋 Requisitos Previos
Antes de comenzar, asegúrate de tener instalado:
- **Node.js** (v18.0.0 o superior)
- **Python** (v3.10 o superior)
- **PostgreSQL** (Instancia local, Docker o servicio en la nube)
- **Git**

---

## 🖥️ 1. Configuración del Frontend (React + Vite)

1. **Clonar y Acceder**:
   Accede al directorio del cliente:
   ```bash
   cd taveron-wallet-client
   ```

2. **Instalación**:
   Descarga los paquetes de npm:
   ```bash
   npm install
   ```

3. **Variables de Entorno**:
   Configura la URL de la API:
   ```bash
   cp .env.example .env
   ```
   Verifica que `VITE_API_URL=http://127.0.0.1:8000`.

4. **Ejecución**:
   Inicia el entorno de desarrollo:
   ```bash
   npm run dev
   ```
   Aplicación activa en: `http://localhost:5173` (o el puerto que asigne Vite).

---

