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
        <div className="flex justify-start items-baseline min-h-screen bg-[url('/public/images/bgImage-1.png')] object-cover px-[53px] pt-[111px]">
          <div className="w-full">
            <img
              alt="logo"
              src="/images/logo.png"
              className="w-[74px] h-auto"
            />
            <h1 className="max-w-[199px] font-medium text-[24px] mt-[18px]">
              Selamat Datang Sugeng Rawuh
            </h1>
            <h1 className=" font-bold text-[20px] ">꧋ꦱꦸꦒꦼꦁꦫꦮꦸꦃ꧉</h1>
            <NavLink to="/login">
              <Button
                text="Mulai"
                color="shadow bg-[#F3BE00] shadow-md shadow-black w-full text-white mt-[220px] text-center "
              />
            </NavLink>
            <NavLink to="/register">
              <Button
                text="Daftar"
                color="shadow bg-[#2928AF] shadow-md shadow-black w-full text-white mt-[20px] text-center "
              />
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
}

export default LandingPage