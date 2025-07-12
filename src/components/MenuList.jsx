import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MenuItemCard from '@/components/MenuItemCard';

const MenuList = ({ menuItems, addToCart }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
    >
      <AnimatePresence>
        {menuItems.map((item, index) => (
          <MenuItemCard 
            key={item.id} 
            item={item} 
            index={index} 
            addToCart={addToCart} 
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default MenuList;