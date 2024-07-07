import React from 'react'
import Navbar from './Navbar';

export default function AuthenticatedUser({children}) {
  return (
    <>
      <div className="mx-auto max-w-screen block">
        {/* <Navbar /> */}
        {/* End Sidebar  */}

        {/* Start Content  */}
        <div className="">
          <div className="">
            <main className="">
              {children}
            </main>
          </div>
        </div>
        {/* End Content  */}
      </div>
      {/* <div className="mx-auto px-4 w-full h-screen lg:hidden flex bg-black">
        <div className="text-white text-2xl text-center leading-snug font-medium my-auto">
          Sorry, this page only supported on 1024px screen or above
        </div>
      </div> */}
    </>
  );
}
