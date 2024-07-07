import React from 'react'

const SplashScreen = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white object-cover">
      <div className="w-full">
        <div className="flex justify-center">
          <img alt="logo" src="/images/logo.png" className="w-auto h-[150px]" />
        </div>
        <h1 className="text-center text-[24px] text-[#2928AF] font-extrabold  mt-[30px]">
          Mollection
        </h1>
      </div>
    </div>
  );
}

export default SplashScreen