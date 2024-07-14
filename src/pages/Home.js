import React, { useEffect, useState } from "react";

import axios from "axios";
import AuthenticatedUser from "../Layouts/Authenticated";
import BoxEnergy from "../components/BoxEnergy";
import EnergyComponent from "../components/EnergyComponent";
import Grafik from "../components/Grafik";
// ...
import { ToggleSwitch } from "flowbite-react";
import { useStopwatch } from "react-timer-hook";
import { useChartDataContext } from "../Redux/ChartDataContext";
import BottomNavbar from "../Layouts/Authenticated/BottomNavbar";
import ApexChart from "../components/ApexChart/ChartApex";

const Home = () => {
  const [dataBlynk, setDataBlynk] = useState("");
  const [dataBill, setDataBill] = useState("");
  const [dataAmpere, setDataAmpere] = useState("");
  const [dataVoltage, setDataVoltage] = useState("");
  const [dataDaya, setDataDaya] = useState("");
  const [timeReceived, setTimeReceived] = useState(0);
  const [dataToggle, setDataToggle] = useState(0);
  const [statusToggle, setStatusToggle] = useState();
  const { updateChartData1, updateChartData2, chartData1, chartData2 } =
    useChartDataContext();

  console.log(dataToggle);
  const fetchData = async (status) => {
    try {
      const apiUrl = `https://blynk.cloud/external/api/update?token=Nj_x0XR_IHVM8AcfZcXi71dugmPFBou2&v11=${status}`;
      const response = await axios.get(apiUrl);
      // Mengatur data ke dalam state
      console.log(response.status);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  useEffect(() => {
    // Fungsi yang akan dijalankan untuk mengambil data
    const fetchDataBlynk = async () => {
      // console.log("coba", device)
      try {
        const apiUrl = `https://blynk.cloud/external/api/get?token=Nj_x0XR_IHVM8AcfZcXi71dugmPFBou2&v4`;
        const apiUrlBill = `https://blynk.cloud/external/api/get?token=Nj_x0XR_IHVM8AcfZcXi71dugmPFBou2&v10`;
        const apiUrlAmpere = `https://blynk.cloud/external/api/get?token=Nj_x0XR_IHVM8AcfZcXi71dugmPFBou2&v2`;
        const apiUrlVoltage = `https://blynk.cloud/external/api/get?token=Nj_x0XR_IHVM8AcfZcXi71dugmPFBou2&v1`;
        const apiUrlDaya = `https://blynk.cloud/external/api/get?token=Nj_x0XR_IHVM8AcfZcXi71dugmPFBou2&v3`;
        const apiUrlStatusToggle = `https://blynk.cloud/external/api/get?token=Nj_x0XR_IHVM8AcfZcXi71dugmPFBou2&v11`;

        const response = await axios.get(apiUrl);
        const responseBill = await axios.get(apiUrlBill);
        const responseAmpere = await axios.get(apiUrlAmpere);
        const responseVoltage = await axios.get(apiUrlVoltage);
        const responseDaya = await axios.get(apiUrlDaya);
        const responseStatusToggle = await axios.get(apiUrlStatusToggle);
        setDataBlynk(response.data);
        setDataBill(responseBill.data);
        setDataAmpere(responseAmpere.data);
        setDataVoltage(responseVoltage.data);
        setDataDaya(responseDaya.data);
        setStatusToggle(responseStatusToggle.data);
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
      }
    };

    // Panggil fetchData saat komponen pertama kali dimount
    fetchDataBlynk();

    // Atur interval untuk mengambil data setiap 5 detik (sesuaikan sesuai kebutuhan Anda)
    const intervalId = setInterval(fetchDataBlynk, 500);

    // Bersihkan interval saat komponen unmount
    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 500);
    return () => clearInterval(intervalId);
  }, []);
    useEffect(() => {
      const intervalId = setInterval(() => {
        setTimeReceived((prevTime) => prevTime + 1);
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }, []);

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
      <div className="w-full min-h-screen">
        <div className=" flex gap-4 items-center  px-4  min-h-[160px] bg-gradient-to-b from-[#194979] to-[#0D2D56]">
          <h1 className="text-white font-bold text-[18px] ">MOLECTION</h1>
          <div className="flex gap-1 items-center">
            <div className="bg-green-400 h-[10px] w-[10px] rounded-full " />
            <p className="text-white text-[10px] ">Online</p>
          </div>
        </div>
        <svg
          className="mt-[-2px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#0D2D56"
            fill-opacity="1"
            d="M0,0L80,42.7C160,85,320,171,480,176C640,181,800,107,960,74.7C1120,43,1280,53,1360,58.7L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          ></path>
        </svg>
        <div className="mt-[-140px] bg-white opacity-[0.8] w-full p-[10px] rounded-tr-[74px] rounded-bl-[74px]">
          <div className="grid grid-cols-1 gap-[10px] rounded-[20px]">
            <div style={{ width: "100%", height: "100%" }}>
              <Grafik
                color="#D32020"
                title="Grafik kWH"
                value="kWH"
                valueX="Time (s)"
                valueY="kWH"
                distances={dataBlynk}
                times={timeReceived}
                updateChartData={updateChartData1} // Gunakan fungsi updateChartData1
                chartData={chartData1}
              />
              {/* <Grafik
                color="#D32020"
                title="Grafik Harga"
                value="Harga"
                valueX="Time (s)"
                valueY="Harga"
                distances={dataBill}
                times={timeReceived}
                updateChartData={updateChartData2} // Gunakan fungsi updateChartData2
                chartData={chartData2}
              /> */}
            </div>
          </div>
        </div>
        {/* <div className="mt-[-140px] px-0  opacity-[0.8] w-full  rounded-[20px]">
          <ApexChart />
        </div> */}

        <div className="px-[18px] flex gap-[17px] mt-[36px]">
          <BoxEnergy
            title="Konsumsi Energi"
            desc={`${dataBlynk}`}
            image="kWH"
            style="text-blue-500"
          />
          <BoxEnergy
            title="Konsumsi Pemakaian"
            desc={`${formatNumberNew(parseFloat(dataBill))}`}
            image="Rp."
            style="text-red-500"
          />
        </div>
        <div className="grid grid-cols-2 justify-center items-center gap-[20px] mt-[34px] mb-[114px] px-[10px]">
          <EnergyComponent
            title={dataVoltage}
            desc="Tegangan"
            image="voltage"
          />
          <EnergyComponent title={dataAmpere} desc="Arus" image="ampere" />
          <EnergyComponent title={dataDaya} desc="Daya" image="voltage" />
          <EnergyComponent
            title={<MyStopwatch statusToggle={statusToggle} />}
            desc="Menit"
            image="time"
          />
          <EnergyComponent
            title={
              <div className="flex items-center mt-[10px]">
                <ToggleSwitch
                  checked={dataToggle}
                  onClick={() => {
                    setDataToggle(dataToggle === 0 ? 1 : 0);
                    fetchData(dataToggle);
                  }}
                />
                <h1 className="sm:text-[16px] text-[12px]">
                  {dataToggle === 1 ? "On" : "Off"}
                </h1>
              </div>
            }
            desc="Switch"
            image="switch"
          />
        </div>
      </div>

  );
}


export default Home;

function MyStopwatch({ statusToggle }) {
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: true });

  // Pause the stopwatch when statusToggle is 1
  useEffect(() => {
    if (statusToggle === 1) {
      pause();
    }
  }, [statusToggle, pause]);

  // Start the stopwatch when statusToggle is 0
  useEffect(() => {
    if (statusToggle === 0 && !isRunning) {
      start();
    }
  }, [statusToggle, start, isRunning]);

  return (
    <div style={{ textAlign: "center" }}>
      <div >
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
        <span>{seconds}</span>
      </div>
    </div>
  );
}