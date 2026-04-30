# 🍰 Repostería Creativa

> Aplicación e-commerce de pastelería artesanal con personalización a medida.

**Proyecto SCRUM — Sprint 1 (MVP)**
**Materia:** Proyecto II
**Autor:** Roberto Carlos Ortiz González
**Universidad:** Universidad de Guadalajara

---

## 🎯 Sobre el proyecto

Aplicación web interactiva que permite a los clientes explorar un catálogo visual de postres artesanales, personalizar sabor, tamaño y cantidad, y realizar pedidos en línea. El sistema digitaliza la toma de pedidos y reduce la carga administrativa del equipo de pastelería.

### Sprint 1 — Entregables (Estado: TERMINADO ✅)

| ID    | Historia de Usuario                                       | Estado     |
|-------|-----------------------------------------------------------|------------|
| US01  | Como cliente, quiero ver el catálogo visual de postres    | Terminado  |
| US02  | Como cliente, quiero personalizar el sabor y tamaño       | Terminado  |

---

## 🚀 Instalación y uso

### Requisitos previos
- [Node.js](https://nodejs.org/) versión 18 o superior
- npm (incluido con Node.js)

### Pasos para correr el proyecto

```bash
# 1. Clonar el repositorio
git clone https://github.com/TU-USUARIO/reposteria-creativa.git
cd reposteria-creativa

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm run dev

# 4. Abrir en el navegador
# http://localhost:5173
```

> 💡 La app funciona inmediatamente en **MODO DEMO** (los pedidos se guardan en el navegador). Para usar Firebase real, mira la sección siguiente.

---

## 🔥 Configuración de Firebase (opcional)

Para guardar pedidos en una base de datos real:

### 1. Crear proyecto en Firebase
1. Entra a https://console.firebase.google.com/
2. Click en **"Agregar proyecto"** y sigue los pasos
3. Nombra tu proyecto: `reposteria-creativa`

### 2. Activar Firestore
1. En el menú izquierdo: **"Firestore Database"**
2. Click **"Crear base de datos"**
3. Modo: **"Modo de prueba"** (luego configuramos reglas)
4. Ubicación: la más cercana (ej: `southamerica-east1`)

### 3. Obtener credenciales
1. Click en el ícono de engrane ⚙️ → **"Configuración del proyecto"**
2. Pestaña **"General"** → baja hasta **"Tus apps"**
3. Click en el ícono `</>` (Web)
4. Registra la app con cualquier nombre
5. Copia el objeto `firebaseConfig`

### 4. Configurar variables de entorno
1. Copia `.env.example` y renómbralo a `.env.local`
2. Pega los valores de tu `firebaseConfig`
3. Reinicia el servidor: `npm run dev`

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=reposteria-creativa.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=reposteria-creativa
VITE_FIREBASE_STORAGE_BUCKET=reposteria-creativa.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123:web:abc...
```

### 5. Ver pedidos en Firestore
- Console Firebase → **Firestore Database** → colección `pedidos`

---

## 🛠️ Stack tecnológico

| Tecnología       | Uso                                |
|------------------|------------------------------------|
| **React 18**     | Framework UI                       |
| **Vite**         | Build tool y dev server            |
| **Tailwind CSS** | Sistema de diseño utility-first    |
| **Firebase**     | Backend (Firestore para pedidos)   |
| **Fraunces**     | Tipografía display (Google Fonts)  |
| **Inter**        | Tipografía body (Google Fonts)     |

---

## 📂 Estructura del proyecto

```
reposteria-creativa/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Navegación principal
│   │   ├── Hero.jsx            # Sección principal
│   │   ├── Marquee.jsx         # Banda de mensajes scroll
│   │   ├── Catalog.jsx         # Grid de postres
│   │   ├── DessertCard.jsx     # Card individual
│   │   ├── CustomizeModal.jsx  # US02 - Personalización
│   │   ├── OrderForm.jsx       # Formulario de pedido
│   │   └── Footer.jsx          # Pie de página
│   ├── data/
│   │   └── desserts.js         # Catálogo (US01)
│   ├── services/
│   │   └── firebase.js         # Integración con Firebase
│   ├── App.jsx                 # Componente raíz
│   ├── main.jsx                # Entry point
│   └── index.css               # Estilos globales
├── .env.example                # Plantilla de credenciales
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 🎨 Decisiones de diseño

- **Tipografía editorial:** Fraunces (display serif con personalidad) + Inter (body sans-serif moderna).
- **Paleta restringida:** Blanco/negro/crema con acentos sutiles. Refleja la elegancia gourmet.
- **Asimetría intencional:** Layouts en grid de 12 columnas con desplazamientos calculados.
- **Microinteracciones:** Hover suave en cards, animaciones staggered en hero, transiciones ease-out.
- **Mobile first:** Responsive desde 320px hasta 4K.

---

## 📝 Scripts disponibles

```bash
npm run dev       # Servidor de desarrollo
npm run build     # Build de producción
npm run preview   # Preview del build
```

---

## 📌 Roadmap

### Sprint 1 ✅ COMPLETADO
- [x] Catálogo visual interactivo (US01)
- [x] Personalización de sabor, tamaño y cantidad (US02)
- [x] Diseño responsive mobile-first
- [x] Integración base con Firebase

### Sprint 2 (En proceso)
- [ ] Etiqueta "Más Vendido" (US06 — nueva tras Sprint Review)
- [ ] Pasarela de pagos con Stripe (US03)
- [ ] Pruebas de seguridad en transacciones

### Sprint 3 (Planeado)
- [ ] Sistema de autenticación de usuarios (US04)
- [ ] Historial de pedidos
- [ ] Integración con Uber Direct para envíos (US05)

---

## 👥 Equipo SCRUM

| Rol           | Responsable                      |
|---------------|----------------------------------|
| Product Owner | Stakeholder (Chef Víctor)        |
| Scrum Master  | Roberto Carlos Ortiz González    |
| UI/UX         | Carlos                           |
| Desarrollo    | Ana                              |
| QA            | Roberto                          |

---

## 📄 Licencia

Proyecto académico — Universidad de Guadalajara, 2026.
