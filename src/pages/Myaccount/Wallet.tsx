import React from "react";
import {
  MdCreditCard,
  MdQrCodeScanner,
  MdAccountBalance,
  MdSyncAlt,
  MdFileCopy,
  MdSmartphone,
  MdReceiptLong,
  MdConfirmationNumber,
  MdWorkspacePremium,
  MdSecurity,
  MdLiveTv,
  MdWallet,
  MdQuiz,
  MdSchool,
  MdExpandMore,
} from "react-icons/md";

// --- Data Structures ---

interface WalletService {
  name: string;
  Icon: React.ElementType;
}

const mainActions: WalletService[] = [
  { name: "Add Money", Icon: MdCreditCard },
  { name: "Pay", Icon: MdQrCodeScanner },
  { name: "Transfer", Icon: MdAccountBalance },
];

const services: WalletService[] = [
  { name: "Send money", Icon: MdSyncAlt },
  { name: "Request money", Icon: MdFileCopy },
  { name: "Mobile Recharge", Icon: MdSmartphone },
  { name: "Pay Bills", Icon: MdReceiptLong },
  { name: "Ticket Booking", Icon: MdConfirmationNumber },
  { name: "Rewards & Cashbacks", Icon: MdWorkspacePremium },
  { name: "Insurance", Icon: MdSecurity },
  { name: "Netflix Subscription", Icon: MdLiveTv },
  { name: "Watch & earn", Icon: MdWallet },
  { name: "Quizzes", Icon: MdQuiz },
  { name: "Courses", Icon: MdSchool },
];

// --- Sub Components ---

const MainActionButton: React.FC<{ action: WalletService }> = ({ action }) => (
  <button
    className="flex flex-col items-center space-y-1"
    onClick={() => console.log(`Action: ${action.name}`)}
  >
    <div className="bg-white p-4 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:bg-teal-50">
      <action.Icon className="text-teal-600 text-3xl" />
    </div>
    <p className="text-gray-800 text-xs font-medium mt-1">{action.name}</p>
  </button>
);

const ServiceItem: React.FC<{ service: WalletService }> = ({ service }) => (
  <button
    className="flex flex-col items-center w-1/4 sm:w-1/5 md:w-1/6 p-2 mb-4 space-y-1 group"
    onClick={() => console.log(`Service: ${service.name}`)}
  >
    <div className="bg-gray-100 p-3 rounded-xl group-hover:bg-teal-100 group-hover:scale-110 transition-all duration-300">
      <service.Icon className="text-gray-600 text-2xl group-hover:text-teal-700 transition-all" />
    </div>
    <p className="text-gray-600 text-[10px] sm:text-xs text-center font-medium group-hover:text-teal-700 transition-all">
      {service.name}
    </p>
  </button>
);

// --- Main Wallet Component ---

const Wallet: React.FC = () => {
  const walletBalance = "500";

  return (
    <div className="bg-gray-50 font-sans antialiased max-w-xl mx-auto shadow-2xl rounded-2xl overflow-hidden min-h-screen">
      {/* Wallet Header Section */}
      <div className="relative bg-linear-to-br from-teal-700 to-teal-500 pb-20 rounded-b-3xl shadow-lg">
        {/* Header Top */}
        <header className="flex justify-end p-4">
          <button className="flex items-center space-x-1 bg-black/30 text-white text-sm font-semibold px-4 py-1.5 rounded-full hover:bg-black/50 transition-all">
            <span>History</span>
            <MdExpandMore className="text-lg" />
          </button>
        </header>

        {/* Balance Display */}
        <div className="px-5 pt-4 pb-8">
          <p className="text-white text-opacity-80 text-sm mb-1">
            Wallet Balance :
          </p>
          <div className="flex justify-between items-center">
            <h1 className="text-white text-4xl font-bold">₹ {walletBalance}</h1>
            <button className="bg-white text-teal-600 text-sm font-bold px-4 py-2 rounded-full shadow-md hover:bg-gray-100 transition-all">
              WITHDRAW
            </button>
          </div>
        </div>

        {/* Floating Action Buttons */}
        <div className="absolute inset-x-0 bottom-[-65px] flex justify-around px-4">
          {mainActions.map((action) => (
            <MainActionButton key={action.name} action={action} />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="pt-80px px-4 pb-10">
        {/* Services Section */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Services</h2>
          <div className="flex flex-wrap justify-start">
            {services.map((service) => (
              <ServiceItem key={service.name} service={service} />
            ))}
          </div>
        </section>

        {/* Transactions Section */}
        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-4">Transactions</h2>
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <p className="text-gray-500 text-sm">
              Transaction history will load here...
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Wallet;
