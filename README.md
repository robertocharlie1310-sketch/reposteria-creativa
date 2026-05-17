# 🍰 Repostería Creativa

> Aplicación e-commerce de pastelería artesanal con personalización a medida y pagos en línea.

**Proyecto SCRUM — Sprint 1 y Sprint 2 (Completados)**  
**Materia:** Proyecto II  
**Autor:** Roberto Carlos Ortiz González  
**Universidad:** Universidad de Guadalajara  

---

## 🎯 Sobre el proyecto

Aplicación web interactiva que permite a los clientes explorar un catálogo visual de postres artesanales, personalizar sabor, tamaño y cantidad, y realizar pagos en línea con tarjeta mediante Stripe. El sistema digitaliza la toma de pedidos y reduce la carga administrativa del negocio.

### Historias de usuario completadas

| ID    | Historia de Usuario                                                        | Sprint   | Estado     |
|-------|----------------------------------------------------------------------------|----------|------------|
| US01  | Como cliente, quiero ver el catálogo visual de postres                     | Sprint 1 | ✅ Terminado |
| US02  | Como cliente, quiero personalizar el sabor y tamaño del postre             | Sprint 1 | ✅ Terminado |
| US03  | Como cliente, quiero pagar en línea con tarjeta para finalizar mi pedido   | Sprint 2 | ✅ Terminado |
| US06  | Como cliente, quiero ver la etiqueta "Más Vendido" para identificar favoritos | Sprint 2 | ✅ Terminado |

---

## 🚀 Instalación y uso

