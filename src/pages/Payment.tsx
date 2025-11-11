import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createCheckoutSession } from "../services/apiHelpers";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { fileToBase64 } from "../Utils/fileUtils";
import { setPaymentData } from "../store/slice/OtruserData";

interface JobData {
  jobTitle: string;
  jobCategory: string;
  fee: number;
}

interface ApplicationData {
  job: JobData;
  otrasId: string;
  center: string;
  photo: File;
  signature: File;
}

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [applicationData, setApplicationData] = useState<ApplicationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dataFromState = location.state as ApplicationData | null;
    if (!dataFromState) {
      toast.error("No application data found. Please start over.");
      navigate("/jobs");
      return;
    }
    setApplicationData(dataFromState);
    setLoading(false);
  }, [location.state, navigate]);

  // ✅ Convert files to base64 and store data
  useEffect(() => {
    async function saveData() {
      if (applicationData) {
        const { photo, signature, ...rest } = applicationData;
        const [photoBase64, signatureBase64] = await Promise.all([
          fileToBase64(photo),
          fileToBase64(signature),
        ]);

        const safeData = { ...rest, photo: photoBase64, signature: signatureBase64 };

        localStorage.setItem("userotrData", JSON.stringify(safeData));
        dispatch(setPaymentData(safeData));
        console.log("✅ Stored userotrData:", safeData);
      }
    }
    saveData();
  }, [applicationData, dispatch]);

  const startPayment = async () => {
    if (!applicationData) {
      toast.info("Missing application data. Please try again.");
      return;
    }

    try {
      const { job } = applicationData;
      const amount = Math.round(job.fee * 100);
      const productName = `Application Fee - ${job.jobTitle} (${job.jobCategory})`;

      const res = await createCheckoutSession({
        amount,
        productName,
        successUrl: `${window.location.origin}/paymentSucess`,
        cancelUrl: `${window.location.origin}/paymentfaild`,
      });

      const checkoutUrl = res?.data;
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        throw new Error("Invalid checkout URL from server.");
      }
    } catch {
      toast.error("Payment failed. Please try again later.");
    }
  };

  if (loading || !applicationData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p>Loading payment details...</p>
      </div>
    );
  }

  const { job, otrasId, center } = applicationData;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            Application Fee Payment
          </h2>

          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4 text-blue-800">Application Summary</h3>
            <p><strong>Job Title:</strong> {job.jobTitle}</p>
            <p><strong>Post Name:</strong> {job.jobCategory}</p>
            <p><strong>OTR ID:</strong> {otrasId}</p>
            <p><strong>Center:</strong> {center}</p>
          </div>

          <div className="text-center mb-8">
            <p className="text-4xl font-bold text-indigo-600 mb-2">₹{job.fee}</p>
            <p className="text-gray-600">Application Fee</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={startPayment}
              className="w-full py-4 bg-indigo-600 text-white rounded-lg font-semibold shadow-lg hover:bg-indigo-700 transition"
            >
              Pay Now
            </button>
            <button
              onClick={() => navigate(-1)}
              className="w-full py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              Back to Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
