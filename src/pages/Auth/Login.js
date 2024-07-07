import React, { useEffect, useState } from 'react'
import TextInput from '../../components/TextInput';
import Label from "../../components/Label";
import Button from '../../components/Button';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { get, ref, serverTimestamp, update } from 'firebase/database';
import { auth, database } from '../../Database/Fire';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import App from "../../App";
import Swal from 'sweetalert2';

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleLogin = () => {
    if (email !== null && password !== null) {
      signInWithEmailAndPassword(auth, email, password)
        .then((success) => {
          const uid = success.user.uid;
          const userRef = ref(database, `users/${uid}`);

          // Dapatkan data pengguna, termasuk role
          get(userRef).then((snapshot) => {
            if (snapshot.exists()) {
              const userData = snapshot.val();
              const { role } = userData;

              if (role === "banned") {
                // Jika role adalah "banned", signout pengguna
                auth.signOut().then(() => {
                  Swal.fire({
                    icon: "warning",
                    confirmButtonColor: "#006A0B",
                    title: "Akun Anda Diblokir",
                    text: "Hubungi administrator untuk informasi lebih lanjut.",
                  });
                  // Redirect pengguna ke halaman login
                  <Navigate to="/login" />;
                });
              } else {
                // Role bukan "banned", lanjutkan dengan proses login
                const timestamp = serverTimestamp();
                update(ref(database, `users/${uid}/`), {
                  registeredAt: timestamp,
                });
                localStorage.setItem("uid", uid);
                // Redirect pengguna ke halaman utama atau halaman lain yang sesuai
                return <App />; // Gantilah dengan halaman yang sesuai
              }
            } else {
              // Data pengguna tidak ditemukan
              Swal.fire({
                icon: "error",
                title: "Data Pengguna Tidak Ditemukan",
                confirmButtonColor: "#d33",
                text: "Silakan coba lagi nanti atau hubungi administrator.",
              });
            }
          });
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Opps....",
            color: "#000",
            buttonsStyling: true,
            confirmButtonColor: "#770700",
            text: "Password atau Email Salah",
          });
        });
    }
  };
  return (
    <div className="min-h-screen w-full">
      <div className="w-full bg-[url('/public/images/mark.png')] h-[116px] p-[29px] ">
        <div className="flex justify-start items-center gap-[29px]">
          <div
            className="flex justify-center items-center w-[32px] bg-[#F3BE00] h-[32px] rounded-[10px] "
            onClick={() => navigate(-1)}
          >
            <img alt="arrow" src="/images/arrow.png" />
          </div>
          <div>
            <h1 className="text-[24px] font-semibold text-white ">Masuk</h1>
            <p className="text-[14px] font-light text-white">
              Mudah menghemat energi
            </p>
          </div>
        </div>
      </div>
      <div className="px-[24px] mt-[20px]">
        <div>
          <Label
            forInput="email"
            value="Alamat Email"
            text="text-black font-semibold"
          />
          <TextInput
            color="black"
            type="email"
            name="email"
            autoComplete="username"
            isFocused={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Alamat Email Kamu"
            border="border-[#7C7C7C]"
          />
          {/* <InputError message={errors.email} className="mt-2" /> */}
        </div>
        <div>
          <Label
            forInput="password"
            value="Sandi"
            text="text-black mt-[20px] font-semibold"
          />
          <TextInput
            color="black"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sandi Kamu"
            autoComplete="current-password"
            border="border-[#7C7C7C]"
          />
        </div>
        <Button
          onClick={handleLogin}
          width="w-full"
          text="Masuk"
          height="h-[50px]"
          color="bg-[#F3BE00] mt-[50px]"
          gap="text-white"
        />
      </div>
      {/* <div className="flex text-white justify-center items-center h-[55px]  bg-[#473F97] mt-[88px]">
        <h1 className="text-[14px]">
          Belum Punya Akun ?{" "}
          <NavLink to="/register">
            <span className="font-semibold">Bikin Akun</span>
          </NavLink>
        </h1>
      </div> */}
    </div>
  );}

export default Login