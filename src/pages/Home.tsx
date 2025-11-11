import React, { useEffect, useState } from "react";
import JobCategoryTabs from "../components/JobCategoryTabs";
import StateGovtJobsHeader from "../components/StateGovtJobsHeader";
import {
  GetJobNotification,
  GetAllPQP,
  GetAllSyllabus,
  GetAllResults,
  GetAllAnswerKeys,
  GetAllCutOffs,
} from "../services/apiHelpers";
import SubTabContent from "../components/JobSubTabs";

const Home: React.FC = () => {
  const [selectedState, setSelectedState] = useState("All");
  const [selectedQualification, setSelectedQualification] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All India Jobs");
  const [activeSubTab, setActiveSubTab] = useState("");
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ 1️⃣ Fetch CATEGORY data only when category changes
  useEffect(() => {
    const fetchCategoryData = async () => {
      setLoading(true);
      try {
        const categoryParam =
          activeCategory === "All India Jobs" ? "" : activeCategory;

        const response = await GetJobNotification(categoryParam);

        const apiData = Array.isArray(response?.data)
          ? response.data
          : Array.isArray(response?.data?.data)
          ? response.data.data
          : [];

        setJobs(apiData);
        setActiveSubTab(""); // reset sub-tab when category changes
      } catch (error) {
        console.error("Error fetching category data:", error);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [activeCategory]); // ← runs only on category change


  // ✅ 2️⃣ Fetch SUBTAB data only when sub-tab changes
  useEffect(() => {
    if (!activeSubTab) return; // ← prevent running when no sub-tab is selected
    const fetchSubTabData = async () => {
      setLoading(true);
      try {
        let response;
        // const categoryParam =
          activeCategory === "All India Jobs" ? "" : activeCategory;

        switch (activeSubTab) {
          case "Syllabus":
            response = await GetAllSyllabus();
            break;
          case "PQP":
            response = await GetAllPQP();
            break;
          case "Answer Key":
            response = await GetAllAnswerKeys();
            break;
          case "Results":
            response = await GetAllResults();
            break;
          case "Cut-Off":
            response = await GetAllCutOffs();
            break;
          default:
            return;
        }

        const apiData = Array.isArray(response?.data)
          ? response.data
          : Array.isArray(response?.data?.data)
          ? response.data.data
          : [];

        setJobs(apiData);
      } catch (error) {
        console.error("Error fetching sub-tab data:", error);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSubTabData();
  }, [activeSubTab]); // ← runs only on sub-tab click


  // ✅ Optional filter by state/qualification
  const filteredJobs = jobs.filter(
    (job) =>
      (selectedState === "All" || job.state === selectedState) &&
      (selectedQualification === "All" ||
        job.qualification === selectedQualification)
  );

  return (
    <div className="w-full min-h-screen bg-gray-50 pb-20">
      {/* Tabs */}
      <JobCategoryTabs
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        activeSubTab={activeSubTab}
        setActiveSubTab={setActiveSubTab}
      />

      {/* Filters */}
      <div className="max-w-6xl mx-auto mt-8 px-4">
        <StateGovtJobsHeader
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          selectedQualification={selectedQualification}
          setSelectedQualification={setSelectedQualification}
        />
      </div>

      {/* Job List */}
       <div className="max-w-6xl mx-auto mt-6 px-4 space-y-6">
        {loading ? (
          <p className="text-center text-gray-500">
            Loading {activeSubTab || activeCategory}...
          </p>
        ) : jobs.length > 0 ? (
          <SubTabContent activeSubTab={activeSubTab} data={filteredJobs} />
        ) : (
          <p className="text-center text-gray-600">
            No {activeSubTab || activeCategory} data found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