### Requisitos previos
- [Node.js](https://nodejs.org/) versión 18 o superior
- npm (incluido con Node.js)

### Pasos para correr el proyecto

```bash
# 1. Clonar el repositorio
git clone https://github.com/robertocharlie1310-sketch/reposteria-creativa.git
cd reposteria-creativa

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# Edita .env.local con tus credenciales (ver sección siguiente)

# 4. Iniciar el servidor de desarrollo
npm run dev

# 5. Abrir en el navegador
# http://localhost:5173
```

> 💡 La app funciona en **MODO DEMO** (pedidos en localStorage) si no configuras las variables de entorno.

---

## 🔑 Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto con los siguientes valores:

```env
# Firebase
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=reposteria-creativa.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=reposteria-creativa
VITE_FIREBASE_STORAGE_BUCKET=reposteria-creativa.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123:web:abc...

# Stripe (sandbox)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

> ⚠️ Nunca subas `.env.local` al repositorio. Está incluido en `.gitignore`.

---

## 💳 Pruebas de pago con Stripe (sandbox)

El sistema usa Stripe en **modo sandbox** (entorno de pruebas). No se realizan cobros reales.

Para probar el flujo de pago usa esta tarjeta de prueba:

| Campo    | Valor                  |
|----------|------------------------|
| Número   | `4242 4242 4242 4242`  |
| Fecha    | Cualquiera futura (ej. `12/26`) |
| CVC      | Cualquier 3 dígitos (ej. `123`) |
| CP       | Cualquier 5 dígitos (ej. `44100`) |

### Flujo completo de pago
1. Selecciona un postre del catálogo
2. Personaliza sabor, tamaño y cantidad
3. Clic en **"Continuar con el pedido"**
4. Llena el formulario y selecciona **"Tarjeta de crédito / débito"**
5. Clic en **"Continuar al pago"**
6. Ingresa la tarjeta de prueba
7. Clic en **"Pagar $XXX"**
8. El pedido se guarda en Firestore con `paymentStatus: "pagado_sandbox"`

---

## 🔥 Configuración de Firebase

### 1. Crear proyecto en Firebase
1. Entra a https://console.firebase.google.com/
2. Clic en **"Agregar proyecto"**
3. Nombra el proyecto: `reposteria-creativa`

### 2. Activar Firestore
1. Menú izquierdo → **"Firestore Database"**
2. Clic en **"Crear base de datos"** → Modo de prueba
3. Ubicación: `southamerica-east1`

### 3. Obtener credenciales
1. Ícono ⚙️ → **"Configuración del proyecto"**
2. Pestaña **"General"** → **"Tus apps"** → ícono `</>`
3. Copia el objeto `firebaseConfig` y pégalo en `.env.local`

### 4. Ver pedidos guardados
- Firebase Console → **Firestore Database** → colección `pedidos`
- Cada pedido incluye datos del cliente, del postre, método de pago y `stripePaymentMethodId`

---

## 🛠️ Stack tecnológico

| Tecnología              | Uso                                        |
|-------------------------|--------------------------------------------|
| **React 18**            | Framework UI                               |
| **Vite**                | Build tool y dev server                    |
| **Tailwind CSS**        | Sistema de diseño utility-first            |
| **Firebase Firestore**  | Base de datos para pedidos                 |
| **Firebase Auth**       | Autenticación (configurada)                |
| **Stripe.js**           | Pasarela de pago en línea (sandbox)        |
| **@stripe/react-stripe-js** | Componentes de Stripe para React       |
| **Fraunces**            | Tipografía display (Google Fonts)          |
| **Inter**               | Tipografía body (Google Fonts)             |

---

## 📂 Estructura del proyecto
reposteria-creativa/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Navegación principal
│   │   ├── Hero.jsx            # Sección principal
│   │   ├── Marquee.jsx         # Banda de mensajes scroll
│   │   ├── Catalog.jsx         # Grid de postres con etiqueta "Más Vendido"
│   │   ├── DessertCard.jsx     # Card individual de postre
│   │   ├── CustomizeModal.jsx  # US02 — Personalización de pedido
│   │   ├── OrderForm.jsx       # Formulario de pedido + flujo de pago
│   │   ├── CheckoutForm.jsx    # US03 — Formulario de tarjeta con Stripe Elements
│   │   └── Footer.jsx          # Pie de página
│   ├── data/
│   │   └── desserts.js         # Catálogo de postres con banderas de popularidad
│   ├── services/
│   │   └── firebase.js         # Conexión con Firestore (modo real + modo demo)
│   ├── App.jsx                 # Componente raíz
│   ├── main.jsx                # Entry point
│   └── index.css               # Estilos globales
├── .env.example                # Plantilla de variables de entorno
├── .env.local                  # Credenciales reales (no se sube al repo)
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
---

## 🎨 Decisiones de diseño

- **Tipografía editorial:** Fraunces (display serif) + Inter (body sans-serif).
- **Paleta restringida:** Blanco / negro / crema. Refleja elegancia gourmet.
- **Asimetría intencional:** Layouts en grid de 12 columnas con desplazamientos calculados.
- **Microinteracciones:** Hover suave en cards, animaciones staggered, transiciones ease-out.
- **Mobile first:** Responsive desde 320px hasta 4K.
- **Modo mockup:** Se activa automáticamente cuando no se detecta `.env.local`, usando localStorage para facilitar revisiones sin credenciales.

---

## 📝 Scripts disponibles

```bash
npm run dev       # Servidor de desarrollo
npm run build     # Build de producción
npm run preview   # Preview del build
```

---

## 📌 Roadmap

### Sprint 1 ✅ Completado
- [x] Catálogo visual interactivo (US01)
- [x] Personalización de sabor, tamaño y cantidad (US02)
- [x] Diseño responsive mobile-first
- [x] Integración base con Firebase Firestore

### Sprint 2 ✅ Completado
- [x] Pasarela de pagos con Stripe sandbox (US03)
- [x] Etiqueta "Más Vendido" con banderas de popularidad en Firestore (US06)
- [x] Modo mockup con localStorage

---

## 👥 Equipo SCRUM — Proyecto II

| Rol           | Responsable                     |
|---------------|---------------------------------|
| Scrum Master  | Carlos Rodríguez Caballero      |
| Product Owner | Blanca Viridiana Jauregui del Muro |
| Backend Dev   | Roberto Carlos Ortiz González   |
| Frontend Dev  | Diana Ornelas Ricardo           |

---

## 📄 Licencia

Proyecto académico — Universidad de Guadalajara, 2026.