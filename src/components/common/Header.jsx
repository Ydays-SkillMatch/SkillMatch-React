import Image from "next/image";

const Header = ({ title }) => {
  return (
    <header className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-100">{title}</h1>

        <div className="flex items-center">
          <Image
            src="https://randomuser.me/api/portraits/men/3.jpg"
            alt="Profile"
            width={32}
            height={32}
            className="rounded-full object-cover mr-2"
          />
          <div>
            <h3 className="text-sm font-semibold text-gray-100">John Doe</h3>
            <p className="text-xs text-gray-400">john.doe@example.com</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
