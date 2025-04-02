import { User } from "lucide-react";
import SettingSection from "./SettingSection";
import Image from "next/image";

const Profile = () => {
  return (
    <SettingSection icon={User} title={"Profile"}>
      <div className="flex flex-col sm:flex-row items-center mb-6">
      <Image
        src="https://randomuser.me/api/portraits/men/3.jpg"
        alt="Profile"
        className="rounded-full object-cover mr-4"
        width={80} 
        height={80}
      />

        <div>
          <h3 className="text-lg font-semibold text-gray-100">John Doe</h3>
          <p className="text-gray-400">john.doe@example.com</p>
        </div>
      </div>

      <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto">
        Edit Profile
      </button>
    </SettingSection>
  );
};
export default Profile;
