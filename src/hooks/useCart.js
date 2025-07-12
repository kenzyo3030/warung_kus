
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { formatCurrency } from '@/lib/utils';

export const useCart = () => {
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      // Add note property when adding a new item
      return [...prevCart, { ...item, quantity: 1, note: '' }];
    });
    toast({
      title: "Ditambahkan ke keranjang!",
      description: `${item.name} berhasil ditambahkan.`,
      duration: 2000,
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === itemId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(cartItem =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      }
      return prevCart.filter(cartItem => cartItem.id !== itemId);
    });
  };

  const updateCartItemNote = (itemId, note) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId ? { ...item, note } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Keranjang kosong!",
        description: "Silakan pilih menu terlebih dahulu.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    if (!customerName.trim() || !customerAddress.trim()) {
      toast({
        title: "Data tidak lengkap!",
        description: "Mohon isi nama dan alamat pemesan.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    const orderDetails = cart.map(item => {
      const noteText = item.note ? `\n  (Catatan: ${item.note})` : '';
      return `${item.name} x${item.quantity} = ${formatCurrency(item.price * item.quantity)}${noteText}`;
    }).join('\n');
    
    const totalAmount = formatCurrency(getTotalPrice());
    const message = `Halo Warung Makan Bu-Kus! Saya ingin memesan:\n\n*Nama Pemesan:* ${customerName}\n*Alamat Pengiriman:* ${customerAddress}\n\n*Pesanan:*\n${orderDetails}\n\n*Total:* ${totalAmount}\n\nTerima kasih!`;
    
    // Ganti dengan nomor WhatsApp owner yang sebenarnya
    const whatsappUrl = `https://wa.me/6282125646353?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Pesanan dikirim!",
      description: "Anda akan diarahkan ke WhatsApp untuk menyelesaikan pesanan.",
      duration: 4000,
    });
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateCartItemNote,
    getTotalPrice,
    getTotalItems,
    handleCheckout,
    customerName,
    setCustomerName,
    customerAddress,
    setCustomerAddress,
  };
};
