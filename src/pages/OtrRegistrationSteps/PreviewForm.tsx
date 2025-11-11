import React from "react";

export const PreviewForm: React.FC = () => {
  const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="flex flex-col text-left">
      <p className="text-sm font-medium text-gray-700 mb-1">{label}</p>
      <p className="text-gray-900 border rounded-md px-3 py-2 bg-gray-50 text-left">{value}</p>
    </div>
  );

  const UploadedDocument: React.FC<{ label: string }> = ({ label }) => (
    <div className="flex flex-col items-center justify-center p-3 border rounded-md shadow-sm bg-gray-50">
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-300">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4211/4211665.png"
          alt={`${label} document`}
          className="w-6 h-6 object-contain"
        />
      </div>
      <p className="text-xs text-gray-700 mt-2 text-center">{label}</p>
    </div>
  );

  return (
    <div className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-lg border border-gray-100">
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-8">
        Preview Form
      </h2>

      {/* Personal Details */}
      <div className="space-y-5 text-left">
        <h3 className="text-lg font-semibold text-gray-900">Personal Details</h3>

        <InfoRow label="1. Aadhar Number" value="123456985" />
        <InfoRow label="2. Type of ID" value="Aadhar" />
        <InfoRow
          label="3. Candidate's Name (As per matriculation certificate)"
          value="AMIT KUMAR"
        />
        <InfoRow label="4. New Name / Changed Name" value="-" />
        <InfoRow label="5. Father's Name" value="RAKESH" />
        <InfoRow label="6. Mother's Name" value="REENA" />
        <InfoRow label="7. Gender" value="Male" />
        <InfoRow label="8. Date of Birth" value="15/09/1987" />
        <InfoRow label="9. Category" value="General" />

        {/* Matriculation Section */}
        <h4 className="text-md font-semibold text-gray-900 mt-6">
          10. Matriculation (10th Class) Details
        </h4>
        <InfoRow
          label="a. Education Board"
          value="Central Board of Secondary Education (CBSE)"
        />
        <InfoRow label="b. Roll Number" value="520216" />
        <InfoRow label="c. Year of Passing" value="2016" />

        <InfoRow label="11. Level of Education" value="Matriculation (10th)" />
        <InfoRow label="12. Mobile Number" value="8526031786" />
        <InfoRow label="13. Email ID" value="rakesh123@gmail.com" />
        <InfoRow label="14. Identification Marks" value="Mole on Right Hand" />
        <InfoRow
          label="15. Are you person with benchmark disability (PwBD)?"
          value="No"
        />

        {/* Address Section */}
        <h4 className="text-md font-semibold text-gray-900 mt-6">
          16. Permanent Address
        </h4>
        <InfoRow
          label="a. Address"
          value="FLAT NO: B BLOCK 5 PRAVEENA APARTMENT"
        />
        <InfoRow label="b. State/UT" value="Punjab" />
        <InfoRow label="c. District" value="Patiala" />
        <InfoRow label="d. Pincode" value="140401" />
      </div>

      {/* Uploaded Documents */}
      <div className="mt-10 text-left">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Uploaded Documents
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {[
            "Image",
            "Signature",
            "Aadhar",
            "PAN",
            "CAST",
            "10th",
            "12th",
            "Graduation",
            "Post Graduation",
            "PhD",
          ].map((label) => (
            <UploadedDocument key={label} label={label} />
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-6 pt-10">
        <button
          type="button"
          className="rounded-md bg-linear-to-r from-sky-500 via-cyan-500 to-blue-600 py-2 px-8 text-lg font-semibold text-white shadow-md hover:from-sky-600 hover:via-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 transition-all duration-200"
        >
          Confirm
        </button>
        <button
          type="submit"
          className="rounded-md bg-linear-to-r from-pink-500 via-rose-500 to-pink-600 py-2 px-8 text-lg font-semibold text-white shadow-md hover:from-pink-600 hover:via-rose-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 transition-all duration-200"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default PreviewForm;