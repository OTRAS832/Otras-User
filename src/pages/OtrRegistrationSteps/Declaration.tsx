import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { setOtrData } from "../../store/slice/OtruserData";
import { toast } from "react-toastify";

/* -------------------------------------------------------------------------- */
/* 🎯 1️⃣ Type Definitions (copied locally for self-contained setup) */
/* -------------------------------------------------------------------------- */

// ✅ Personal Details
export interface PersonalDetailsData {
  aadharCardNumber: string;
  candidateName: string;
  changedName?: string;
  gender: string;
  dateOfBirth: string;
  fathersName: string;
  mothersName: string;
  mobile?: string;
  email?: string;
  aadharNumber?: string;
  idType?: string;
  idNumber?: string;
}

// ✅ Professional Details
export interface ProfessionalDetailsData {
  matriculationEducationBoard?: string;
  matriculationRollNumber?: string;
  matriculationYearOfPassing?: string;
  matriculationSchoolName?: string;
  matriculationPercentage?: string;
  matriculationCgpa?: string;

  secondaryEducationBoard?: string;
  secondaryRollNumber?: string;
  secondaryYearOfPassing?: string;
  secondaryCollegeName?: string;
  secondaryPercentage?: string;
  secondaryCgpa?: string;

  graduationEducationBoard?: string;
  graduationRollNumber?: string;
  graduationYearOfPassing?: string;
  graduationCollegeName?: string;
  graduationPercentage?: string;
  graduationCgpa?: string;
  specialization?: string;

  phdEducationBoard?: string;
  phdRollNumber?: string;
  phdYearOfPassing?: string;
  phdCollegeName?: string;
  phdPercentage?: string;
  phdCgpa?: string;
  thesisTitle?: string;
}

// ✅ Additional Details
export interface AdditionalDetailsData {
  casteCertificateIssued: boolean;
  casteCertificateNumber?: string;
  nationality: string;
  visibleIdentificationMarks: string;
  typeOfDisability?: string;
  disabilityCertificateNumber?: string;
  permanentAddress: string;
  permanentState: string;
  permanentDistrict: string;
  permanentPincode: string;
  currentAddressSameAsPermanent: boolean;
  currentAddress?: string;
  currentState?: string;
  currentDistrict?: string;
  currentPincode?: string;
}

// ✅ Uploaded Documents
export interface UploadedDocumentsData {
  documents: File[];
}

// ✅ Combined Form Data Type
export interface FormDataState {
  personalDetails: PersonalDetailsData;
  professionalDetails: ProfessionalDetailsData;
  additionalDetails: AdditionalDetailsData;
  documents: UploadedDocumentsData;
}

/* -------------------------------------------------------------------------- */
/* 🎯 2️⃣ Declaration Component */
/* -------------------------------------------------------------------------- */

interface DeclarationProps {
  prevStep?: () => void;
  formData: FormDataState;
  onSuccess?: () => void;
}

const Declaration: React.FC<DeclarationProps> = ({
  prevStep,
  formData,
  onSuccess,
}) => {
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // ✅ Fetch candidateId from Redux store
  const candidateId = useSelector((state: RootState) => state.user.candidateId);
  const candidateIdNumber = candidateId ? Number(candidateId) : null;

  /* ------------------------------------------------------------------------ */
  /* 🧠 Submit Handler                                                        */
  /* ------------------------------------------------------------------------ */


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreed) {
      alert("⚠️ Please agree to the declaration before submitting.");
      return;
    }

    try {
      setLoading(true);

      const payload = new FormData();

      // Append static fields
      if (candidateIdNumber !== null) {
        payload.append("candidateId", String(candidateIdNumber));
      }
      payload.append("registrationType", "MANUAL");

      // ✅ Append all individual form fields (NOT as JSON)
      const allData = {
        ...formData.personalDetails,
        ...formData.professionalDetails,
        ...formData.additionalDetails,
      };

      Object.entries(allData).forEach(([key, value]) => {
        // Convert booleans, numbers, undefined/null safely to strings
        payload.append(key, value !== undefined && value !== null ? String(value) : "");
      });

      // ✅ Append uploaded files if any
      const docs = formData.documents?.documents || [];
      docs.forEach((file: File) => {
        if (file instanceof File) {
          payload.append("documents", file, file.name);
        }
      });

      // 🧾 Debugging
      console.log("🧾 Final FormData Sent:");
      for (const [key, val] of payload.entries()) {
        console.log(key, val);
      }

      // ✅ API call
      const res = await axios.post(
        "http://localhost:8068/api/candidate/register",
        payload,
      );

      console.log("✅ API Success:", res.data);
      toast.success('Registration submitted successfully!')
      localStorage.setItem("otrNumber", res.data.otrasId);
      dispatch(setOtrData({ otrNumber: res.data.otrasId }));
      onSuccess?.();
    } catch (error: any) {
      console.error("❌ API Error:", error);
      alert(
        error.response?.data?.message ||
        "Something went wrong during submission. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ------------------------------------------------------------------------ */
  /* 💅 UI Layout                                                            */
  /* ------------------------------------------------------------------------ */
  return (
    <div className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-lg border border-gray-100">
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">
        Declaration
      </h2>

      <hr className="mb-6 border-gray-200" />

      <form
        onSubmit={handleSubmit}
        className="space-y-8 text-gray-800 text-left text-base leading-relaxed"
      >
        {/* Declaration Text */}
        <div>
          <p className="font-semibold text-gray-900 mb-2">
            One Time Registration
          </p>
          <p className="font-medium text-gray-800 mb-3">Declaration:</p>

          <ol className="list-decimal list-inside space-y-3 text-gray-700">
            <li>
              I hereby declare that the information provided by me in this form
              is true, complete, and correct to the best of my knowledge and
              belief.
            </li>
            <li>
              I understand that if any information is found to be false or
              incorrect at any stage, my candidature or appointment may be
              cancelled or terminated without notice.
            </li>
          </ol>
        </div>

        {/* Checkbox */}
        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
            className="h-4 w-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
          />
          <label
            htmlFor="agreement"
            className="text-sm text-gray-700 leading-5 cursor-pointer"
          >
            I hereby agree that I have read and understood the declaration above
            and all information submitted is accurate to the best of my
            knowledge.
          </label>
        </div>

        {/* ✅ Buttons */}
        <div className="flex justify-between pt-6">
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
            disabled={!agreed || loading}
            className={`rounded-md py-2 px-10 text-lg font-semibold transition-all duration-200 ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white hover:from-pink-600 hover:to-pink-700"
              }`}
          >
            {loading ? "Submitting..." : "Confirm & Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Declaration;
