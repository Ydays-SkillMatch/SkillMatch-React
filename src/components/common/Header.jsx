const Header = ({ title }) => {
	return (
		<header className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700'>
			<div className='max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between'>
				<h1 className='text-2xl font-semibold text-gray-100'>{title}</h1>

				<div className='flex items-center'>
					<img
						src='https://randomuser.me/api/portraits/men/3.jpg'
						alt='Profile'
						className='rounded-full w-8 h-8 object-cover mr-2' // Taille réduite
					/>
					<div>
						<h3 className='text-sm font-semibold text-gray-100'>John Doe</h3> {/* Taille du texte réduite */}
						<p className='text-xs text-gray-400'>john.doe@example.com</p> {/* Taille du texte réduite */}
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
