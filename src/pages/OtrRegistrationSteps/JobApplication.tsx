import React, { useState, useEffect } from "react";
import PersonalDetails from "./PersonalDetails";
import ProfessionalDetails from "./ProfessionalDetails";
import AdditionalDetails from "./AdditionalDetails";
import UploadDocuments from "./UploadDocuments";
import Declaration from "./Declaration";
import Stepper from "./Stepper";

/* -------------------------------------------------------------------------- */
/* 🎯 1️⃣ TYPE DEFINITIONS */
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
/* 🎯 2️⃣ MAIN COMPONENT */
/* -------------------------------------------------------------------------- */

const JobApplication: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // ✅ Form data with initial empty types
  const [formData, setFormData] = useState<FormDataState>({
    personalDetails: {} as PersonalDetailsData,
    professionalDetails: {} as ProfessionalDetailsData,
    additionalDetails: {} as AdditionalDetailsData,
    documents: { documents: [] },
  });

  // ✅ Update step-wise form data safely
  const updateFormData = <T extends keyof FormDataState>(
    section: T,
    data: FormDataState[T]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data,
      },
    }));
  };

  useEffect(() => {
    console.log("📦 Updated formData:", formData);
  }, [formData]);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalDetails
            nextStep={nextStep}
            updateFormData={(data) => updateFormData("personalDetails", data)}
            formData={formData.personalDetails}
          />
        );

      case 2:
        return (
          <ProfessionalDetails
            nextStep={nextStep}
            prevStep={prevStep}
            updateFormData={(data) =>
              updateFormData("professionalDetails", data)
            }
            formData={formData.professionalDetails}
          />
        );

      case 3:
        return (
          <AdditionalDetails
            nextStep={nextStep}
            prevStep={prevStep}
            updateFormData={(data) => updateFormData("additionalDetails", data)}
            formData={formData.additionalDetails}
          />
        );

      case 4:
        return (
          <UploadDocuments
            nextStep={nextStep}
            prevStep={prevStep}
            updateFormData={(data) => updateFormData("documents", data)}
            formData={formData.documents}
          />
        );

      case 5:
        return <Declaration prevStep={prevStep} formData={formData} />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <Stepper currentStep={currentStep} setCurrentStep={setCurrentStep} />
      <div className="max-w-4xl mx-auto px-4">{renderStep()}</div>
    </div>
  );
};

export default JobApplication;
