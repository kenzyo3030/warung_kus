import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone } from 'lucide-react';

const StoreInfo = () => {
  const infoItems = [
    { icon: <MapPin className="w-5 h-5 text-primary" />, text: "Jl. Tipar Cakung, Gg. H. Simin No.5, RT.5/RW.4." },
    { icon: <Clock className="w-5 h-5 text-primary" />, text: "Buka: 15:00 - 18:00" },
    { icon: <Phone className="w-5 h-5 text-primary" />, text: "+62 821-2564-6353" },
  ];

  return (
    <section className="bg-white border-b border-stone-200">
      <div className="container mx-auto px-4 py-4">
        <div className="grid md:grid-cols-3 gap-4 text-center">
          {infoItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center justify-center gap-2 text-sm text-stone-600"
            >
              {item.icon}
              <span>{item.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoreInfo;