import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import { useCart } from '@/hooks/useCart';
import { menuItems } from '@/data/menu';
import Header from '@/components/Header';
import StoreInfo from '@/components/StoreInfo';
import MenuCategoryFilter from '@/components/MenuCategoryFilter';
import MenuList from '@/components/MenuList';
import CartSidebar from '@/components/CartSidebar';
import QRCodeModal from '@/components/QRCodeModal';

function App() {
  const [showCart, setShowCart] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const cartHook = useCart();
  const categories = ["Semua", "Makanan", "Minuman"];
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const filteredMenu =
    selectedCategory === "Semua"
      ? menuItems
      : menuItems.filter(item => item.category === selectedCategory);
  
  return (
    <>
      <Helmet>
        <title>Warung Makan Bu-Kus - Menu Digital</title>
        <meta name="description" content="Pesan makanan favorit Anda secara online dengan mudah. Langsung chat ke owner!" />
      </Helmet>
      
      <div className="min-h-screen bg-stone-50 font-sans relative overflow-hidden">
        <Header 
          totalItems={cartHook.getTotalItems()}
          onCartClick={() => setShowCart(true)} 
          onQRClick={() => setShowQR(true)}
        />

        {/* 🎈 ANIMASI MENGAMBANG */}
        <div className="absolute top-20 left-10 floating-animation">
          <div className="w-16 h-16 bg-green-200/50 rounded-full flex items-center justify-center text-3xl">🥬</div>
        </div>
        <div className="absolute top-40 right-20 floating-animation" style={{ animationDelay: '2s' }}>
          <div className="w-20 h-20 bg-yellow-200/50 rounded-full flex items-center justify-center text-4xl">🍗</div>
        </div>
        <div className="absolute bottom-20 left-1/4 floating-animation" style={{ animationDelay: '4s' }}>
          <div className="w-14 h-14 bg-gray-200/50 rounded-full flex items-center justify-center text-3xl">🍚</div>
        </div>
        {/* END ANIMASI */}

        <StoreInfo />

        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1">
              <MenuCategoryFilter 
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
              <MenuList 
                menuItems={filteredMenu} 
                addToCart={cartHook.addToCart} 
              />
            </div>

            <CartSidebar 
              showCart={showCart}
              onClose={() => setShowCart(false)}
              cartHook={cartHook}
            />
          </div>
        </main>
        
        <footer className="bg-gradient-to-br from-blue-100 via-white to-blue-200 text-gray-800 py-8 mt-16 border-t border-blue-200 shadow-inner">
          <div className="container mx-auto px-4 text-center">
            <div className="mb-4">
              <span className="text-2xl font-bold text-blue-500">🍜 Warung Makan Bu-Kus</span>
            </div>
            <p className="text-stone-400 mb-4">
              Menemukan kenikmatan dalam setiap suapan.
            </p>
            <div className="flex justify-center space-x-4 text-sm text-stone-500">
              <span>© 2025 Warung Makan Bu-Kus</span>
              <span>•</span>
              <span>Dibuat dengan ❤️(Tole Yogi)</span>
            </div>
          </div>
        </footer>

        <Toaster />
        <QRCodeModal isOpen={showQR} onClose={() => setShowQR(false)} />
      </div>
    </>
  );
}

export default App;
