import { motion } from "framer-motion";
import { Edit, Search, Trash2, Plus } from "lucide-react";
import { useState } from "react";

const EXERCISE_DATA = [
  { id: 1, name: "Exercice 1", category: "Math", time: 60, assignedUsers: [] },
  { id: 2, name: "Exercice 2", category: "Dev", time: 1, assignedUsers: [] },
  { id: 3, name: "Exercice 3", category: "PHP", time: 30, assignedUsers: [] },
  { id: 4, name: "Exercice 4", category: "MEKANIK", time: 25, assignedUsers: [] },
  { id: 5, name: "Exercice 5", category: "SS", time: 80, assignedUsers: [] },
];

const USER_DATA = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Bob Johnson" },
  { id: 4, name: "Alice Brown" },
  { id: 5, name: "Charlie Wilson" },
];

const ExercisesTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [exercises, setExercises] = useState(EXERCISE_DATA);
  const [filteredExercises, setFilteredExercises] = useState(exercises);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [editedExercise, setEditedExercise] = useState({
    id: 0,
    name: "",
    category: "",
    time: 0,
    assignedUsers: [],
  });

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = exercises.filter(
      (exercise) =>
        exercise.name.toLowerCase().includes(term) ||
        exercise.category.toLowerCase().includes(term)
    );
    setFilteredExercises(filtered);
  };

  const handleEditClick = (exercise) => {
    setSelectedExercise(exercise);
    setEditedExercise({ ...exercise });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedExercise(null);
    setEditedExercise({ id: 0, name: "", category: "", time: 0, assignedUsers: [] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedExercise({ ...editedExercise, [name]: value });
  };

  const handleSaveChanges = () => {
    const updatedExercises = exercises.map((exercise) =>
      exercise.id === editedExercise.id ? editedExercise : exercise
    );
    setExercises(updatedExercises);
    setFilteredExercises(updatedExercises);
    handleCloseModal();
  };

  const handleUserAssignment = (userId) => {
    const isAssigned = editedExercise.assignedUsers.includes(userId);
    const updatedUsers = isAssigned
      ? editedExercise.assignedUsers.filter((id) => id !== userId)
      : [...editedExercise.assignedUsers, userId];

    setEditedExercise({ ...editedExercise, assignedUsers: updatedUsers });
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Liste des Exercices</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher des exercices..."
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleSearch}
            value={searchTerm}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Exercice
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Catégorie
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Temps
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredExercises.map((exercise) => (
              <motion.tr
                key={exercise.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center">
                  <img
                    src="https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2lyZWxlc3MlMjBlYXJidWRzfGVufDB8fDB8fHww"
                    alt="Exercice img"
                    className="size-10 rounded-full"
                  />
                  {exercise.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {exercise.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {exercise.time.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <button
                    className="text-indigo-400 hover:text-indigo-300 mr-2"
                    onClick={() => handleEditClick(exercise)}
                  >
                    <Edit size={18} />
                  </button>
                  <button className="text-red-400 hover:text-red-300">
                    <Trash2 size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-h-[90vh] flex">
            <div className="flex-1 flex flex-col pl-6 w-full overflow-hidden pr-6">
              <h2 className="text-2xl font-semibold text-gray-100 mb-4">Éditer l'Exercice</h2>

              <div className="flex-1 overflow-y-auto space-y-4 pr-3">
                <div>
                  <label className="block text-gray-300" htmlFor="name">
                    Nom
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={editedExercise.name}
                    onChange={handleChange}
                    className="w-[calc(100%-0.75rem)] bg-gray-700 text-white rounded-lg p-2"
                  />
                </div>

                <div>
                  <label className="block text-gray-300" htmlFor="category">
                    Catégorie
                  </label>
                  <input
                    id="category"
                    name="category"
                    type="text"
                    value={editedExercise.category}
                    onChange={handleChange}
                    className="w-[calc(100%-0.75rem)] bg-gray-700 text-white rounded-lg p-2"
                  />
                </div>

                <div>
                  <label className="block text-gray-300" htmlFor="time">
                    Temps
                  </label>
                  <input
                    id="time"
                    name="time"
                    type="number"
                    value={editedExercise.time}
                    onChange={handleChange}
                    className="w-[calc(100%-0.75rem)] bg-gray-700 text-white rounded-lg p-2"
                  />
                </div>

                <div>
                  <label className="block text-gray-300">Assigner des Utilisateurs</label>
                  {USER_DATA.map((user) => (
                    <div key={user.id} className="flex items-center mt-2">
                      <input
                        type="checkbox"
                        id={`user-${user.id}`}
                        checked={editedExercise.assignedUsers.includes(user.id)}
                        onChange={() => handleUserAssignment(user.id)}
                        className="mr-2"
                      />
                      <label htmlFor={`user-${user.id}`} className="text-gray-300">
                        {user.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex justify-between pt-4">
                <button
                  onClick={handleSaveChanges}
                  className="text-white bg-blue-600 px-6 py-2 rounded-lg"
                >
                  Sauvegarder
                </button>
                <button
                  onClick={handleCloseModal}
                  className="text-white bg-red-600 px-6 py-2 rounded-lg"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ExercisesTable;
