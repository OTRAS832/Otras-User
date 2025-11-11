import React, { useState } from "react";

// Define tabs and types
type MainTab = "Profile Setting" | "Address";
type ProfileSubTab = "Profile Details" | "Change Password" | "Delete Account";
type DeletionOption = "deactivate" | "delete";

interface AddressData {
  addressDetails: string;
  streetVillage: string;
  landmark: string;
  pincode: string;
  city: string;
  state: string;
}

const Settings: React.FC = () => {
  const [mainTab, setMainTab] = useState<MainTab>("Profile Setting");
  const [profileSubTab, setProfileSubTab] = useState<ProfileSubTab>("Change Password");
  const [selectedOption, setSelectedOption] = useState<DeletionOption>("deactivate");
  const [address, setAddress] = useState<AddressData>({
    addressDetails: "",
    streetVillage: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
  });

  const handleGoBack = () => console.log("Navigating back...");
  const handleAddressInputChange = (field: keyof AddressData, value: string) =>
    setAddress((prev) => ({ ...prev, [field]: value }));

  // ---------------- Components ----------------

  const InputField: React.FC<{
    label: string;
    placeholder?: string;
    type?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }> = ({ label, placeholder, type = "text" }) => (
    <div className="flex flex-col sm:flex-row sm:items-center mb-4">
      <label className="text-gray-700 font-medium mb-1 sm:mb-0 sm:w-1/3">{label} :</label>
      <input
        type={type}
        placeholder={placeholder}
       
        className="w-full sm:w-2/3 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-sm"
      />
    </div>
  );

  const SimpleOTPInput: React.FC<{ label: string }> = ({ label }) => (
    <div className="flex flex-col sm:flex-row sm:items-center mb-4">
      <label className="text-gray-700 font-medium mb-1 sm:mb-0 sm:w-1/3">{label} :</label>
      <input
        type="text"
        maxLength={6}
        className="w-full sm:w-1/3 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-sm"
      />
    </div>
  );

  const OTPInputWithButton: React.FC<{ label: string }> = ({ label }) => (
    <div className="flex flex-col sm:flex-row sm:items-center mb-4">
      <label className="text-gray-700 font-medium mb-1 sm:mb-0 sm:w-1/3">{label} :</label>
      <div className="flex items-center w-full sm:w-2/3">
        <input
          type="text"
          maxLength={6}
          className="w-1/2 sm:w-1/4 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-sm"
        />
        <button
          type="button"
          className="ml-3 text-sm text-teal-600 hover:text-teal-700 font-medium"
        >
          Send OTP
        </button>
      </div>
    </div>
  );

  const RadioCard: React.FC<{
    id: DeletionOption;
    title: string;
    description: string;
    color: string;
  }> = ({ id, title, description, color }) => (
    <label
      htmlFor={id}
      className={`flex flex-col sm:flex-row sm:items-start p-4 mb-4 rounded-xl cursor-pointer border transition-all ${
        selectedOption === id
          ? "border-teal-500 bg-teal-50 shadow-md"
          : "border-gray-200 bg-white hover:bg-gray-50"
      }`}
    >
      <input
        type="radio"
        id={id}
        name="deletionOption"
        value={id}
        checked={selectedOption === id}
        onChange={() => setSelectedOption(id)}
        className="mt-1 h-4 w-4 text-teal-600 focus:ring-teal-500"
      />
      <div className="ml-0 sm:ml-3 mt-2 sm:mt-0">
        <p className="text-base font-semibold text-gray-800">{title}</p>
        <p className="text-sm mt-1" style={{ color }}>
          {description}
        </p>
      </div>
    </label>
  );

  // ---------------- Renderers ----------------

  const renderProfileDetails = () => (
    <form className="p-4 space-y-4">
      <InputField label="Name" placeholder="Enter your full name" />
      <InputField label="Email" type="email" placeholder="Enter your email" />
      <OTPInputWithButton label="OTP" />
      <InputField label="Mobile" placeholder="Enter your mobile number" />
      <OTPInputWithButton label="OTP" />
      <InputField label="Qualification" placeholder="B.Tech, MBA, etc." />
      <InputField label="Interest" placeholder="Job Category/Field" />

      <div className="mt-6 flex justify-center">
        <button className="bg-indigo-900 hover:bg-indigo-800 text-white font-semibold py-2 px-8 rounded-lg shadow-lg transition duration-200 text-sm w-full sm:w-auto">
          Save
        </button>
      </div>
    </form>
  );

  const renderChangePassword = () => (
    <form className="p-4 space-y-4">
      <InputField label="Old Password" type="password" />
      <InputField label="New Password" type="password" />
      <InputField label="Confirm Password" type="password" />
      <InputField label="Mobile" type="tel" />
      <SimpleOTPInput label="OTP" />

      <div className="mt-6 flex justify-center">
        <button className="bg-indigo-900 hover:bg-indigo-800 text-white font-semibold py-2 px-8 rounded-lg shadow-lg transition duration-200 text-sm w-full sm:w-auto">
          Save
        </button>
      </div>
    </form>
  );

  const renderDeleteAccount = () => (
    <div className="p-4">
      <h2 className="text-lg font-bold text-gray-800 mb-2 text-center">Delete Profile ?</h2>
      <p className="text-sm text-gray-500 mb-4 text-center">
        Deleting your profile will remove all personal data.
      </p>

      <div className="flex justify-center my-4">
        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200 shadow-md">
          <img
            src="https://via.placeholder.com/150/808080/FFFFFF?text=User"
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <form className="max-w-md mx-auto">
        <RadioCard
          id="deactivate"
          title="Deactivate Account"
          description="Deactivation is temporary. Your account will be disabled."
          color="#ff6900"
        />
        <RadioCard
          id="delete"
          title="Delete Account"
          description="Deleting your account removes all your data permanently."
          color="#e00000"
        />

        <button
          type="submit"
          className="mt-6 w-full bg-indigo-900 hover:bg-indigo-800 text-white font-semibold py-2.5 rounded-lg shadow-lg transition duration-200 text-sm"
        >
          Delete
        </button>
      </form>
    </div>
  );

  const renderAddress = () => (
    <form className="p-4 space-y-4">
      <h2 className="text-lg font-bold text-gray-800 mb-2 text-center sm:text-left">
        Add Delivery Details
      </h2>

      <InputField
        label="Address Details"
        placeholder="Flat, House No., Apartment"
        value={address.addressDetails}
        onChange={(e) => handleAddressInputChange("addressDetails", e.target.value)}
      />
      <InputField
        label="Street / Village"
        placeholder="Street or Village"
        value={address.streetVillage}
        onChange={(e) => handleAddressInputChange("streetVillage", e.target.value)}
      />
      <InputField
        label="Landmark"
        placeholder="Landmark"
        value={address.landmark}
        onChange={(e) => handleAddressInputChange("landmark", e.target.value)}
      />
      <InputField
        label="PINCODE"
        type="number"
        placeholder="6-digit PIN"
        value={address.pincode}
        onChange={(e) => handleAddressInputChange("pincode", e.target.value)}
      />
      <InputField
        label="City"
        value={address.city}
        onChange={(e) => handleAddressInputChange("city", e.target.value)}
      />
      <InputField
        label="State"
        value={address.state}
        onChange={(e) => handleAddressInputChange("state", e.target.value)}
      />

      <div className="mt-6 flex justify-center">
        <button className="w-full sm:w-3/4 bg-indigo-900 hover:bg-indigo-800 text-white font-semibold py-2.5 rounded-lg shadow-lg transition duration-200 text-sm">
          Save
        </button>
      </div>
    </form>
  );

  // ---------------- Main Layout ----------------

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Header */}
      <header className="flex items-center p-4 bg-white border-b sticky top-0 z-10 shadow-sm">
        <button
          onClick={handleGoBack}
          className="text-gray-700 hover:text-teal-600 transition mr-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        <h1 className="text-lg sm:text-xl font-bold text-gray-800">Settings</h1>
      </header>

      <div className="p-3 sm:p-6">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-4 justify-center sm:justify-start">
          {["Profile Setting", "Address"].map((tab) => (
            <button
              key={tab}
              onClick={() => setMainTab(tab as MainTab)}
              className={`px-3 py-1.5 text-sm font-semibold rounded-full transition ${
                mainTab === tab
                  ? "bg-teal-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg">
          {mainTab === "Profile Setting" && (
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 border-b">
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {["Profile Details", "Change Password", "Delete Account"].map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setProfileSubTab(sub as ProfileSubTab)}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                      profileSubTab === sub
                        ? "bg-teal-500 text-white"
                        : "border border-teal-500 text-teal-600 hover:bg-teal-50"
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>

              <button className="mt-2 sm:mt-0 p-2 bg-indigo-900 rounded-full text-white hover:bg-indigo-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </button>
            </div>
          )}

          {mainTab === "Profile Setting" && profileSubTab === "Profile Details" && renderProfileDetails()}
          {mainTab === "Profile Setting" && profileSubTab === "Change Password" && renderChangePassword()}
          {mainTab === "Profile Setting" && profileSubTab === "Delete Account" && renderDeleteAccount()}
          {mainTab === "Address" && renderAddress()}
        </div>
      </div>
    </div>
  );
};

export default Settings;
