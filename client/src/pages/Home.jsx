// import React from "react";
// import chikanmasala from "../assets/masala.png";
// import { motion } from "framer-motion";

// const Hero = () => {
//   return (
//     <section className="bg-[#8b1c1c] text-white px-8 md:px-20 py-24 flex flex-col md:flex-row items-center justify-between overflow-hidden relative">
//       {/* Left Content (Text and CTA) */}
//       <motion.div
//         className="md:w-1/2 space-y-6 z-10 text-center md:text-left"
//         initial={{ opacity: 0, x: -50 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.8 }}
//       >
//         <h1 className="text-4xl md:text-6xl font-extrabold leading-tight font-serif">
//           Bringing Authentic <br /> Indian Flavors
//         </h1>
//         <p className="text-xl text-gray-200">
//           Premium quality spices and masalas, crafted from the finest
//           ingredients.
//         </p>
//         <motion.button
//           className="bg-green-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition shadow-lg"
//           whileHover={{
//             scale: 1.05,
//             boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5)",
//           }}
//           whileTap={{ scale: 0.95 }}
//         >
//           Shop Now
//         </motion.button>
//       </motion.div>

//       {/* Right Content (Products) */}
//       <motion.div
//         className="md:w-1/2 flex justify-end gap-5 md:gap-8 mt-16 md:mt-0 relative z-10 mr-[-2rem] md:mr-[-4rem]"
//         initial={{ opacity: 0, x: 50 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.8, delay: 0.3 }}
//       >
//         {/* Product 1: Garam Masala */}
//         <div className="w-48 h-72 overflow-hidden shadow-2xl rounded-3xl">
//           <motion.img
//             src={chikanmasala}
//             alt="Chicken Masala"
//             className="w-full h-full object-cover object-center scale-125 "
//             // 👆 Default zoom 1.25x (dabba bada lagega, natural)
//             whileHover={{ scale: 1.35 }} // Hover pe halka zoom
//             transition={{ type: "spring", stiffness: 300 }}
//           />
//         </div>

//         {/* Product 2: Chicken/Meat Masala */}
//         <div className="w-48 h-72 overflow-hidden shadow-2xl rounded-lg">
//           <motion.img
//             src={chikanmasala}
//             alt="Chicken Masala"
//             className="w-full h-full object-cover object-center scale-125 "
//             // 👆 Default zoom 1.25x (dabba bada lagega, natural)
//             whileHover={{ scale: 1.35 }} // Hover pe halka zoom
//             transition={{ type: "spring", stiffness: 300 }}
//           />
//         </div>

//         {/* Product 3: Biryani Masala */}
//         <div className="w-48 h-72 overflow-hidden shadow-2xl rounded-lg">
//           <motion.img
//             src={chikanmasala}
//             alt="Chicken Masala"
//             className="w-full h-full object-cover object-center scale-125 "
//             // 👆 Default zoom 1.25x (dabba bada lagega, natural)
//             whileHover={{ scale: 1.35 }} // Hover pe halka zoom
//             transition={{ type: "spring", stiffness: 300 }}
//           />
//         </div>
//       </motion.div>
//     </section>
//   );
// };

// export default Hero;

//new code

import React from "react";
import chikanmasala from "../assets/masala.png";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    // Added responsive padding (px-6 mobile, px-20 desktop) and min-h-screen for better vertical spacing on all devices
    <section className="bg-[#8b1c1c] text-white px-6 md:px-20 py-16 md:py-24 min-h-[70vh] flex flex-col md:flex-row items-center justify-between overflow-hidden relative">
      {/* Left Content (Text and CTA) */}
      <motion.div
        // Added responsive width and content order for mobile (order-2) and desktop (order-1)
        className="md:w-1/2 space-y-6 z-10 text-center md:text-left order-2 md:order-1 pt-10 md:pt-0"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight font-serif">
          Bringing Authentic <br /> Indian Flavors
        </h1>
        <p className="text-lg md:text-xl text-gray-200">
          Premium quality spices and masalas, crafted from the finest
          ingredients.
        </p>
        <motion.button
          className="bg-green-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition shadow-lg"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          Shop Now
        </motion.button>
      </motion.div>

      {/* Right Content (Products) */}
      <motion.div
        // Changed justify-end to justify-center on mobile, and added responsive margins
        className="md:w-1/2 flex justify-center md:justify-end gap-3 sm:gap-5 mt-12 md:mt-0 relative z-10 order-1 md:order-2 mr-0 md:mr-[-4rem]"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {/* Product 1: Garam Masala */}
        <div className="w-28 h-40 sm:w-36 sm:h-52 md:w-56 md:h-80 bg-gradient-to-br from-white to-[#fffdf0] flex items-center justify-center p-4 md:p-6 overflow-hidden shadow-2xl shadow-black/60 rounded-[2rem] border-4 border-white/10 hover:border-yellow-400/50 relative group transform hover:-translate-y-2 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-t from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <motion.img
            src={chikanmasala}
            alt="Garam Masala"
            className="w-full h-full object-cover object-center scale-125"
            whileHover={{ scale: 1.35 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </div>

        {/* Product 2: Chicken/Meat Masala */}
        <div className="w-28 h-40 sm:w-36 sm:h-52 md:w-56 md:h-80 bg-gradient-to-br from-white to-[#fffdf0] flex items-center justify-center p-4 md:p-6 overflow-hidden shadow-2xl shadow-black/60 rounded-[2rem] border-4 border-white/10 hover:border-yellow-400/50 mt-8 sm:mt-12 relative group transform hover:-translate-y-2 transition-all duration-500 z-10">
          <div className="absolute inset-0 bg-gradient-to-t from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <motion.img
            src={chikanmasala}
            alt="Chicken Masala"
            className="w-full h-full object-cover object-center scale-125"
            whileHover={{ scale: 1.35 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </div>

        {/* Product 3: Biryani Masala */}
        <div className="w-28 h-40 sm:w-36 sm:h-52 md:w-56 md:h-80 bg-gradient-to-br from-white to-[#fffdf0] flex items-center justify-center p-4 md:p-6 overflow-hidden shadow-2xl shadow-black/60 rounded-[2rem] border-4 border-white/10 hover:border-yellow-400/50 mt-4 sm:mt-6 relative group transform hover:-translate-y-2 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-t from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <motion.img
            src={chikanmasala}
            alt="Biryani Masala"
            className="w-full h-full object-cover object-center scale-125"
            whileHover={{ scale: 1.35 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
