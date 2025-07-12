
import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Plus, Minus, Send, X, User, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatCurrency } from '@/lib/utils';

const CartSidebar = ({ showCart, onClose, cartHook }) => {
  const { 
    cart, 
    addToCart, 
    removeFromCart, 
    updateCartItemNote,
    getTotalPrice, 
    handleCheckout,
    customerName,
    setCustomerName,
    customerAddress,
    setCustomerAddress
  } = cartHook;
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (showCart) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCart, onClose]);

  return (
    <AnimatePresence>
      {showCart && (
        <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 lg:hidden"
          onClick={onClose}
        />
        <motion.aside
          ref={sidebarRef}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-2xl p-6 z-50 flex flex-col lg:sticky lg:top-24 lg:max-w-sm lg:rounded-xl lg:h-fit"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-stone-800 flex items-center gap-2">
              <ShoppingCart className="w-6 h-6 text-primary" />
              Keranjang
            </h3>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                <X className="w-5 h-5"/>
            </Button>
          </div>
          
          {cart.length === 0 ? (
            <div className="text-center py-16 flex flex-col items-center">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-stone-500">Keranjang Anda masih kosong.</p>
              <p className="text-stone-400 text-sm mt-1">Ayo, pilih menu favoritmu!</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6 flex-1 overflow-y-auto pr-2 -mr-2">
                {cart.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-stone-50 rounded-lg"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex-1 mr-2">
                        <h4 className="font-semibold text-stone-700 text-sm">{item.name}</h4>
                        <p className="text-primary font-bold text-sm">{formatCurrency(item.price)}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => removeFromCart(item.id)}
                          className="w-7 h-7 p-0 rounded-full"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-8 text-center font-semibold text-stone-700">{item.quantity}</span>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => addToCart(item)}
                          className="w-7 h-7 p-0 rounded-full"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <Input
                      type="text"
                      placeholder="Contoh: tidak pedas"
                      value={item.note}
                      onChange={(e) => updateCartItemNote(item.id, e.target.value)}
                      className="mt-2 text-xs h-8"
                    />
                  </motion.div>
                ))}
              </div>
              
              <div className="border-t pt-4 mt-auto">
                <div className="space-y-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor="customerName" className="flex items-center gap-2"><User className="w-4 h-4" /> Nama Pemesan</Label>
                    <Input id="customerName" placeholder="Masukkan nama Anda" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customerAddress" className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Alamat Pengiriman</Label>
                    <Input id="customerAddress" placeholder="Masukkan alamat lengkap" value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} />
                  </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold text-stone-800">Total:</span>
                  <span className="text-2xl font-bold text-primary">
                    {formatCurrency(getTotalPrice())}
                  </span>
                </div>
                
                <Button
                  onClick={handleCheckout}
                  size="lg"
                  className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg text-base font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Pesan via WhatsApp
                </Button>
              </div>
            </>
          )}
        </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
