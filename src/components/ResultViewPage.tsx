import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { Loader2 } from "lucide-react"; // optional icon for spinner
import { getStudentResults } from "../services/apiHelpers";

interface ResultData {
  examRollNo: string;
  candidateName: string;
  setName: string;
  questionPaperId: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  percentage: string;
  status: string;
}

const ResultViewPage: React.FC = () => {
  const [hallticket, setHallticket] = useState<string>("");
  const [result, setResult] = useState<ResultData | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // ✅ API Call
  const handleSubmit = async (): Promise<void> => {
    if (!hallticket.trim()) {
      setError("⚠️ Please enter your Hallticket Number");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await getStudentResults(hallticket.trim())
      if (response.data && response.data.status) {
        setResult(response.data);
      } else {
        setError("❌ No result found for this Hallticket.");
        setResult(null);
      }
    } catch (err) {
      console.error("Error fetching result:", err);
      setError("❌ Invalid Hallticket or server not responding.");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Download PDF
  const handleDownloadPDF = (): void => {
    if (!result) return;

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Student Exam Result", 70, 20);

    doc.setFontSize(12);
    doc.text(`Candidate Name: ${result.candidateName}`, 20, 40);
    doc.text(`Hallticket: ${result.examRollNo}`, 20, 50);
    doc.text(`Set Name: ${result.setName}`, 20, 60);
    doc.text(`Question Paper ID: ${result.questionPaperId}`, 20, 70);
    doc.text("Result Summary:", 20, 90);

    doc.text(`Total Questions: ${result.totalQuestions}`, 30, 100);
    doc.text(`Correct Answers: ${result.correctAnswers}`, 30, 110);
    doc.text(`Wrong Answers: ${result.wrongAnswers}`, 30, 120);
    doc.text(`Percentage: ${result.percentage}`, 30, 130);

    doc.save(`${result.candidateName}_Result.pdf`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">
          🎓 Exam Result Viewer
        </h2>

        {/* ✅ Input Section */}
        <input
          type="text"
          placeholder="Enter Hallticket Number"
          value={hallticket}
          onChange={(e) => setHallticket(e.target.value)}
          className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          disabled={loading || !!result}
        />

        {!result && (
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full py-2 rounded-lg font-semibold text-white transition ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin w-5 h-5" />
                Loading...
              </span>
            ) : (
              "View Result"
            )}
          </button>
        )}

        {/* ✅ Error */}
        {error && (
          <p className="text-center text-red-600 font-medium mt-4">{error}</p>
        )}

        {/* ✅ Result Display */}
        {result && (
          <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg shadow-md p-5 animate-fadeIn">
            <h3 className="text-lg font-bold text-indigo-800 mb-3 text-center">
              {result.candidateName}
            </h3>
            <p className="text-gray-700 text-center mb-4">
              Roll No:{" "}
              <span className="font-semibold text-indigo-700">
                {result.examRollNo}
              </span>
            </p>

            <table className="w-full border border-gray-300 rounded-lg overflow-hidden mb-4">
              <tbody>
                <tr className="bg-indigo-100 font-semibold">
                  <td className="border px-3 py-2">Set Name</td>
                  <td className="border px-3 py-2">{result.setName}</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">Question Paper ID</td>
                  <td className="border px-3 py-2">{result.questionPaperId}</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">Total Questions</td>
                  <td className="border px-3 py-2">{result.totalQuestions}</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2 text-green-700 font-semibold">
                    Correct Answers
                  </td>
                  <td className="border px-3 py-2 text-green-700 font-semibold">
                    {result.correctAnswers}
                  </td>
                </tr>
                <tr>
                  <td className="border px-3 py-2 text-red-600 font-semibold">
                    Wrong Answers
                  </td>
                  <td className="border px-3 py-2 text-red-600 font-semibold">
                    {result.wrongAnswers}
                  </td>
                </tr>
                <tr className="bg-green-50 font-bold text-blue-800">
                  <td className="border px-3 py-2">Percentage</td>
                  <td className="border px-3 py-2">{result.percentage}</td>
                </tr>
              </tbody>
            </table>

            {/* ✅ Buttons */}
            <button
              onClick={handleDownloadPDF}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg mb-3 transition"
            >
              ⬇️ Download PDF
            </button>

            <button
              onClick={() => {
                setResult(null);
                setHallticket("");
                setError("");
              }}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg transition"
            >
              🔁 Check Another Result
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultViewPage;
