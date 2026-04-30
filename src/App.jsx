import { useState, useEffect } from 'react';
import { desserts, categories } from './data/desserts';
import Header from './components/Header';
import Hero from './components/Hero';
import Catalog from './components/Catalog';
import CustomizeModal from './components/CustomizeModal';
import OrderForm from './components/OrderForm';
import Footer from './components/Footer';
import Marquee from './components/Marquee';

function App() {
  const [selectedDessert, setSelectedDessert] = useState(null);
  const [orderItem, setOrderItem] = useState(null);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  // Filtrar postres por categoría
  const filteredDesserts = activeCategory === 'all'
    ? desserts
    : desserts.filter(d => d.category === activeCategory);

  // Abrir modal de personalización
  const handleCustomize = (dessert) => {
    setSelectedDessert(dessert);
  };

  // Confirmar personalización y pasar al formulario de pedido
  const handleConfirmCustomization = (customizedItem) => {
    setOrderItem(customizedItem);
    setSelectedDessert(null);
    setShowOrderForm(true);
  };

  // Cerrar formulario de pedido
  const handleCloseOrder = () => {
    setShowOrderForm(false);
    setOrderItem(null);
  };

  // Lock scroll cuando hay modal abierto
  useEffect(() => {
    if (selectedDessert || showOrderForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedDessert, showOrderForm]);

  return (
    <div className="min-h-screen bg-paper text-ink grain-overlay">
      <Header />
      <Hero />
      <Marquee />
      <Catalog
        desserts={filteredDesserts}
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onCustomize={handleCustomize}
      />
      <Footer />

      {selectedDessert && (
        <CustomizeModal
          dessert={selectedDessert}
          onClose={() => setSelectedDessert(null)}
          onConfirm={handleConfirmCustomization}
        />
      )}

      {showOrderForm && orderItem && (
        <OrderForm
          item={orderItem}
          onClose={handleCloseOrder}
        />
      )}
    </div>
  );
}

export default App;
