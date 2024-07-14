import React from 'react'

const EnergyComponent = ({title, image, desc, style}) => {
  return (
    <div className="bg-gradient-to-b from-[#194979] to-[#0D2D56] rounded-[14px] shadow-md shadow-gray-400 w-full px-[20px] py-[15px] ">
      <div className="flex justify-between items-center">
        <div className=" flex items-center justify-center p-1 border-[1px] rounded-lg border-white ">
          <img alt='' src={`/images/${image}.png`} />
        </div>
        <h1 className="text-white text-[14px] font-semibold ">{desc}</h1>
      </div>
      <h1 className="text-white text-[10px] my-2 ">{desc === 'Switch' ? '' : 'Konsumsi'} {desc}</h1>
      <h1 className="text-white text-[14px] font-semibold">{title}</h1>
    </div>
  );
}

export default EnergyComponent