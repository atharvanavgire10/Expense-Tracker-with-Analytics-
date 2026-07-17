import React from "react";

const InfoCard = ({ icon, label, value }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 flex items-center justify-center rounded-md bg-gray-100 text-[#0f172a]">
          {icon}
        </div>

        <div>
          <p className="text-sm text-gray-600 font-medium">
            {label}
          </p>
          <p className="text-xl font-semibold text-[#0f172a] mt-1">
            ₹{value}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;