import React, { useState } from 'react';
import { FaArrowLeft, FaWhatsapp, FaTwitter, FaInstagram, FaFacebookF, FaCopy, FaShareAlt } from 'react-icons/fa';

// --- Sub-Component: Social Share Button ---
interface SocialButtonProps {
  icon: React.ReactNode;
  label: string;
  bgColor: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({ icon, label, bgColor }) => (
  <button
    className={`flex flex-col items-center justify-center p-2 rounded-lg w-1/4 transition-transform hover:scale-105`}
    style={{ backgroundColor: bgColor }}
    onClick={() => console.log(`Sharing via ${label}`)}
  >
    <div className="text-white text-2xl mb-1">{icon}</div>
    <span className="text-white text-xs font-semibold">{label}</span>
  </button>
);

// --- Main Component: Refer ---

const Refer: React.FC = () => {
  const [referralCode] = useState('Sthv3835');

  const handleGoBack = () => {
    console.log("Navigating back...");
    // navigate(-1) if using react-router-dom
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    alert(`Referral code ${referralCode} copied to clipboard!`);
    console.log("Code copied.");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Refer & Earn',
        text: `Hey, check out this app! Use my referral code: ${referralCode}`,
        url: window.location.href,
      }).catch((error) => console.log('Error sharing:', error));
    } else {
      alert("Share API not supported in this browser. Please use Copy.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      
      {/* Header with Back Arrow and Title */}
      <div className="flex items-center p-4 bg-white border-b sticky top-0 z-10 shadow-sm">
        <button onClick={handleGoBack} className="text-gray-700 hover:text-teal-600 transition mr-3">
          <FaArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Refer And Earn</h1>
      </div>

      <div className="p-4">
        
        {/* Refer and Earn Banner */}
        <div className="bg-yellow-50 bg-opacity-70 rounded-xl p-6 shadow-md border border-yellow-100 mb-8">
          <div className="flex justify-center items-center relative">
            {/* Placeholder images */}
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Referrer" className="w-20 h-20" />
            <div className="border-t-2 border-dashed border-gray-400 w-12 mx-2"></div>
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135783.png" alt="Friend" className="w-20 h-20" />
          </div>
          <p className="text-center text-lg font-semibold text-gray-700 mt-4">
            Send a Referral Link to your **FRIEND**
          </p>
        </div>

        {/* Earning Rules Section */}
        <div className="space-y-4 mb-8">
            {/* Rule 1: Friend Signs Up */}
            <div className="bg-white p-4 rounded-xl shadow-inner border-l-4 border-teal-500">
                <p className="text-center font-semibold text-gray-600 mb-2">Your friend SIGNS UP</p>
                <div className="flex justify-around items-center text-center">
                    <div className='flex items-center'>
                        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="You" className="w-8 mr-2"/>
                        <p className="text-lg font-bold text-gray-800">You get **Rs. 2**</p>
                    </div>
                    <div className='flex items-center'>
                        <p className="text-lg font-bold text-gray-800">You get **Rs. 5**</p>
                        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135783.png" alt="Friend" className="w-8 ml-2"/>
                    </div>
                </div>
            </div>

            {/* Rule 2: Friend Completes First Apply */}
            <div className="bg-white p-4 rounded-xl shadow-inner border-l-4 border-indigo-500">
                <p className="text-center font-semibold text-gray-600 mb-2">When Your friend completes first apply</p>
                <div className="flex justify-center items-center text-center">
                    <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="You" className="w-8 mr-2"/>
                    <p className="text-lg font-bold text-gray-800">You get ADDITIONAL amount of **Rs. 20**</p>
                </div>
            </div>
        </div>

        {/* Action Button */}
        <button className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-full shadow-lg transition duration-200 mb-8 uppercase">
          SEE WHO'S ON APP
        </button>

        {/* Refer Via Section */}
        <h3 className="text-center text-lg font-bold text-gray-700 mb-4">Refer VIA</h3>
        <div className="flex justify-around space-x-2 mb-8">
          <SocialButton icon={<FaWhatsapp />} label="Whatsapp" bgColor="#25D366" />
          <SocialButton icon={<FaTwitter />} label="Twitter" bgColor="#1DA1F2" />
          <SocialButton icon={<FaInstagram />} label="Instagram" bgColor="#E4405F" />
          <SocialButton icon={<FaFacebookF />} label="Facebook" bgColor="#1877F2" />
        </div>

        {/* Referral Code */}
        <div className="p-4 bg-white rounded-xl shadow-inner border border-gray-200">
          <p className="text-sm font-semibold text-gray-700 mb-2">REFERRAL CODE</p>
          <div className="flex justify-between items-center">
            <span className="text-xl font-extrabold text-teal-800">{referralCode}</span>
            <div className="flex space-x-4">
              <button 
                onClick={handleCopyCode} 
                className="flex items-center text-gray-600 hover:text-teal-600 transition"
              >
                <FaCopy size={18} className="mr-1" /> Copy
              </button>
              <button 
                onClick={handleShare} 
                className="flex items-center text-gray-600 hover:text-teal-600 transition"
              >
                <FaShareAlt size={18} className="mr-1" /> Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Refer;