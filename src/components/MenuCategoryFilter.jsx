import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const MenuCategoryFilter = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-8"
    >
      <h2 className="text-2xl font-bold text-stone-800 mb-4">Kategori Menu</h2>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => setSelectedCategory(category)}
            variant={selectedCategory === category ? "default" : "outline"}
            className="transition-all duration-300 rounded-full"
          >
            {category}
          </Button>
        ))}
      </div>
    </motion.div>
  );
};

export default MenuCategoryFilter;