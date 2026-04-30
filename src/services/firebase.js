// ==========================================
// SERVICIO FIREBASE — Repostería Creativa
// ==========================================
// Este archivo maneja la conexión con Firebase Firestore.
// Funciona en MODO DEMO (localStorage) hasta que configures
// tus credenciales reales en .env.local
// ==========================================

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';

// Configuración - se lee de variables de entorno
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Detectar si Firebase está configurado
const isFirebaseConfigured = !!firebaseConfig.apiKey && !!firebaseConfig.projectId;

let db = null;

if (isFirebaseConfigured) {
  try {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log('✅ Firebase conectado correctamente');
  } catch (error) {
    console.warn('⚠️ Error al inicializar Firebase, usando modo demo:', error);
  }
} else {
  console.log('ℹ️ Firebase no configurado. Funcionando en MODO DEMO (localStorage).');
  console.log('   Para activar Firebase: crea un archivo .env.local con tus credenciales.');
}

// ==========================================
// Guardar pedido
// ==========================================
export async function saveOrder(order) {
  // Modo Firebase
  if (db) {
    const docRef = await addDoc(collection(db, 'pedidos'), order);
    return docRef.id;
  }

  // Modo Demo (localStorage)
  return saveOrderLocal(order);
}

// ==========================================
// Obtener todos los pedidos
// ==========================================
export async function getOrders() {
  if (db) {
    const q = query(collection(db, 'pedidos'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  return getOrdersLocal();
}

// ==========================================
// Modo Demo — localStorage
// ==========================================
function saveOrderLocal(order) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const orders = JSON.parse(localStorage.getItem('reposteria_orders') || '[]');
      const id = `demo_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      const newOrder = { id, ...order };
      orders.unshift(newOrder);
      localStorage.setItem('reposteria_orders', JSON.stringify(orders));
      console.log('✅ Pedido guardado (modo demo):', newOrder);
      resolve(id);
    }, 800); // Simulamos delay de red
  });
}

function getOrdersLocal() {
  return JSON.parse(localStorage.getItem('reposteria_orders') || '[]');
}

export { isFirebaseConfigured };
