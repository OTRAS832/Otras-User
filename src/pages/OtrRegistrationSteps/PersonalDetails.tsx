import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface PersonalDetailsProps {
  nextStep: () => void;
  prevStep?: () => void;
  updateFormData: (data: any) => void;
  formData: any;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({
  nextStep,
  prevStep,
  updateFormData,
  formData,
}) => {

  const [changedNameChoice, setChangedNameChoice] = useState<"Yes" | "No" | null>(
    formData?.changedName ? "Yes" : null
  );
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: formData || {},
  });

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);

      // Prepare data payload
      const payload = {
        aadharCardNumber: data.aadharCardNumber,
        candidateName: data.candidateName,
        identificationCard: data.identificationCard,
        identificationCardNumber: data.identificationCardNumber,
        nameChanged: changedNameChoice === "Yes",
        changedName: changedNameChoice === "Yes" ? data.changedName : null,
        gender: data.gender,
        dateOfBirth: data.dateOfBirth,
        fathersName: data.fathersName,
        mothersName: data.mothersName,
      };

      console.log("✅ Personal details saved:", payload);

      // Save in parent (JobApplication)
      updateFormData(payload);

      // Move to next step
      nextStep();
    } catch (error) {
      console.error("❌ Error:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Helper UI components
  const FormLabel: React.FC<{ children: React.ReactNode; required?: boolean }> = ({
    children,
    required,
  }) => (
    <label className="block text-sm font-semibold text-gray-800 mb-1">
      {children}
      {required && <span className="text-red-500">*</span>}
    </label>
  );

  const ErrorMsg = ({ message }: { message?: string }) =>
    message ? <p className="text-xs text-red-500 mt-1">{message}</p> : null;

  return (
    <div className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-lg border border-gray-100">
      <h2 className="mb-8 text-center text-2xl font-bold text-gray-800">
        Personal Details
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-left">
        {/* Aadhar Choice */}
        {/* <div>
          <FormLabel required>Do you have an Aadhar card?</FormLabel>
          <div className="mt-2 flex gap-6">
            {["Yes", "No"].map((option) => (
              <label key={option} className="flex items-center space-x-2 text-sm text-gray-700">
                <input
                  type="radio"
                  name="aadharChoice"
                  checked={aadharChoice === option}
                  onChange={() => setAadharChoice(option as "Yes" | "No")}
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div> */}

        {/* Aadhar Fields */}
        {/* {aadharChoice === "Yes" && ( */}
        <div className="pl-6 mt-3 space-y-4 border-l-2 border-pink-100">
          <div>
            <FormLabel required>Aadhar Card Number</FormLabel>
            <input
              type="text"
              {...register("aadharCardNumber", {
                required: "Aadhar number is required",
                pattern: {
                  value: /^\d{12}$/,
                  message: "Aadhar number must be 12 digits",
                },
              })}
              placeholder="Enter Aadhar number"
              maxLength={12}
              className="w-full border rounded-md px-3 py-2 text-sm focus:border-pink-500 focus:ring-pink-500"
            />
            <ErrorMsg message={errors.aadharCardNumber?.message as string} />
          </div>
        </div>
        {/* <div>
              <FormLabel required>Verify Aadhar Number</FormLabel>
              <input
                type="number"
                {...register("verifyAadharNumber", {
                  validate: (val) =>
                    val === watch("aadharNumber") || "Aadhar numbers do not match",
                })}
                placeholder="Re-enter Aadhar number"
                className="w-full border rounded-md px-3 py-2 text-sm focus:border-pink-500 focus:ring-pink-500"
              />
              <ErrorMsg message={errors.verifyAadharNumber?.message as string} />
            </div>
          </div> */}
        {/* )} */}

        {/* Alternate ID Fields */}
        {/* {aadharChoice === "No" && ( */}
          <div className="pl-6 mt-3 space-y-4 border-l-2 border-pink-100">
            <div>
              <FormLabel required>Type of Identification Card</FormLabel>
              <select
                {...register("identificationCard", { required: "Please select ID type" })}
                className="w-full border rounded-md px-3 py-2 text-sm focus:border-pink-500 focus:ring-pink-500"
              >
                <option value="">Select</option>
                <option value="PAN">PAN Card</option>
                <option value="Passport">Passport</option>
                <option value="Driving License">Driving License</option>
              </select>
              <ErrorMsg message={errors.identificationCard?.message as string} />
            </div>
            <div>
              <FormLabel required>Identification Card Number</FormLabel>
              <input
                type="text"
                {...register("identificationCardNumber", { required: "ID number is required" })}
                placeholder="Enter ID number"
                maxLength={10}
                className="w-full border rounded-md px-3 py-2 text-sm focus:border-pink-500 focus:ring-pink-500"
              />
              <ErrorMsg message={errors.identificationCardNumber?.message as string} />
            </div>
          </div>
        {/* )} */}

        {/* Candidate Name */}
        <div>
          <FormLabel required>Candidate's Name (As per Matriculation Certificate)</FormLabel>
          <input
            type="text"
            {...register("candidateName", { required: "Name is required" })}
            placeholder="Enter full name"
            className="w-full border rounded-md px-3 py-2 text-sm focus:border-pink-500 focus:ring-pink-500"
          />
          <ErrorMsg message={errors.candidateName?.message as string} />
        </div>

        {/* Changed Name */}
        <div>
          <FormLabel required>Have you ever changed your name?</FormLabel>
          <div className="mt-2 flex gap-6">
            {["Yes", "No"].map((option) => (
              <label key={option } className="flex items-center space-x-2 text-sm text-gray-700">
                <input
                  type="radio"
                  checked={changedNameChoice === option}
                  onChange={() => setChangedNameChoice(option as "Yes" | "No")}
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        {changedNameChoice === "Yes" && (
          <div className="pl-6 mt-3 space-y-4 border-l-2 border-pink-100">
            <div>
              <FormLabel required>New/Changed Name</FormLabel>
              <input
                type="text"
                {...register("changedName", { required: "Please enter new name" })}
                placeholder="Enter new name"
                className="w-full border rounded-md px-3 py-2 text-sm focus:border-pink-500 focus:ring-pink-500"
              />
              <ErrorMsg message={errors.changedName?.message as string} />
            </div>
            <div>
              <FormLabel required>Verify New/Changed Name</FormLabel>
              <input
                type="text"
                {...register("verifyNewName", {
                  validate: (val) =>
                    val === watch("changedName") || "Names do not match",
                })}
                placeholder="Re-enter name"
                className="w-full border rounded-md px-3 py-2 text-sm focus:border-pink-500 focus:ring-pink-500"
              />
              <ErrorMsg message={errors.verifyNewName?.message as string} />
            </div>
          </div>
        )}

        {/* Gender */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <FormLabel required>Gender</FormLabel>
            <select
              {...register("gender", { required: "Please select gender" })}
              className="w-full border rounded-md px-3 py-2 text-sm focus:border-pink-500 focus:ring-pink-500"
            >
              <option value="">Select</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>
            <ErrorMsg message={errors.gender?.message as string} />
          </div>

          <div>
            <FormLabel required>Date of Birth</FormLabel>
            <input
              type="date"
              {...register("dateOfBirth", { required: "Please select date of birth" })}
              className="w-full border rounded-md px-3 py-2 text-sm focus:border-pink-500 focus:ring-pink-500"
            />
            <ErrorMsg message={errors.dateOfBirth?.message as string} />
          </div>
        </div>

        {/* Parents */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <FormLabel required>Father's Name</FormLabel>
            <input
              type="text"
              {...register("fathersName", { required: "Father's name is required" })}
              placeholder="Enter father's name"
              className="w-full border rounded-md px-3 py-2 text-sm focus:border-pink-500 focus:ring-pink-500"
            />
            <ErrorMsg message={errors.fathersName?.message as string} />
          </div>
          <div>
            <FormLabel required>Mother's Name</FormLabel>
            <input
              type="text"
              {...register("mothersName", { required: "Mother's name is required" })}
              placeholder="Enter mother's name"
              className="w-full border rounded-md px-3 py-2 text-sm focus:border-pink-500 focus:ring-pink-500"
            />
            <ErrorMsg message={errors.mothersName?.message as string} />
          </div>
        </div>

        {/* Email */}
        {/* <div>
          <FormLabel required>Email ID</FormLabel>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
            placeholder="Enter email"
            className="w-full border rounded-md px-3 py-2 text-sm focus:border-pink-500 focus:ring-pink-500"
          />
          <ErrorMsg message={errors.email?.message as string} />
        </div> */}

        {/* Submit */}
        <div className="pt-8 text-center flex justify-between">
          {prevStep && (
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition"
            >
              Back
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className={`rounded-md ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:via-rose-600 hover:to-pink-700"
              } py-2 px-10 text-lg font-semibold text-white shadow-md transition-all duration-200`}
          >
            {loading ? "Saving..." : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetails;
