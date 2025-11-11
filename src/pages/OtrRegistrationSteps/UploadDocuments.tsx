import React, { useState } from "react";

interface UploadDocumentsProps {
  nextStep: () => void;
  prevStep?: () => void;
  updateFormData: (data: any) => void;
  formData: any;
}

const UploadDocuments: React.FC<UploadDocumentsProps> = ({
  nextStep,
  prevStep,
  updateFormData,
  formData,
}) => {
  // 📂 Document Fields
  const documentList = [
    "Scanned Photograph Of The Candidate",
    "Scanned Signature Of The Candidate",
    "Scanned Aadhar Card Of The Candidate",
    "Scanned PAN Card Of The Candidate",
    "Scanned Caste Certificate Of The Candidate",
    "Scanned 10th Class Certificate Of The Candidate",
    "Scanned 12th or Diploma Certificate Of The Candidate",
    "Scanned Graduation Certificate Of The Candidate",
    "Scanned Post Graduation Certificate Of The Candidate",
    "Upload Your Updated Resume",
  ];

  // 🧠 State
  const [documents, setDocuments] = useState<File[]>(formData?.documents || []);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading] = useState(false);

  // 📸 File Upload Handler
  const handleFileChange = (index: number, file: File | null) => {
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    const maxSize = 1 * 1024 * 1024; // 1 MB

    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => {
        const newErrors = [...prev];
        newErrors[index] = "Only JPG, PNG, or PDF allowed.";
        return newErrors;
      });
      return;
    }

    if (file.size > maxSize) {
      setErrors((prev) => {
        const newErrors = [...prev];
        newErrors[index] = "File size should be under 1MB.";
        return newErrors;
      });
      return;
    }

    // ✅ Update file
    const updatedDocs = [...documents];
    updatedDocs[index] = file;
    setDocuments(updatedDocs);

    // Clear error
    setErrors((prev) => {
      const newErrors = [...prev];
      newErrors[index] = "";
      return newErrors;
    });
  };

  // ✅ Submit Handler
  const handleNext = () => {
    const missing = documentList.filter((_, idx) => !documents[idx]);
    if (missing.length > 0) {
      alert("⚠️ Please upload all required documents before proceeding.");
      return;
    }

    const payload = {
      // registrationType: "MANUAL",
      documents: documents, 
    };

    console.log("✅ Documents Payload:", payload);

    updateFormData(payload);
    nextStep();
  };

  // 💅 UI Components
  const FormLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <label className="block text-sm font-semibold text-gray-800 mb-1 text-left">
      {children}
    </label>
  );

  const NoteBox: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="rounded-md border border-yellow-300 bg-yellow-50 p-4 text-sm text-yellow-800 mb-6 text-left">
      {children}
    </div>
  );

  // 🧾 UI
  return (
    <div className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-lg border border-gray-100">
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
        Upload Documents
      </h2>

      {/* Notes */}
      <NoteBox>
        <p className="font-semibold">Note:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Ensure all documents are scanned clearly and legibly.</li>
          <li>Only original and valid certificates will be accepted.</li>
          <li>
            File size should not exceed <strong>1 MB</strong> per document.
          </li>
          <li>Supported formats: JPG, JPEG, PNG, or PDF.</li>
          <li>Uploading forged or invalid documents may lead to disqualification.</li>
        </ul>
      </NoteBox>

      {/* Upload Guidelines */}
      <div className="space-y-4 text-left mb-8">
        <FormLabel>
          Guidelines for Scanning the Photograph, Signature & Documents:
        </FormLabel>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
          <li>Photograph should be recent, clear, and against a plain background.</li>
          <li>Signature must be done in BLACK ink and should not touch the border.</li>
          <li>Ensure that your name and other details on documents are readable.</li>
          <li>Use a proper scanner — avoid taking photos with a mobile camera.</li>
          <li>
            Save documents using file names that reflect their purpose (e.g.,{" "}
            <em>“10thCertificate.jpg”</em>).
          </li>
        </ul>
      </div>

      {/* Upload Fields */}
      <div className="space-y-6">
        {documentList.map((label, idx) => (
          <div key={idx} className="border-b border-gray-100 pb-4">
            <FormLabel>
              {idx + 1}. {label}
            </FormLabel>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={(e) =>
                handleFileChange(idx, e.target.files ? e.target.files[0] : null)
              }
              className="block w-full text-sm text-gray-700 border rounded-md p-2 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-pink-100 file:text-pink-700 hover:file:bg-pink-200 focus:ring-2 focus:ring-pink-400"
            />

            {documents[idx] && (
              <p className="text-green-600 text-xs mt-1">
                ✅ {documents[idx].name} uploaded successfully
              </p>
            )}
            {errors[idx] && (
              <p className="text-red-500 text-xs mt-1">{errors[idx]}</p>
            )}
          </div>
        ))}
      </div>

      {/* DigiLocker Integration */}
      <div className="mt-8 rounded-lg border border-pink-300 bg-pink-50 p-6 text-center shadow-sm">
        <p className="text-gray-800 font-bold text-lg mb-2">
          Upload Your Documents via DigiLocker
        </p>
        <p className="text-sm text-gray-600 mb-4">
          Securely fetch and verify your official documents directly from DigiLocker.
        </p>

        <button
          type="button"
          // onClick={handleDigiLockerUpload}
          className="inline-block rounded-md bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 px-6 py-2 text-white font-semibold shadow-md hover:from-pink-600 hover:via-rose-600 hover:to-pink-700 focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 transition-all duration-200"
        >
          Upload with DigiLocker
        </button>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-10">
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
          type="button"
          onClick={handleNext}
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
    </div>
  );
};

export default UploadDocuments;
