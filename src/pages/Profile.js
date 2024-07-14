import React from 'react'
import Label from '../components/Label';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import AuthenticatedUser from '../Layouts/Authenticated';
import BottomNavbar from "../Layouts/Authenticated/BottomNavbar";

const Profile = () => {
  return (
      <div className="w-full min-h-screen px-[20px] pt-[72px] pb-[200px] ">
        <div className="flex justify-center items-center">
          <img
            alt="avatar"
            src="/images/avatar.jpg"
            className="rounded-full h-auto w-[150px] object-cover"
          />
        </div>
        <h1 className="font-semibold text-[17px] text-center my-[20px]">
          Raihan ALfarj
        </h1>
        <div className="flex justify-center">
          <div className="sm:w-[370px] w-full">
            <div className="flex flex-col gap-6">
              <div>
                <Label
                  forInput="name"
                  value="Name"
                  text="text-black font-semibold"
                />
                <TextInput
                  color="black"
                  type="text"
                  name="name"
                  value="Raihan AlFarj"
                  placeholder="Your Name"
                  autoComplete="username"
                  isFocused={true}
                  border="border-black"
                  // onChange={(e) => setData("email", e.target.value)}
                />
                {/* <InputError message={errors.email} className="mt-2" /> */}
              </div>
              <div>
                <Label
                  forInput="email"
                  value="Email Address"
                  text="text-black font-semibold"
                />
                <TextInput
                  color="black"
                  type="email"
                  name="email"
                  value=""
                  placeholder="Email Address"
                  autoComplete="username"
                  isFocused={true}
                  border="border-black"
                  // onChange={(e) => setData("email", e.target.value)}
                />
                {/* <InputError message={errors.email} className="mt-2" /> */}
              </div>
              <div>
                <Label
                  forInput="password"
                  value="Kata Sandi Lama"
                  text="text-black font-semibold"
                />
                <TextInput
                  value=""
                  onChange={(e) => {}}
                  color="black"
                  type="password"
                  name="password"
                  // value={data.password}
                  placeholder="Kata Sandi Lama"
                  autoComplete="current-password"
                  border="border-black"
                  // onChange={(e) => setData("password", e.target.value)}
                />
              </div>
              <div>
                <Label
                  forInput="password"
                  value="Kata Sandi Baru"
                  text="text-black font-semibold"
                />
                <TextInput
                  value=""
                  onChange={(e) => {}}
                  color="black"
                  type="password"
                  name="password"
                  // value={data.password}
                  placeholder="Kata Sandi Baru"
                  autoComplete="current-password"
                  border="border-black"
                  // onChange={(e) => setData("password", e.target.value)}
                />
              </div>
              <Button
                onClick=""
                width="w-full mb-[30px]"
                text="Update Account"
                color="bg-[#0D2D56] shadow-md shadow-black"
                gap="text-white"
              />
            </div>
          </div>
        </div>
      </div>
  );
}

export default Profile