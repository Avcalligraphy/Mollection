import React from 'react'

const BoxEnergy = ({title, desc, image, style}) => {
  return (
    <div className="bg-gradient-to-b from-[#194979] to-[#0D2D56] rounded-[14px] shadow-md shadow-gray-400 w-full px-[20px] py-[15px] ">
      <div className="flex justify-between gap-2 items-center">
        <div className=" flex items-center justify-center p-1 border-[1px] rounded-lg border-white ">
          <i className="bx bx-plug text-[20px] text-white font-normal "></i>
        </div>
        <h1 className="text-white text-[14px] font-semibold ">{title}</h1>
      </div>
      <h1 className="text-white text-[10px] my-2 ">
        Consume {image}
      </h1>
      <h1 className="text-white text-[14px] font-semibold">{desc} </h1>
    </div>
  );
}

export default BoxEnergy