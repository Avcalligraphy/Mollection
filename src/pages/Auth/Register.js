import React from 'react'
import Label from '../../components/Label';
import TextInput from '../../components/TextInput';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, database } from '../../Database/Fire';
import Swal from 'sweetalert2';
import { ref, serverTimestamp, set } from 'firebase/database';
import App from '../../App';
import Button from '../../components/Button';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Register() {
const navigate = useNavigate()
const [email, setEmail] = React.useState("");
const [password, setPassword] = React.useState("");
const [name, setName] = React.useState("");
const handleRegister = () => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((success) => {
      Swal.fire({
        icon: "success",
        title: "Success",
        color: "#000",
        buttonsStyling: true,
        confirmButtonColor: "#006A0B",
        text: "Berhasil Membuat Akun",
      });
      // Mengambil timestamp server saat ini
      const timestamp = serverTimestamp();
      set(ref(database, `users/${success.user.uid}/`), {
        role: "user",
        email: email,
        name: name,
        uid: success.user.uid,
        password: password,
        registeredAt: timestamp,
      });
      localStorage.setItem("uid", success.user.uid);
      return <App />;
      // ...
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Opps....",
        color: "#000",
        buttonsStyling: true,
        confirmButtonColor: "#770700",
        text: "Proses Sign Up Gagal",
      });
      // ..
    });
};
  return (
    <div className="min-h-screen w-full ">
      <div className="w-full bg-[url('/public/images/mark.png')] h-[116px] p-[29px] ">
        <div className="flex justify-start items-center gap-[29px]">
          <div
            className="flex justify-center items-center w-[32px] bg-[#F3BE00] h-[32px] rounded-[10px] "
            onClick={() => navigate(-1)}
          >
            <img alt="arrow" src="/images/arrow.png" />
          </div>
          <div>
            <h1 className="text-[24px] font-semibold text-white ">Daftar</h1>
            <p className="text-[14px] font-light text-white">
              Mudah menghemat energi
            </p>
          </div>
        </div>
      </div>
      <div className="px-[24px] mt-[20px]">
        <div>
          <Label
            forInput="fullname"
            value="Nama"
            text="text-black font-semibold"
          />
          <TextInput
            color="black"
            type="text"
            name="fullname"
            autoComplete="username"
            isFocused={true}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama"
            border="border-[#7C7C7C]"
          />
          {/* <InputError message={errors.email} className="mt-2" /> */}
        </div>
        <div>
          <div></div>
          <Label
            forInput="email"
            value="Email"
            text="text-black font-semibold mt-[20px]"
          />
          <TextInput
            color="black"
            type="email"
            name="email"
            autoComplete="username"
            isFocused={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
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
            placeholder="Sandi"
            autoComplete="current-password"
            border="border-[#7C7C7C]"
          />
        </div>
        <Button
          onClick={handleRegister}
          width="w-full"
          text="Daftar"
          height="h-[50px]"
          color="bg-[#F3BE00] mt-[50px]"
          gap="text-white"
        />
      </div>
      {/* <div className="flex text-white justify-center items-center h-[55px]  bg-[#473F97] mt-[88px]">
        <h1 className="text-[14px]">
          Sudah Punya Akun ?{" "}
          <NavLink to="/login">
            <span className="font-semibold">Masuk Akun</span>
          </NavLink>
        </h1>
      </div> */}
    </div>
  );
}
