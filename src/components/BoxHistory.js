import React from "react";

const BoxHistory = ({ statusToggle, dataBlynk, dataBill, date }) => {
  return (
    <div className="w-full">
      <h1 className="text-gray-500">{date}</h1>
      <div className="flex justify-between items-center">
        <div className="flex items-start mt-[10px]">
          <i className="bx bx-time text-[30px] text-black"></i>
          <div className="ml-[10px]">
            <h1 className="text-black text-[20px] font-semibold">
              {dataBlynk} kWH
            </h1>
          </div>
        </div>
        <h1 className="text-green-400 font-medium">Rp. {dataBill}</h1>
      </div>
    </div>
  );
};

export default BoxHistory;
