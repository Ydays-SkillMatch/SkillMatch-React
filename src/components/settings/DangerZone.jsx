import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

// Fonction utilitaire pour supprimer tous les cookies
const deleteAllCookies = () => {
  const cookies = document.cookie.split("; ");
  for (let c of cookies) {
    const eqPos = c.indexOf("=");
    const name = eqPos > -1 ? c.substr(0, eqPos) : c;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  }
  // Recharge la page après suppression des cookies
  window.location.reload();
};

const DangerZone = () => {
  return (
    <motion.div
      className="bg-red-900 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-red-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center mb-4">
        <Trash2 className="text-red-400 mr-3" size={24} />
        <h2 className="text-xl font-semibold text-gray-100">Danger Zone</h2>
      </div>
      <button
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-200"
        onClick={deleteAllCookies}
      >
        Log Out 
      </button>
    </motion.div>
  );
};
export default DangerZone;