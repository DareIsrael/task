import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center justify-center text-white">
      {/* Navbar */}
      <nav className="w-full fixed top-0 bg-transparent p-4 flex justify-between items-center px-10">
        <h1 className="text-3xl font-bold">Brand</h1>
        <div className="hidden md:flex space-x-6">
          <NavLink text="Home" />
          <NavLink text="About" />
          <NavLink text="Services" />
          <NavLink text="Contact" />
        </div>
      </nav>

      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mt-20 px-6"
      >
        <h1 className="text-5xl font-extrabold drop-shadow-lg">Welcome to Our World</h1>
        <p className="text-lg mt-4 opacity-80">Experience innovation like never before.</p>
        
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="mt-6 px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-full shadow-lg"
        >
          Get Started
        </motion.button>
      </motion.div>

      {/* Features Section */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 px-10">
        <Feature title="Fast & Secure" />
        <Feature title="User-Friendly" />
        <Feature title="24/7 Support" />
      </div>
    </div>
  );
}

function NavLink({ text }) {
  return (
    <motion.a
      whileHover={{ scale: 1.1, color: "#facc15" }}
      className="text-lg cursor-pointer"
      href="#"
    >
      {text}
    </motion.a>
  );
}

function Feature({ title }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="bg-white text-gray-900 p-6 rounded-lg shadow-lg text-center"
    >
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-gray-600 mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </motion.div>
  );
}
