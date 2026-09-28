# CODE® — iOS Vital & Medication Experience

Aplicación web interactiva construida en **Next.js** y **GSAP**, diseñada con la estética y patrones de interacción de iOS para el seguimiento de medicación y biometría de pacientes. Preparada para exportación estática y despliegue directo en **Cloudflare Pages** a través de **GitHub**.

---

## 📱 Características y Diseño

Inspirado en la interfaz médica minimalista de iOS:
- **Pantalla 1: Home Dashboard**
  - Saludo interactivo (*"Hello Shohan 👋"*).
  - Tarjeta de dispositivo con ID, avatar con halo circular suave y estado en tiempo real.
  - Indicador de adherencia con barra inclinada en franjas verdes (*slanted green striped bar*).
  - Visualizador en matriz de puntos para pastillas restantes (*40/120*).
  - Tarjetas de estado *"Keep Medication"* (menta pastel) y *"Bedtime Stories"* (lima pastel).
  - Fotografía ambiental para monitoreo de descanso.
- **Pantalla 2: Reporte Estadístico**
  - Matriz interactiva de 12 frascos de medicina (*3x4 grid*): haz clic en cualquier frasco para marcarlo como consumido y ver cómo se actualiza el contador dinámicamente.
  - Selector de período (*Daily / Weekly / Monthly*).
  - Gráfico de curvatura continua (*smooth spline SVG*) animado con GSAP con degradado coral/naranja y puntos de inspección.
- **Pantalla 3: Más Opciones / Perfil**
  - Tarjeta de perfil detallada con datos del paciente (*Edad, Email, Teléfono, ID, Póliza, Residencia*).
  - Cuadrícula de accesos directos (*Diary, Settings, Subscriptions, Health Base*).
- **Componentes iOS Nativos Simulados**:
  - **Dynamic Island**: interactiva y expandible con animación elástica de GSAP. Al hacer clic se expande mostrando la dosis programada y botón para tomarla.
  - **Bottom Dock Flotante**: barra de navegación con indicador circular oscuro que se desliza fluidamente con GSAP (`back.out`) al cambiar de pantalla.
  - **Selector de Vista**:
    - **iPhone Interactivo**: simula el dispositivo completo con botones de volumen, bloqueo, chasis de titanio y transiciones táctiles.
    - **Vista 3 Pantallas (Mockup)**: réplica exacta del mockup que muestra las 3 pantallas en paralelo para presentaciones.

---

## 🛠️ Tecnologías

- **Framework**: [Next.js](https://nextjs.org/) (App Router, TypeScript).
- **Animaciones y Transiciones**: [GSAP](https://gsap.com/) & `@gsap/react`.
- **Estilos**: Vanilla CSS moderno con tokens de diseño, CSS Grid, Flexbox y Glassmorphism (`backdrop-filter`).
- **Iconografía**: [Lucide React](https://lucide.dev/).
- **Despliegue**: Cloudflare Pages (`output: 'export'` preconfigurado en `next.config.mjs`).

---

## 🚀 Ejecución Local

1. Instalar dependencias (si no lo has hecho):
   ```bash
   npm install
   ```

2. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

3. Abrir en el navegador:
   ```
   http://localhost:3000
   ```
   *(o en el puerto asignado, e.g. `http://localhost:3005`)*

---

## ☁️ Despliegue en Cloudflare Pages vía GitHub

El proyecto está optimizado con **Static HTML Export** de Next.js, lo que permite un despliegue sin costos de cómputo en la red perimetral de Cloudflare.

### Paso 1: Subir el repositorio a GitHub
```bash
git init
git add .
git commit -m "feat: CODE® iOS experience"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

### Paso 2: Conectar con Cloudflare Pages
1. Inicia sesión en tu cuenta de [Cloudflare](https://dash.cloudflare.com/).
2. Ve al menú lateral: **Workers & Pages** > **Create application** > pestaña **Pages** > **Connect to Git**.
3. Selecciona tu repositorio de GitHub recién creado.

### Paso 3: Ajustes de Compilación en Cloudflare
Ingresa la siguiente configuración:

| Parámetro | Valor |
| :--- | :--- |
| **Framework preset** | `Next.js (Static HTML Export)` o `None` |
| **Build command** | `npm run build` |
| **Build output directory** | `out` |
| **Node.js Version** | `18` o superior (e.g. variable `NODE_VERSION: 20`) |

Haz clic en **Save and Deploy**. Cloudflare construirá el sitio automáticamente en cada `git push` a tu rama principal.
