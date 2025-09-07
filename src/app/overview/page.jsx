"use client";
import { BarChart2, Book, LoaderPinwheelIcon, Users } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/common/Header";
import StatCard from "@/components/common/StatCard";
import SalesOverviewChart from "@/components/overview/SalesOverviewChart";
import CategoryDistributionChart from "@/components/overview/CategoryDistributionChart";
import SalesChannelChart from "@/components/overview/SalesChannelChart";

const Page = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Home" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Exercices"
            icon={Book}
            value="1042"
            color="#6366F1"
          />
          <StatCard
            name="Nouveaux Utilisateurs"
            icon={Users}
            value="294"
            color="#8B5CF6"
          />
          <StatCard
            name="Total Réalisé"
            icon={LoaderPinwheelIcon}
            value="567"
            color="#EC4899"
          />
          <StatCard
            name="Taux de réussite"
            icon={BarChart2}
            value="12.5%"
            color="#10B981"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SalesOverviewChart />
          <CategoryDistributionChart />
          <SalesChannelChart />
        </div>
      </main>
    </div>
  );
};
export default Page;
