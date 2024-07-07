import React, { useEffect } from 'react'
import BoxNotif from '../components/BoxNotif';
import { useNavigate } from 'react-router-dom';
import AuthenticatedUser from '../Layouts/Authenticated';
import BoxHistory from '../components/BoxHistory';
import { useStopwatch } from 'react-timer-hook';

const Notifcations = ({statusToggle, dataBlynk, dataBill}) => {
  const navigate = useNavigate()
  const formatNumberNew = (number) => {
    if (typeof number !== "number") {
      throw new Error("Input harus berupa angka");
    }

    // Konversi number ke string dan pecah menjadi bagian bulat dan desimal
    const parts = number.toFixed(2).split(".");
    const integerPart = parts[0];
    const decimalPart = parts[1];

    // Tambahkan titik sebagai pemisah ribuan
    const formattedIntegerPart = integerPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      "."
    );

    // Gabungkan bagian bulat dan desimal dengan simbol mata uang
    const formattedNumber = `${formattedIntegerPart},${decimalPart}`;

    return formattedNumber; // atau nilai default lainnya jika data undefined
  };
  return (
    <AuthenticatedUser>
      <div className="w-full min-h-screen">
        <div className="bg-[url('/public/images/bgImageHistory.jpg')] w-full min-h-[250px] object-cover p-[30px] ">
          <p className="text-center text-white">Penggunaan Listrik</p>
          <h1 className="text-white text-[24px] text-center font-bold">
            {dataBlynk} kWH
          </h1>
          <p className="text-center text-white mt-[20px]">Tagihan Listrik</p>
          <h1 className="text-white text-[24px] text-center font-bold">
           Rp. {formatNumberNew(dataBill)}
          </h1>
        </div>
        <div className="mt-[-40px] rounded-t-[50px] bg-[#FFF3C9] w-full pt-[20px] min-h-screen">
          <h1 className="ml-[30px] font-semibold">Riwayat</h1>
          <navbar className="w-full flex justify-center items-center gap-[10px] pt-[20px]">
            <div className="py-[3px] px-[3px] flex justify-center items-center">
              <div>
                <h1 className="font-medium">September</h1>
                <div className="w-full mt-[6px] rounded-t-[5px] h-[4px] " />
              </div>
            </div>
            <div className="py-[3px] px-[3px] ">
              <div>
                <h1 className="font-medium">Oktober</h1>
                <div className="w-full mt-[6px] rounded-t-[5px] h-[4px] " />
              </div>
            </div>
            <div className="py-[3px] px-[3px]">
              <div>
                <h1 className="font-medium">November</h1>
                <div className="w-full mt-[6px] rounded-t-[5px] h-[4px] " />
              </div>
            </div>
            <div className="py-[3px] px-[3px]">
              <div>
                <h1 className="font-medium">Desember</h1>
                <div className="w-full mt-[6px] rounded-t-[8px] h-[4px] bg-[#006ACC]" />
              </div>
            </div>
          </navbar>
          <div className="w-full py-[20px] px-[30px] grid grid-cols-1 gap-[20px]">
            <BoxHistory statusToggle={statusToggle} dataBlynk={dataBlynk} dataBill={formatNumberNew(dataBill)} />
          </div>
        </div>
      </div>
    </AuthenticatedUser>
  );
}

export default Notifcations
