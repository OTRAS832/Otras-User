import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PaymentFailed: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [errorMessage, setErrorMessage] = useState<string>(
    "Something went wrong while processing your payment."
  );

  useEffect(() => {
    // Read optional Stripe or custom error message passed via query or state
    const queryParams = new URLSearchParams(window.location.search);
    const reason =
      queryParams.get("error_message") ||
      (location.state as { message?: string })?.message ||
      "";

    if (reason) {
      setErrorMessage(reason);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        {/* ❌ Animated Failure Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center animate-pulse">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m-7 8a9 9 0 1118 0 9 9 0 01-18 0z"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-3">Payment Failed</h1>
        <p className="text-red-600 font-semibold mb-6">{errorMessage}</p>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
          <h3 className="text-red-800 font-semibold mb-2">Possible Reasons:</h3>
          <ul className="text-sm text-red-700 space-y-1">
            <li>• Your payment was cancelled or timed out</li>
            <li>• Insufficient funds or incorrect card details</li>
            <li>• Network or server connection issue</li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate(-1)}
            className="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 font-semibold transition-colors"
          >
            Try Payment Again
          </button>

          <button
            onClick={() => navigate("/")}
            className="bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 font-semibold transition-colors"
          >
            Return to Home
          </button>
        </div>

        <div className="mt-6 text-gray-500 text-sm">
          If the issue persists, please contact support.
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
