import React, { useState } from "react";
import { FaUserCircle, FaCamera, FaFileSignature } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const JobApplicationForm: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { otrasId, job } = location.state || {};
    const [photo, setPhoto] = useState<File | null>(null);
    const [signature, setSignature] = useState<File | null>(null);
    const [center, setCenter] = useState<string>("");
    const [captchaInput, setCaptchaInput] = useState("");
    const [generatedCaptcha, setGeneratedCaptcha] = useState(generateCaptcha());
    const [loading, setLoading] = useState(false);

    function generateCaptcha(length = 6) {
        const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    }

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) setPhoto(e.target.files[0]);
    };

    const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) setSignature(e.target.files[0]);
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!center) return toast.error("Please select a coordination center.");
        if (!photo || !signature) return toast.error("Please upload both photo and signature.");
        if (captchaInput.trim().toUpperCase() !== generatedCaptcha.trim().toUpperCase()) {
            toast.error("Invalid captcha. Please try again.");
            setGeneratedCaptcha(generateCaptcha());
            setCaptchaInput("");
            return;
        }

        try {
            setLoading(true);

            // ✅ Prepare data to send to Payment page
            const formDataToSend = {
                otrasId,
                job,
                center,
                photo,      // File object
                signature,  // File object
            };

            console.log("📦 Sending data to Payment page:", formDataToSend);
            toast.success("🎉 Redirecting to Payment...");
            // ✅ Navigate to payment page with data in `state`
            navigate("/paymentPage", { state: formDataToSend });
        } catch (error) {
            console.error("❌ Error preparing data:", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    /* -------------------------------------------------------------------------- */
    /* 💅 UI Rendering                                                           */
    /* -------------------------------------------------------------------------- */
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-2xl bg-white border border-gray-200 shadow-md rounded-lg p-6 space-y-6"
            >
                {/* Header Section */}
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-800 underline mb-1">
                        {job?.jobCategory || "Job Application"}
                    </h2>
                    <p className="text-sm text-gray-700">
                        <strong>POST NAME:</strong> {job?.jobTitle || "N/A"}
                    </p>
                </div>

                {/* OTR Section */}
                <div className="text-center">
                    <p className="text-sm font-medium text-gray-700">Apply Through OTR</p>
                    <div className="mt-2 inline-flex items-center gap-2 text-xl font-bold text-red-600 border border-red-300 px-5 py-2 rounded-md bg-red-50">
                        <FaUserCircle size={26} className="text-gray-700" />
                        {otrasId || "N/A"}
                    </div>
                </div>

                {/* Center Selection */}
                <div>
                    <p className="text-sm font-medium text-gray-700 mb-2 text-center">
                        Select Your Coordination Center
                    </p>
                    <div className="flex justify-center flex-wrap gap-4">
                        {["Vignan University", "Center - 2", "Center - 3"].map((label) => (
                            <button
                                key={label}
                                type="button"
                                onClick={() => setCenter(label)}
                                className={`px-6 py-2 rounded-md font-medium border transition-all duration-200 ${center === label
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Upload Section */}
                <div className="border border-gray-200 rounded-md bg-gray-50 p-6">
                    <p className="text-center text-base font-semibold mb-6 text-gray-700">
                        Upload Your Photo & Signature
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-10 sm:gap-20">
                        {/* Live Photo */}
                        <div className="flex flex-col items-center justify-start text-center">
                            <p className="text-sm font-semibold mb-3 text-gray-700">Live Photo</p>
                            <div className="w-28 h-28 rounded-full border border-gray-300 bg-white flex items-center justify-center overflow-hidden shadow-sm">
                                {photo ? (
                                    <img
                                        src={URL.createObjectURL(photo)}
                                        alt="Photo"
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <FaUserCircle size={70} className="text-gray-300" />
                                )}
                            </div>
                            <label className="mt-4 inline-flex items-center justify-center gap-2 bg-blue-600 text-white text-sm px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700 transition">
                                <FaCamera size={14} />
                                Upload Photo
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handlePhotoUpload}
                                />
                            </label>
                        </div>

                        {/* Signature */}
                        <div className="flex flex-col items-center justify-start text-center">
                            <p className="text-sm font-semibold mb-3 text-gray-700">Signature</p>
                            <div className="w-36 h-20 border border-gray-300 bg-white rounded-md flex items-center justify-center overflow-hidden shadow-sm">
                                {signature ? (
                                    <img
                                        src={URL.createObjectURL(signature)}
                                        alt="Signature"
                                        className="object-contain w-full h-full"
                                    />
                                ) : (
                                    <FaFileSignature size={45} className="text-gray-300" />
                                )}
                            </div>
                            <label className="mt-4 inline-flex items-center justify-center gap-2 bg-blue-600 text-white text-sm px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700 transition">
                                <FaFileSignature size={14} />
                                Upload Signature
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleSignatureUpload}
                                />
                            </label>
                        </div>
                    </div>
                </div>

                {/* Captcha Section */}
                <div className="text-center">
                    <p className="text-sm font-medium mb-2 text-gray-700">Enter the text as shown below:</p>
                    <div className="flex justify-center items-center gap-3">
                        <div className="font-bold text-2xl tracking-widest text-green-700 bg-gray-100 border border-gray-300 px-5 py-2 rounded-md select-none">
                            {generatedCaptcha}
                        </div>
                        <button
                            type="button"
                            onClick={() => setGeneratedCaptcha(generateCaptcha())}
                            className="text-blue-600 text-sm underline hover:text-blue-800"
                        >
                            Refresh
                        </button>
                    </div>
                    <input
                        type="text"
                        placeholder="Enter Captcha"
                        value={captchaInput}
                        onChange={(e) => setCaptchaInput(e.target.value)}
                        className="mt-3 w-48 border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-36 py-2 rounded-md font-semibold transition-all ${loading
                            ? "bg-gray-400 cursor-not-allowed text-white"
                            : "bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white hover:from-pink-600 hover:via-rose-600 hover:to-pink-700"
                            }`}
                    >
                        {loading ? "Submitting..." : "Next"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default JobApplicationForm;
