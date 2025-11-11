import React from "react";
import JobCard from "./JobCard";
import SyllabusSection from "../pages/SubTabsList/SyllabusSection";
import PQPSection from "../pages/SubTabsList/PQPSection";
import AnswerKeySection from "../pages/SubTabsList/AnswerKeySection";
import CutoffSection from "../pages/SubTabsList/CutoffSection";
import ResultSection from "../pages/SubTabsList/ResultSection";


interface Props {
  activeSubTab: string;
  data: any[];
}

const SubTabContent: React.FC<Props> = ({ activeSubTab, data }) => {
  console.log(data)
  if (!activeSubTab) {
    return (
      <div className="space-y-6">
        {data?.map((job) => (
          <JobCard key={job.id} {...job} />
        ))}
      </div>
    );
  }

  switch (activeSubTab) {
    case "Syllabus":
      return <SyllabusSection data={data} />;
    case "PQP":
      return <PQPSection data={data} />;
    case "Answer Key":
      return <AnswerKeySection data={data} />;
    case "Results":
      return <ResultSection data={data} />;
    case "Cut-Off":
      return <CutoffSection data={data} />;
    default:
      return (
        <p className="text-center text-gray-500">
          No {activeSubTab} data found.
        </p>
      );
  }
};

export default SubTabContent;
