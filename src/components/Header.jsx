import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, UtensilsCrossed, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = ({
  totalItems,
  onCartClick,
  onQRClick
}) => {
  return <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <motion.div initial={{
          opacity: 0,
          x: -50
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.6
        }} className="flex items-center gap-3">
            <UtensilsCrossed className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-stone-800">Warung Makan Bu-Kus</h1>
              <p className="text-sm text-stone-500 -mt-1">Menu Digital</p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2"
          >
            <Button onClick={onQRClick} variant="ghost" className="p-2 rounded-full h-auto">
              <QrCode className="w-6 h-6 text-stone-700" />
            </Button>
            <Button onClick={onCartClick} variant="ghost" className="relative p-2 rounded-full h-auto">
              <ShoppingCart className="w-6 h-6 text-stone-700" />
              {totalItems > 0 && <motion.span initial={{
              scale: 0
            }} animate={{
              scale: 1
            }} transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30
            }} className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </motion.span>}
            </Button>
          </motion.div>
        </div>
      </div>
    </header>;
};
export default Header;