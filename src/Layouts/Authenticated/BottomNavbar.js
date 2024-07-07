import React from "react";

const BottomNavbar = ({ children }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0D2D56] text-white flex justify-around items-center h-16 rounded-t-xl ">
      <div className="flex bg-gradient-to-b from-[#194979] to-[#0D2D56] rounded-full justify-center items-center w-[81px] h-[81px] mt-[-60px] border-[8px] border-[#E8F0FB] ">
        <i className="bx bx-home-alt text-[#FFF845] text-[30px] "></i>
      </div>
      <div className="flex flex-col justify-center items-center  ">
        <i className="bx bx-history text-[30px] text-[#ffff] text-center "></i>
        <p className="text-[10px] text-[#ffff] text-center ">History</p>
      </div>
      <div className="flex flex-col items-center">
        <i className="bx bx-user text-[30px] text-[#ffff] "></i>
        <p className="text-[10px] text-[#ffff] text-center ">Profile</p>
      </div>
      <div className="flex flex-col items-center">
        <i className="bx bx-log-out text-[30px] text-[#ffff] "></i>
        <p className="text-[10px] text-[#ffff] text-center ">Logout</p>
      </div>
    </div>
  );
};

export default BottomNavbar;
