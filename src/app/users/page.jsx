"use client";
import { UserCheck, UserPlus, UsersIcon } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/common/Header";
import StatCard from "@/components/common/StatCard";
import UsersTable from "@/components/users/UsersTable";
import UserGrowthChart from "@/components/users/UserGrowthChart";
import UserActivityHeatmap from "@/components/users/UserActivityHeatmap";

const userStats = {
  totalUsers: 152845,
  newUsersToday: 243,
  activeUsers: 98520,
};

const Page = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Utilisateurs" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
        </motion.div>

        <UsersTable />
      </main>
    </div>
  );
};
export default Page;
