import React, { useEffect, useState, useRef } from "react";
import { paymentSuccess } from "../services/apiHelpers";
import { base64ToFile } from "../Utils/fileUtils";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

const PaymentSuccess: React.FC = () => {
  const [status, setStatus] = useState("Processing your application...");
  const [otrId, setOtrId] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasSubmitted = useRef(false);
// const candidateId = useSelector((state: RootState) => state.user.candidateId);
 const otrCondidateId = useSelector((state: RootState) => state.otr.otrCondidateId);
  const draftRaw = localStorage.getItem("userotrData");

  useEffect(() => {
    async function submitApplication() {
      if (isSubmitting || hasSubmitted.current) return;

      setIsSubmitting(true);
      hasSubmitted.current = true;
      setError("");
      setStatus("Preparing your application...");

      try {
        if (!draftRaw) {
          setStatus("No draft found. Please start your application again.");
          setIsSubmitting(false);
          return;
        }

        const draft = JSON.parse(draftRaw);
        setOtrId(draft.otrasId);

        const livePhotoFile = base64ToFile(draft.photo, `${draft.otrasId}-photo.jpg`);
        const signatureFile = base64ToFile(draft.signature, `${draft.otrasId}-signature.jpg`);

        if (!livePhotoFile || !signatureFile) {
          throw new Error("Invalid photo or signature data.");
        }

        // ✅ Safe payload structure
        const payload = {
          candidateProfileId: otrCondidateId,
          otrId: draft.otrasId,
          jobPostId: draft.job?.id,
          vacancyId: draft.job?.vacancyDetails?.[0]?.id || 0,
          selectedCenters: Array.isArray(draft.center)
            ? draft.center
            : [draft.center],
          livePhoto: livePhotoFile,
          signature: signatureFile,
        };

        console.log("📦 Payload being sent:", payload);
        setStatus("Submitting your application...");

        const res = await paymentSuccess(payload);

        if (res?.data === "Application Submitted Successfully") {
          setStatus("✅ Application submitted successfully!");
          localStorage.removeItem("userotrData");
          setTimeout(() => (window.location.href = "/home"), 3000);
        } else {
          console.error("Unexpected backend response:", res.data);
          throw new Error(res.data || "Unexpected response from server.");
        }
      } catch (err: any) {
        console.error("🚨 Application submission failed:", err);
        hasSubmitted.current = false;
        setIsSubmitting(false);

        // ✅ React-safe error display
        const errMsg =
          err?.response?.data?.message ||
          err?.response?.data ||
          err?.message ||
          "Something went wrong. Please try again.";

        setStatus("❌ Application submission failed.");
        setError(typeof errMsg === "string" ? errMsg : JSON.stringify(errMsg));
      }
    }

    submitApplication();
  }, [draftRaw]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="text-6xl mb-6">{error ? "❌" : isSubmitting ? "⏳" : "🎉"}</div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">Payment Successful!</h1>

        <div
          className={`border rounded-lg p-4 mb-6 ${
            error ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"
          }`}
        >
          <div
            className={`text-lg font-semibold mb-2 ${
              error ? "text-red-600" : "text-green-600"
            }`}
          >
            {status}
          </div>

          {otrId && (
            <p className={`text-sm ${error ? "text-red-700" : "text-green-700"}`}>
              Your OTR ID: <strong>{otrId}</strong>
            </p>
          )}

          {error && (
            <div className="mt-3 p-3 bg-red-100 border border-red-300 rounded">
              <p className="text-red-700 text-sm">
                Error:{" "}
                {typeof error === "string"
                  ? error
                  : error || "Unexpected error"}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-2 bg-red-600 text-white py-1 px-3 rounded text-sm hover:bg-red-700"
                disabled={isSubmitting}
              >
                Try Again
              </button>
            </div>
          )}
        </div>

        {!error && (
          <>
            <p className="text-gray-600 mb-4">
              Your payment was successful and your application has been submitted.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left mb-6">
              <h3 className="font-semibold text-blue-800 mb-2">Next Steps</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Save your OTR ID for future reference</li>
                <li>• Admit card will be available before the exam</li>
                <li>• Check your email for confirmation</li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => (window.location.href = "/admit-card")}
                className="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 font-semibold transition-colors"
              >
                Check Admit Card Status
              </button>
              <button
                onClick={() => (window.location.href = "/")}
                className="bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 font-semibold transition-colors"
              >
                Return to Home
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
