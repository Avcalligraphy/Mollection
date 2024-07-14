import {
  off,
  onValue,
  ref,
  remove,
  serverTimestamp,
  set,
} from "firebase/database";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { database } from "../Database/Fire";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";

const History = ({ dataBlynk }) => {
  const [limitKWH, setLimitKWH] = useState("");
  const [dataFirebase, setDataFirebase] = useState();
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);

  const starCountRef = ref(database, "history/");

  useEffect(() => {
    // Membaca data dari Firebase saat komponen pertama kali dimuat
    const fetchData = () => {
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
          setDataFirebase(data);
          // Cek apakah dataKWH melebihi limitKWH dan kirim email jika ya
          if (data.dataKWH > data.limitKWH) {
            const now = new Date().getTime();
            const lastEmailSent = data.lastEmailSent || 0;
            const oneDayInMs = 24 * 60 * 60 * 1000;
            if (now - lastEmailSent > oneDayInMs) {
              sendEmail(data.email, data.dataKWH);
              updateLastEmailSent();
            }
          }
        } else {
          setDataFirebase([]);
        }
      });
    };

    fetchData();

    // Membersihkan listener ketika komponen tidak lagi digunakan
    return () => {
      off(starCountRef);
    };
  }, [starCountRef]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const uid = uuidv4();
    const timestamp = serverTimestamp();
    set(ref(database, `history/`), {
      email: email,
      dataKWH: dataBlynk,
      limitKWH: limitKWH,
      timeUpload: timestamp,
      lastEmailSent: 0, // Inisialisasi lastEmailSent ke 0
    })
      .then(() => {
        Swal.fire({
          title: "Success Add Notif!",
          text: "Have been created Notif!",
          icon: "success",
        });
        setShow(false);
      })
      .catch(() => {
        Swal.fire({
          title: "Error Add Alarm!",
          text: "Error When created alarm!",
          icon: "error",
        });
      });
  };

  const handleDeleteNote = (uid) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        remove(ref(database, `note/${uid}`))
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          })
          .catch((err) => {
            console.error("Error deleting note:", err);
          });
      }
    });
  };

  const sendEmail = (userEmail, currentKWH) => {
    const templateParams = {
      user_email: userEmail,
      dataKWH: currentKWH,
    };

    emailjs
      .send(
        "service_ppehs8q",
        "template_64wsrf9",
        templateParams,
        "VW8qDINr2Pv44k_2E"
      )
      .then(
        (result) => {
          console.log("Email sent:", result.text);
        },
        (error) => {
          console.error("There was an error sending the email:", error.text);
        }
      );
  };

  const updateLastEmailSent = () => {
    set(ref(database, `history/lastEmailSent`), new Date().getTime())
      .then(() => {
        console.log("lastEmailSent updated successfully.");
      })
      .catch((error) => {
        console.error("Error updating lastEmailSent:", error);
      });
  };

  return (
    <div>
      {show ? (
        <div className="max-w-md mx-auto mt-10 p-6 bg-[#E8F0FB] ">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold mb-4">Set Notifikasi</h2>
            <i
              className="bx bx-x text-red-600 text-2xl"
              onClick={() => setShow(false)}
            ></i>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="currentKWH"
                className="block text-sm font-medium text-gray-700"
              >
                Nilai KWH Saat Ini
              </label>
              <input
                type="number"
                id="currentKWH"
                placeholder="Nilai KWH"
                value={dataBlynk}
                readOnly
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="limitKWH"
                className="block text-sm font-medium text-gray-700"
              >
                Batas Nilai KWH
              </label>
              <input
                type="number"
                id="limitKWH"
                placeholder="Nilai KWH"
                value={limitKWH}
                onChange={(e) => setLimitKWH(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Notifikasi
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Set Notifikasi
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-[20px] px-6 w-full pt-12 pb-9">
          <div className="flex justify-between items-center">
            <h2 className="text-black font-semibold">Note Notifikasi</h2>
            <div
              onClick={() => setShow(true)}
              className="flex justify-end px-4 "
            >
              <i className="bx bx-notepad text-2xl text-red-600 "></i>
            </div>
          </div>

          {dataFirebase && (
            <div className="bg-[#0D2D56] rounded-[10px] items-center p-3">
              <div className="flex justify-between">
                <h1 className="text-white font-bold max-w-[300px] text-[12px]">
                  <span className="font-medium">Nilai KWH Saat Ini: </span>
                  {dataFirebase.dataKWH} KWH
                </h1>
              </div>
              <h1 className="text-white font-bold max-w-[300px] text-[12px] mt-4">
                <span className="font-medium">Batasan Nilai KWH: </span>
                {dataFirebase.limitKWH} KWH
              </h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default History;
