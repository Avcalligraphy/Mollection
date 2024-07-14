import React, { useEffect, useState } from "react";
import BoxNotif from "../components/BoxNotif";
import { useNavigate } from "react-router-dom";
import AuthenticatedUser from "../Layouts/Authenticated";
import BoxHistory from "../components/BoxHistory";
import BottomNavbar from "../Layouts/Authenticated/BottomNavbar";
import { ref, onValue, serverTimestamp, set } from "firebase/database";
import { database } from "../Database/Fire";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";


const Notifcations = ({ statusToggle, dataBlynk, dataBill }) => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [months, setMonths] = useState([]);
  const [historyData, setHistoryData] = useState(null);

  useEffect(() => {
    const fetchMonths = () => {
      const dbRef = ref(database, "molection");
      onValue(dbRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const monthsArray = Object.keys(data);
          setMonths(monthsArray);
        }
      });
    };

    const fetchHistoryData = () => {
      const dbRef = ref(database, `molection/${currentDate}`);
      onValue(dbRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const historyArray = Object.values(data).sort(
            (a, b) => a.date - b.date
          );
          const latestEntry = historyArray[historyArray.length - 1];
          const earliestEntry = historyArray[0];

          const dataKWH = latestEntry.dataKWH - earliestEntry.dataKWH;
          const dataBill = latestEntry.dataBill - earliestEntry.dataBill;
          const date = dayjs(latestEntry.date).format("DD MMM YYYY");

          setHistoryData({ dataKWH, dataBill, date });
        }
      });
    };

    fetchMonths();
    fetchHistoryData();
  }, [currentDate]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const uid = uuidv4();
      const timestamp = serverTimestamp();
      set(ref(database, `molection/${currentDate}/${uid}/`), {
        dataKWH: dataBlynk,
        dataBill: dataBill,
        date: timestamp,
      });
      checkDateChange();
    }, 60000);

    return () => clearInterval(intervalId);
  }, [currentDate, dataBlynk, dataBill]);

  const checkDateChange = () => {
    const newDate = dayjs().format("YYYY-MM-DD");
    if (newDate !== currentDate) {
      setCurrentDate(newDate);
    }
  };

  const formatNumberNew = (number) => {
    if (typeof number !== "number") {
      throw new Error("Input harus berupa angka");
    }

    const parts = number.toFixed(5).split(".");
    const integerPart = parts[0];
    const decimalPart = parts[1];

    const formattedIntegerPart = integerPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      "."
    );

    const formattedNumber = `${formattedIntegerPart},${decimalPart}`;
    return formattedNumber;
  };

  return (
        <div className="w-full min-h-screen">
          <div className="bg-[url('/public/images/bgImageHistory.jpg')] w-full min-h-[250px] object-cover p-[30px] ">
            <p className="text-center text-white">Penggunaan Listrik</p>
            <h1 className="text-white text-[24px] text-center font-bold">
              {dataBlynk} kWH
            </h1>
            <p className="text-center text-white mt-[20px]">Tagihan Listrik</p>
            <h1 className="text-white text-[24px] text-center font-bold">
              Rp. {dataBill}
            </h1>
          </div>
          <div className="mt-[-40px] rounded-t-[50px] bg-[#ffff] w-full pt-[20px] min-h-screen">
            <h1 className="ml-[30px] font-semibold">Riwayat</h1>
            <navbar className=" ml-[30px] w-full flex justify-start items-center gap-[10px] pt-[20px]">
              <div className="py-[3px] px-[3px]">
                <div>
                  <h1 className="font-medium">July</h1>
                  <div className="w-full mt-[6px] rounded-t-[8px] h-[4px] bg-[#006ACC]" />
                </div>
              </div>
            </navbar>
            <div className="w-full py-[20px] px-[30px] grid grid-cols-1 gap-[20px]">
              {historyData && (
                <BoxHistory
                  statusToggle={statusToggle}
                  dataBlynk={formatNumberNew(historyData.dataKWH)}
                  dataBill={formatNumberNew(historyData.dataBill)}
                  date={historyData.date}
                />
              )}
            </div>
          </div>
        </div>
  );
};

export default Notifcations;
