import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';

const MenuItemCard = ({ item, index, addToCart }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative">
        <img 
          className="w-full h-48 object-cover"
          alt={item.name}
          src={item.image}
        />
        <div className="absolute top-3 right-3 bg-primary/90 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
          {item.category}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-bold text-stone-800 mb-1">{item.name}</h3>
        <p className="text-stone-500 mb-4 text-sm h-10">{item.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-primary">
            {formatCurrency(item.price)}
          </span>
          <Button
            onClick={() => addToCart(item)}
            className="px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            Tambah
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuItemCard;