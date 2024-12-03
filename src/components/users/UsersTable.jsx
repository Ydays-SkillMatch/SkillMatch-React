import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const initialUserData = [
	{ id: 1, name: "John Doe", email: "john@example.com", role: "Customer", status: "Active" },
	{ id: 2, name: "Jane Smith", email: "jane@example.com", role: "Admin", status: "Active" },
	{ id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Customer", status: "Inactive" },
	{ id: 4, name: "Alice Brown", email: "alice@example.com", role: "Customer", status: "Active" },
	{ id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "Moderator", status: "Active" },
];

const UsersTable = () => {
	const [userData, setUserData] = useState(initialUserData);
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredUsers, setFilteredUsers] = useState(initialUserData);

	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);

	const [newUser, setNewUser] = useState({ name: "", email: "", role: "", status: "Active" });
	const [userToEdit, setUserToEdit] = useState(null);

	// Handle search functionality
	const handleSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		const filtered = userData.filter(
			(user) =>
				user.name.toLowerCase().includes(term) ||
				user.email.toLowerCase().includes(term)
		);
		setFilteredUsers(filtered);
	};

	// Handle delete functionality
	const handleDelete = (id) => {
		setUserData((prev) => prev.filter((user) => user.id !== id));
		setFilteredUsers((prev) => prev.filter((user) => user.id !== id));
	};

	// Handle add modal open/close
	const handleOpenAddModal = () => setIsAddModalOpen(true);
	const handleCloseAddModal = () => {
		setIsAddModalOpen(false);
		setNewUser({ name: "", email: "", role: "", status: "Active" });
	};

	// Handle edit modal open/close
	const handleOpenEditModal = (user) => {
		setIsEditModalOpen(true);
		setUserToEdit(user);
	};
	const handleCloseEditModal = () => {
		setIsEditModalOpen(false);
		setUserToEdit(null);
	};

	// Handle input change for the add/edit form
	const handleChange = (e) => {
		const { name, value } = e.target;
		if (isAddModalOpen) {
			setNewUser((prev) => ({ ...prev, [name]: value }));
		} else if (isEditModalOpen) {
			setUserToEdit((prev) => ({ ...prev, [name]: value }));
		}
	};

	// Handle adding a new user
	const handleAddNewUser = () => {
		const newUserWithId = { ...newUser, id: Date.now() };
		setUserData((prev) => [...prev, newUserWithId]);
		setFilteredUsers((prev) => [...prev, newUserWithId]);
		handleCloseAddModal();
	};

	// Handle saving edited user
	const handleSaveEditUser = () => {
		setUserData((prev) =>
			prev.map((user) =>
				user.id === userToEdit.id ? userToEdit : user
			)
		);
		setFilteredUsers((prev) =>
			prev.map((user) =>
				user.id === userToEdit.id ? userToEdit : user
			)
		);
		handleCloseEditModal();
	};

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-xl font-semibold text-gray-100'>Users</h2>
				<div className='flex space-x-4'>
					<div className='relative'>
						<input
							type='text'
							placeholder='Search users...'
							className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
							value={searchTerm}
							onChange={handleSearch}
						/>
						<Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
					</div>
					<button
						className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition'
						onClick={handleOpenAddModal}
					>
						Add User
					</button>
				</div>
			</div>

			<div className='overflow-x-auto'>
				<table className='min-w-full divide-y divide-gray-700'>
					<thead>
						<tr>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Name</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Email</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Role</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Status</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Actions</th>
						</tr>
					</thead>
					<tbody className='divide-y divide-gray-700'>
						{filteredUsers.map((user) => (
							<motion.tr
								key={user.id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
							>
								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='flex items-center'>
										<div className='h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold'>
											{user.name.charAt(0)}
										</div>
										<div className='ml-4'>
											<div className='text-sm font-medium text-gray-100'>{user.name}</div>
										</div>
									</div>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='text-sm text-gray-300'>{user.email}</div>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-800 text-blue-100'>
										{user.role}
									</span>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<span
										className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
											user.status === "Active"
												? "bg-green-800 text-green-100"
												: "bg-red-800 text-red-100"
										}`}
									>
										{user.status}
									</span>
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									<button
										className='text-indigo-400 hover:text-indigo-300 mr-2'
										onClick={() => handleOpenEditModal(user)}
									>
										Edit
									</button>
									<button
										className='text-red-400 hover:text-red-300'
										onClick={() => handleDelete(user.id)}
									>
										Delete
									</button>
								</td>
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Add/Edit Modal */}
			{(isAddModalOpen || isEditModalOpen) && (
				<motion.div
					className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.3 }}
				>
					<div className='bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-xl shadow-xl p-6 w-full max-w-md mx-4 border border-gray-700'>
						<h3 className='text-lg font-semibold text-gray-100 mb-4'>
							{isAddModalOpen ? "Add New User" : "Edit User"}
						</h3>
						<div className='space-y-4'>
							<div>
								<label className='block text-gray-400 text-sm mb-2'>Name</label>
								<input
									type='text'
									name='name'
									value={isAddModalOpen ? newUser.name : userToEdit.name}
									onChange={handleChange}
									className='w-full p-3 text-gray-100 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
									placeholder='Enter name'
								/>
							</div>
							<div>
								<label className='block text-gray-400 text-sm mb-2'>Email</label>
								<input
									type='email'
									name='email'
									value={isAddModalOpen ? newUser.email : userToEdit.email}
									onChange={handleChange}
									className='w-full p-3 text-gray-100 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
									placeholder='Enter email'
								/>
							</div>
							<div>
								<label className='block text-gray-400 text-sm mb-2'>Role</label>
								<input
									type='text'
									name='role'
									value={isAddModalOpen ? newUser.role : userToEdit.role}
									onChange={handleChange}
									className='w-full p-3 text-gray-100 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
									placeholder='Enter role'
								/>
							</div>
							<div>
								<label className='block text-gray-400 text-sm mb-2'>Status</label>
								<select
									name='status'
									value={isAddModalOpen ? newUser.status : userToEdit.status}
									onChange={handleChange}
									className='w-full p-3 text-gray-100 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
								>
									<option value='Active'>Active</option>
									<option value='Inactive'>Inactive</option>
								</select>
							</div>
						</div>
						<div className='mt-6 flex justify-end space-x-3'>
							<button
								className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition'
								onClick={isAddModalOpen ? handleAddNewUser : handleSaveEditUser}
							>
								{isAddModalOpen ? "Add" : "Save"}
							</button>
							<button
								className='px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition'
								onClick={isAddModalOpen ? handleCloseAddModal : handleCloseEditModal}
							>
								Cancel
							</button>
						</div>
					</div>
				</motion.div>
			)}
		</motion.div>
	);
};

export default UsersTable;
