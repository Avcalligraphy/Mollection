import React, { useEffect, useState } from 'react'
import Button from '../components/Button'
import SplashScreen from './SplashScreen';
import { NavLink } from 'react-router-dom';

const LandingPage = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    // Set timeout untuk menutup SplashScreen setelah 10 detik
    const splashTimeout = setTimeout(() => {
      setLoading(false);
    }, 1500); // 10000 milidetik = 10 detik

    // Unsubscribe dari listeners saat komponen dibongkar
    return () => {
      clearTimeout(splashTimeout); // Hentikan timeout jika komponen dibongkar
    };
  }, []); //
  return (
    <>
      {isLoading === true ? (
        <SplashScreen />
      ) : (
        <>
          <div className="flex justify-start items-baseline   px-[53px] pt-[51px]">
            <div className="w-full">
              <img
                alt="logo"
                src="/images/logo.png"
                className="w-[50px] h-auto"
              />
              <h1 className=" font-medium text-[24px] mt-[18px]">
                Monitoring Electrical Consumption
              </h1>
              <h1 className=" font-light text-[16px] text-[#82868E] mt-[10px]">
                Save your energy, make the world better
              </h1>
              <NavLink to="/login">
                <Button
                  text="Explore Now"
                  color="shadow bg-[#2928AF] shadow-md shadow-black  text-white mt-[40px] text-center "
                />
              </NavLink>
            </div>
          </div>
          <img src="/images/bottomLanding.png" />
        </>
      )}
    </>
  );
}

export default LandingPage