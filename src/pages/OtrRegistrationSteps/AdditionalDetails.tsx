import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface AdditionalDetailsProps {
  nextStep: () => void;
  prevStep?: () => void;
  updateFormData: (data: any) => void;
  formData: any;
}

interface AdditionalFormData {
  hasCasteCertificate: string;
  casteCertificateNumber?: string;
  verifyCasteCertificateNumber?: string;
  nationality: string;
  identificationMarks: string;
  hasDisability: string;
  disabilityType?: string;
  disabilityCertificateNumber?: string;
  permanentAddress: string;
  permanentState: string;
  permanentDistrict: string;
  permanentPincode: string;
  sameAddress: string;
  currentAddress?: string;
  currentState?: string;
  currentDistrict?: string;
  currentPincode?: string;
}

const AdditionalDetails: React.FC<AdditionalDetailsProps> = ({
  nextStep,
  prevStep,
  updateFormData,
  formData,
}) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AdditionalFormData>({
    shouldUnregister: false,
    defaultValues: formData || {},
  });

  const hasCasteCertificate = watch("hasCasteCertificate");
  const hasDisability = watch("hasDisability");
  const sameAddress = watch("sameAddress");

  const onSubmit = (data: AdditionalFormData) => {
    try {
      setLoading(true);

      // ✅ Build the flat API payload you requested
      const payload = {
        casteCertificateIssued: data.hasCasteCertificate === "Yes",
        casteCertificateNumber:
          data.hasCasteCertificate === "Yes" ? data.casteCertificateNumber : "",
        nationality: data.nationality,
        visibleIdentificationMarks: data.identificationMarks,
        typeOfDisability:
          data.hasDisability === "Yes" ? data.disabilityType || "" : "",
        disabilityCertificateNumber:
          data.hasDisability === "Yes" ? data.disabilityCertificateNumber || "" : "",
        permanentAddress: data.permanentAddress,
        permanentState: data.permanentState,
        permanentDistrict: data.permanentDistrict,
        permanentPincode: data.permanentPincode,
        currentAddressSameAsPermanent: data.sameAddress === "Yes",
        currentAddress:
          data.sameAddress === "Yes" ? data.permanentAddress : data.currentAddress || "",
        currentState:
          data.sameAddress === "Yes" ? data.permanentState : data.currentState || "",
        currentDistrict:
          data.sameAddress === "Yes" ? data.permanentDistrict : data.currentDistrict || "",
        currentPincode:
          data.sameAddress === "Yes" ? data.permanentPincode : data.currentPincode || "",
      };

      console.log("✅ Final Additional Details Payload:", payload);

      // Save to parent
      updateFormData(payload);

      nextStep();
    } catch (error) {
      console.error("❌ Error saving additional details:", error);
      alert("Something went wrong while saving additional details.");
    } finally {
      setLoading(false);
    }
  };

  // ---------- Helper UI Components ----------
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

  const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
    <input
      {...props}
      className={`mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800 focus:border-pink-500 focus:ring-pink-500 ${props.className || ""}`}
    />
  );

  const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => (
    <textarea
      {...props}
      className={`mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800 focus:border-pink-500 focus:ring-pink-500 ${props.className || ""}`}
    />
  );

  const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (props) => (
    <select
      {...props}
      className={`mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-pink-500 focus:ring-pink-500 ${props.className || ""}`}
    >
      {props.children}
    </select>
  );

  // ---------- JSX ----------
  return (
    <div className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-lg border border-gray-100">
      <h2 className="mb-8 text-center text-2xl font-bold text-gray-800">Additional Details</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 text-left">
        {/* Caste Certificate */}
        <div>
          <FormLabel required>1. Do you have a caste certificate?</FormLabel>
          <div className="flex gap-6 mt-2">
            {["Yes", "No"].map((option) => (
              <label key={option} className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="radio"
                  value={option}
                  {...register("hasCasteCertificate", { required: "Select Yes or No" })}
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500"
                />
                {option}
              </label>
            ))}
          </div>
          <ErrorMsg message={errors.hasCasteCertificate?.message} />

          {hasCasteCertificate === "Yes" && (
            <div className="pl-6 mt-3 space-y-4 border-l-2 border-pink-100">
              <div>
                <FormLabel required>a. Caste Certificate Number</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter certificate number"
                  {...register("casteCertificateNumber", {
                    required: "Certificate number is required",
                  })}
                />
                <ErrorMsg message={errors.casteCertificateNumber?.message} />
              </div>

              <div>
                <FormLabel required>b. Verify Certificate Number</FormLabel>
                <Input
                  type="text"
                  placeholder="Re-enter number"
                  {...register("verifyCasteCertificateNumber", {
                    validate: (val) =>
                      val === watch("casteCertificateNumber") ||
                      "Certificate numbers do not match",
                  })}
                />
                <ErrorMsg message={errors.verifyCasteCertificateNumber?.message} />
              </div>
            </div>
          )}
        </div>

        {/* Nationality */}
        <div>
          <FormLabel required>2. Nationality</FormLabel>
          <Select {...register("nationality", { required: "Select nationality" })}>
            <option value="">Select</option>
            <option value="Indian">Indian</option>
            <option value="Other">Other</option>
          </Select>
          <ErrorMsg message={errors.nationality?.message} />
        </div>

        {/* Identification Marks */}
        <div>
          <FormLabel required>3. Visible Identification Marks</FormLabel>
          <Input
            type="text"
            placeholder="Enter identification marks"
            {...register("identificationMarks", { required: "This field is required" })}
          />
          <ErrorMsg message={errors.identificationMarks?.message} />
        </div>

        {/* Disability */}
        <div>
          <FormLabel required>4. Are you a person with benchmark disability (PwBD)?</FormLabel>
          <div className="flex gap-6 mt-2">
            {["Yes", "No"].map((option) => (
              <label key={option} className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="radio"
                  value={option}
                  {...register("hasDisability", { required: "Select Yes or No" })}
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500"
                />
                {option}
              </label>
            ))}
          </div>
          <ErrorMsg message={errors.hasDisability?.message} />

          {hasDisability === "Yes" && (
            <div className="pl-6 mt-3 space-y-4 border-l-2 border-pink-100">
              <div>
                <FormLabel required>b. Disability Certificate Number</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter certificate number"
                  {...register("disabilityCertificateNumber", {
                    required: "Certificate number is required",
                  })}
                />
                <ErrorMsg message={errors.disabilityCertificateNumber?.message} />
              </div>
            </div>
          )}
        </div>

        {/* Permanent Address */}
        <div>
          <FormLabel required>5. Permanent Address</FormLabel>
          <TextArea
            rows={2}
            placeholder="Enter permanent address"
            {...register("permanentAddress", { required: "Address is required" })}
          />
          <ErrorMsg message={errors.permanentAddress?.message} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <FormLabel required>State / UT</FormLabel>
              <Select {...register("permanentState", { required: "State is required" })}>
                <option value="">Select</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Telangana">Telangana</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
              </Select>
              <ErrorMsg message={errors.permanentState?.message} />
            </div>
            <div>
              <FormLabel required>District</FormLabel>
              <Input
                type="text"
                placeholder="Enter district"
                {...register("permanentDistrict", { required: "District is required" })}
              />
              <ErrorMsg message={errors.permanentDistrict?.message} />
            </div>
          </div>

          <div className="mt-3">
            <FormLabel required>Pincode</FormLabel>
            <Input
              type="text"
              placeholder="Enter pincode"
              {...register("permanentPincode", {
                required: "Pincode is required",
                pattern: { value: /^\d{6}$/, message: "Enter valid 6-digit pincode" },
              })}
            />
            <ErrorMsg message={errors.permanentPincode?.message} />
          </div>
        </div>

        {/* Current Address */}
        <div>
          <FormLabel required>6. Is permanent address same as current address?</FormLabel>
          <div className="flex gap-6 mt-2">
            {["Yes", "No"].map((option) => (
              <label key={option} className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="radio"
                  value={option}
                  {...register("sameAddress", { required: "Select Yes or No" })}
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500"
                />
                {option}
              </label>
            ))}
          </div>
          <ErrorMsg message={errors.sameAddress?.message} />

          {sameAddress === "No" && (
            <div className="pl-6 mt-3 space-y-4 border-l-2 border-pink-100">
              <TextArea
                rows={2}
                placeholder="Enter current address"
                {...register("currentAddress", { required: "Address is required" })}
              />
              <ErrorMsg message={errors.currentAddress?.message} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <FormLabel required>State / UT</FormLabel>
                  <Select {...register("currentState", { required: "State is required" })}>
                    <option value="">Select</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                  </Select>
                  <ErrorMsg message={errors.currentState?.message} />
                </div>
                <div>
                  <FormLabel required>District</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter district"
                    {...register("currentDistrict", { required: "District is required" })}
                  />
                  <ErrorMsg message={errors.currentDistrict?.message} />
                </div>
              </div>

              <div>
                <FormLabel required>Pincode</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter pincode"
                  {...register("currentPincode", {
                    required: "Pincode is required",
                    pattern: { value: /^\d{6}$/, message: "Enter valid 6-digit pincode" },
                  })}
                />
                <ErrorMsg message={errors.currentPincode?.message} />
              </div>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-between pt-8">
          {prevStep && (
            <button
              type="button"
              onClick={prevStep}
              className="rounded-md bg-gradient-to-r from-gray-100 to-gray-200 py-2 px-8 text-lg font-semibold text-gray-700 shadow-sm hover:from-gray-200 hover:to-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-200"
            >
              Back
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className={`rounded-md ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:via-rose-600 hover:to-pink-700"
            } py-2 px-10 text-lg font-semibold text-white shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 transition-all duration-200`}
          >
            {loading ? "Saving..." : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdditionalDetails;
