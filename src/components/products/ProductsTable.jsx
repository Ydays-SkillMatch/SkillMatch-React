import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useState } from "react";

const PRODUCT_DATA = [
	{ id: 1, name: "Exercice 1", category: "Math", time: 59.99, stock: 143, sales: 1200 },
	{ id: 2, name: "Exercice 2", category: "Dev", time: 39.99, stock: 89, sales: 800 },
	{ id: 3, name: "Exercice 3", category: "PHP", time: 199.99, stock: 56, sales: 650 },
	{ id: 4, name: "Exercice 4", category: "MEKANIK", time: 29.99, stock: 210, sales: 950 },
	{ id: 5, name: "Exercice 5", category: "SS", time: 79.99, stock: 78, sales: 720 },
];

const ProductsTable = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [products, setProducts] = useState(PRODUCT_DATA); // État des produits
	const [filteredProducts, setFilteredProducts] = useState(products); // État des produits filtrés
	const [isModalOpen, setIsModalOpen] = useState(false); // État pour la pop-up
	const [selectedProduct, setSelectedProduct] = useState(null); // État pour le produit sélectionné

	// Form state for editing product data
	const [editedProduct, setEditedProduct] = useState({
		id: 0,
		name: "",
		category: "",
		time: 0,
		stock: 0,
		sales: 0,
	});

	// Fonction de recherche
	const handleSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		const filtered = products.filter(
			(product) => product.name.toLowerCase().includes(term) || product.category.toLowerCase().includes(term)
		);
		setFilteredProducts(filtered);
	};

	// Fonction pour ouvrir la pop-up et initialiser les données à modifier
	const handleEditClick = (product) => {
		setSelectedProduct(product);
		setEditedProduct({ ...product }); // Initialiser les données du produit pour l'édition
		setIsModalOpen(true);
	};

	// Fonction pour fermer la pop-up
	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedProduct(null);
		setEditedProduct({
			id: 0,
			name: "",
			category: "",
			time: 0,
			stock: 0,
			sales: 0,
		});
	};

	// Fonction pour gérer les changements dans les champs de formulaire
	const handleChange = (e) => {
		const { name, value } = e.target;
		setEditedProduct({
			...editedProduct,
			[name]: value,
		});
	};

	// Fonction pour sauvegarder les modifications
	const handleSaveChanges = () => {
		const updatedProducts = products.map((product) =>
			product.id === editedProduct.id ? editedProduct : product
		);
		setProducts(updatedProducts); // Mettre à jour la liste des produits dans l'état global
		setFilteredProducts(updatedProducts); // Mettre à jour la liste des produits filtrés
		handleCloseModal(); // Fermer la pop-up après sauvegarde
	};

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			{/* Recherche */}
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-xl font-semibold text-gray-100'>Liste Exercices</h2>
				<div className='relative'>
					<input
						type='text'
						placeholder='Search products...'
						className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
						onChange={handleSearch}
						value={searchTerm}
					/>
					<Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
				</div>
			</div>

			{/* Table */}
			<div className='overflow-x-auto'>
				<table className='min-w-full divide-y divide-gray-700'>
					<thead>
						<tr>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Exercice
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Categorie
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Time
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Stock
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Sales
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Actions
							</th>
						</tr>
					</thead>

					<tbody className='divide-y divide-gray-700'>
						{filteredProducts.map((product) => (
							<motion.tr
								key={product.id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
							>
								<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center'>
									<img
										src='https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2lyZWxlc3MlMjBlYXJidWRzfGVufDB8fDB8fHww'
										alt='Product img'
										className='size-10 rounded-full'
									/>
									{product.name}
								</td>

								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									{product.category}
								</td>

								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									${product.time.toFixed(2)}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>{product.stock}</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>{product.sales}</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									<button
										className='text-indigo-400 hover:text-indigo-300 mr-2'
										onClick={() => handleEditClick(product)} // ouvrir la pop-up avec le produit sélectionné
									>
										<Edit size={18} />
									</button>
									<button className='text-red-400 hover:text-red-300'>
										<Trash2 size={18} />
									</button>
								</td>
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Pop-up */}
			{isModalOpen && (
				<motion.div
					className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.3 }}
				>
					<div className='bg-gray-800 p-6 rounded-lg shadow-lg max-w-3xl w-full'>
						<h2 className='text-2xl font-semibold text-gray-100 mb-4'>Editer Exercice</h2>
						{/* Formulaire de modification */}
						<div className='space-y-4'>
							<div>
								<label className='block text-gray-300' htmlFor='name'>
									Nom
								</label>
								<input
									id='name'
									name='name'
									type='text'
									value={editedProduct.name}
									onChange={handleChange}
									className='w-full bg-gray-700 text-white rounded-lg p-2'
								/>
							</div>
							<div>
								<label className='block text-gray-300' htmlFor='category'>
									Catégorie
								</label>
								<input
									id='category'
									name='category'
									type='text'
									value={editedProduct.category}
									onChange={handleChange}
									className='w-full bg-gray-700 text-white rounded-lg p-2'
								/>
							</div>
							<div>
								<label className='block text-gray-300' htmlFor='time'>
									Time
								</label>
								<input
									id='time'
									name='time'
									type='number'
									value={editedProduct.time}
									onChange={handleChange}
									className='w-full bg-gray-700 text-white rounded-lg p-2'
								/>
							</div>
							<div>
								<label className='block text-gray-300' htmlFor='stock'>
									Stock
								</label>
								<input
									id='stock'
									name='stock'
									type='number'
									value={editedProduct.stock}
									onChange={handleChange}
									className='w-full bg-gray-700 text-white rounded-lg p-2'
								/>
							</div>
							<div>
								<label className='block text-gray-300' htmlFor='sales'>
									Ventes
								</label>
								<input
									id='sales'
									name='sales'
									type='number'
									value={editedProduct.sales}
									onChange={handleChange}
									className='w-full bg-gray-700 text-white rounded-lg p-2'
								/>
							</div>
							<div className='mt-6 flex justify-between'>
								<button onClick={handleSaveChanges} className='text-white bg-blue-600 px-6 py-2 rounded-lg'>
									Sauvegarder
								</button>
								<button onClick={handleCloseModal} className='text-white bg-red-600 px-6 py-2 rounded-lg'>
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

export default ProductsTable;
