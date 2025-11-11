import React from "react";
import { Edit, CheckCircle, PlusCircle, ArrowLeft } from "lucide-react";

// --- Reusable Input Component ---
interface FormInputFieldProps {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  disabled?: boolean;
  type?: "text" | "number" | "select";
  options?: string[];
}

const FormInputField: React.FC<FormInputFieldProps> = ({
  id,
  label,
  value,
  placeholder = "",
  disabled = false,
  type = "text",
  options,
}) => {
  const InputElement = () => {
    if (type === "select" && options) {
      return (
        <select
          id={id}
          value={value}
          disabled={disabled}
          className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 text-sm appearance-none"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        className={`mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-800 focus:outline-none focus:ring-teal-500 focus:border-teal-500 text-sm ${
          disabled ? "bg-gray-100 text-gray-500" : ""
        }`}
      />
    );
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <InputElement />
    </div>
  );
};

// --- Main Component ---
const OtrForm: React.FC = () => {
  const formData = {
    aadharNumber: "12345699",
    typeOfId: "Aadhaar card",
    candidateName: "Amith kumar",
    fatherName: "Ravi kumar",
    newName: "Prakash",
    motherName: "Kumari",
    identificationMarks: "Small mole on left hand",
  };

  const progressPercentage = 100;

  const handleEdit = () => {
    console.log("Edit button clicked!");
  };

  return (
    <div className="p-6 md:p-8 bg-gray-50 min-h-screen w-full">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => console.log("Go back clicked")}
          className="mr-3 p-2 rounded-full hover:bg-gray-200 transition-colors text-gray-700"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">OTR Form</h1>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Progress Bar Section */}
        <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-100 mb-6">
          <div className="flex justify-between items-center mb-2">
            <p className="text-base font-semibold text-gray-700">
              Complete Your OTR Form
            </p>
            <span className="text-xl font-bold text-teal-600">
              {progressPercentage}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-3">
            <div
              className="bg-teal-500 h-2.5 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Get The Best Out By Adding The Remaining Details!
          </p>
          <div className="flex items-center justify-start gap-4 p-3 bg-gray-100 rounded-lg">
            <div className="flex items-center gap-2 text-teal-600">
              <CheckCircle size={24} className="text-green-500" />
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <PlusCircle size={24} className="text-blue-500" />
            </div>
          </div>
        </div>

        {/* Scrollable Form Preview */}
        <div className="bg-white p-6 rounded-xl shadow-2xl border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              OTR FORM Preview
            </h2>
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-lg transition-colors shadow-md"
            >
              <Edit size={18} />
              Edit
            </button>
          </div>

          {/* ✅ Scrollable container with fixed height */}
          <div
            className="
              space-y-6 
              max-h-[70vh] 
              overflow-y-auto 
              pr-2 
              scroll-smooth 
              scrollbar-thin 
              scrollbar-thumb-teal-400 
              scrollbar-track-gray-100
            "
          >
            <div className="border border-gray-200 rounded-lg p-4 bg-white">
              <h3 className="text-lg font-bold text-center text-teal-700 mb-5">
                Personal Details
              </h3>

              <FormInputField id="aadharNumber" label="1. Aadhar Number" value={formData.aadharNumber} disabled type="number" />
              <FormInputField id="typeOfId" label="2. Type of ID" value={formData.typeOfId} disabled type="select" options={["Aadhaar card", "Voter ID", "Passport"]} />
              <FormInputField id="candidateName" label="3. Candidate's Name" value={formData.candidateName} disabled />
              <FormInputField id="fatherName" label="4. Father's Name" value={formData.fatherName} disabled />
              <FormInputField id="newName" label="5. New / Changed Name" value={formData.newName} disabled />
              <FormInputField id="motherName" label="6. Mother's Name" value={formData.motherName} disabled />
              <FormInputField id="identificationMarks" label="7. Identification Marks" value={formData.identificationMarks} disabled />

              {/* Add filler fields to force scroll */}
              <FormInputField id="extra1" label="8. Extra Field 1" value="Demo Data" disabled />
              <FormInputField id="extra2" label="9. Extra Field 2" value="Demo Data" disabled />
              <FormInputField id="extra3" label="10. Extra Field 3" value="Demo Data" disabled />
              <FormInputField id="extra4" label="11. Extra Field 4" value="Demo Data" disabled />
              <FormInputField id="extra5" label="12. Extra Field 5" value="Demo Data" disabled />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtrForm;
