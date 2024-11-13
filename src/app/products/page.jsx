"use client"
import { motion } from "framer-motion";
import Header from "@/components/common/Header";
import StatCard from "@/components/common/StatCard";
import { Book, Package, User } from "lucide-react";
import CategoryDistributionChart from "@/components/overview/CategoryDistributionChart";
import SalesTrendChart from "@/components/products/SalesTrendChart";
import ProductsTable from "@/components/products/ProductsTable";

const Page = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Exercices' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Total Exercices' icon={Package} value={2204} color='#6366F1' />
					<StatCard name='Total Exercices Validés' icon={Book} value={"500"} color='#EF4444' />
					<StatCard name='Total Users' icon={User} value={23} color='#F59E0B' />
				</motion.div>

				<ProductsTable />

				{/* CHARTS */}
				<div className='grid grid-col-1 lg:grid-cols-2 gap-8'>
					<SalesTrendChart />
					<CategoryDistributionChart />
				</div>
			</main>
		</div>
	);
};
export default Page;
