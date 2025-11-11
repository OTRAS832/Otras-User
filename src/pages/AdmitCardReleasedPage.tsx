import React, { useEffect, useState } from "react";

const AdmitCardReleasedPage: React.FC = () => {
  const [admitCards, setAdmitCards] = useState<any[]>([]);

  useEffect(() => {
    // Dummy API simulation
    setTimeout(() => {
      setAdmitCards([
        {
          id: 1,
          title: "SSC GD Admit Card Released - 2024",
          appliedDate: "Jan 15, 2024",
          releaseDate: "Mar 15, 2024",
          link: "#",
        },
        {
          id: 2,
          title: "DRDO Admit Card Released - 2024",
          appliedDate: "Jan 15, 2024",
          releaseDate: "Mar 15, 2024",
          link: "#",
        },
      ]);
    }, 500);
  }, []);

  return (
    <section className="bg-white min-h-screen py-10 px-4 md:px-16">
      {/* Header */}
      <div className="w-full bg-[#0B0B79] text-white py-4 rounded-t-xl text-center shadow-md mb-6">
        <h1 className="text-2xl font-semibold">Admit Card Released List</h1>
      </div>

      <div className="space-y-6">
        {admitCards.map((card) => (
          <div
            key={card.id}
            className="flex flex-col md:flex-row justify-between items-center border border-gray-300 rounded-2xl p-5 shadow-sm bg-gray-50 hover:shadow-md transition"
          >
            <div className="w-full md:w-2/3">
              <h3 className="text-lg md:text-xl font-semibold text-[#001F5C] mb-2">
                {card.title}
              </h3>
              <div className="text-sm text-gray-700 space-y-1">
                <p>
                  <span className="font-semibold">
                    Admit Card Delivery Applied Date:
                  </span>{" "}
                  {card.appliedDate}
                </p>
                <p>
                  <span className="font-semibold">
                    Admit Card Released Date:
                  </span>{" "}
                  {card.releaseDate}
                </p>
              </div>
            </div>
            <div className="hidden md:block h-12 w-[2px] bg-gray-300 mx-4"></div>
            <div className="w-full md:w-auto mt-4 md:mt-0">
              <button
                onClick={() => window.open(card.link, "_blank")}
                className="bg-gradient-to-r from-[#001F5C] to-[#0038A8] text-white px-6 py-2 rounded-md font-medium shadow hover:opacity-90 transition w-full md:w-auto"
              >
                View Admit Card
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdmitCardReleasedPage;
