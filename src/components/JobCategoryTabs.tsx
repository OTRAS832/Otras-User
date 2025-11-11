import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { GetCategories } from "../services/apiHelpers";

interface JobCategoryTabsProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  activeSubTab: string;
  setActiveSubTab: (tab: string) => void;
}

const JobCategoryTabs: React.FC<JobCategoryTabsProps> = ({
  activeCategory,
  setActiveCategory,
  activeSubTab,
  setActiveSubTab,
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const subTabs = ["Syllabus", "PQP", "Answer Key", "Results", "Cut-Off"];

  // 🔹 Fetch categories dynamically
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await GetCategories();

        if (response?.status === 200 && Array.isArray(response.data)) {
          // ✅ Extract jobCategory values, remove duplicates, and add “All Jobs”
          const names = [
             "All India Jobs",
            ...new Set(
              response.data
                .map((item: any) => item.jobCategory?.trim())
                .filter(Boolean)
            ),
          ];

          setCategories(names);

          // ✅ Set default category to “All Jobs” if nothing is selected
          if (!activeCategory) setActiveCategory( "All India Jobs");
        } else {
          throw new Error("Invalid response format from server");
        }
      } catch (err: any) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center text-[#1a237e]">
        Job Categories
      </h2>

      {/* 🔹 Scrollable Category Tabs */}
      <div ref={scrollRef} className="flex overflow-x-auto no-scrollbar gap-3 pb-2">
        {loading ? (
          Array(6)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="w-32 h-9 bg-gray-200 animate-pulse rounded-full"
              ></div>
            ))
        ) : error ? (
          <div className="text-red-500 font-medium">{error}</div>
        ) : (
          categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileTap={{ scale: 0.95 }}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                activeCategory === cat
                  ? "bg-[#1a237e] text-white border-[#1a237e]"
                  : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
              }`}
            >
              {cat}
            </motion.button>
          ))
        )}
      </div>

      <div className="border-t border-gray-200 my-5"></div>

      {/* 🔹 Sub Tabs */}
      <div className="flex justify-center flex-wrap gap-8 mb-2">
        {subTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            className={`relative text-sm font-medium transition ${
              activeSubTab === tab
                ? "text-[#1a237e] font-semibold"
                : "text-gray-600 hover:text-[#1a237e]"
            }`}
          >
            {tab}
            {activeSubTab === tab && (
              <motion.div
                layoutId="underline"
                className="absolute left-0 right-0 -bottom-1 h-[2px] bg-[#1a237e] rounded-full"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default JobCategoryTabs;
