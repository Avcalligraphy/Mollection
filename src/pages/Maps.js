import React, { useState } from 'react'
import AuthenticatedUser from '../Layouts/Authenticated';
import BoxMoney from '../components/BoxMoney';
import { MoneyList } from '../components/BoxMoney/MoneyList';
import { navigationLinks } from '../Layouts/Authenticated/MenuListUser';
import { NavLink } from 'react-router-dom';

const Maps = () => {
  const [show, setShow] = useState(false)
  const [selected, setSelected] = useState([])
  console.log(selected)
  const handleSelect = (item) => {
    setSelected(item)
    setShow(true)
  }
  return (
    <AuthenticatedUser>
      <div className="w-full min-h-screen px-[23px] pt-[22px]">
        <h1 className="font-semibold text-[24px] mb-[4px]">Mata Uang</h1>
        <div className="grid grid-cols-2 gap-[17px]">
          {MoneyList.map((item, index) => {
            return (
              <div
                className="px-[15px] pt-[11px] pb-[6px] bg-white shadow-md shadow-gray-500 rounded-[16px]"
                onClick={() => handleSelect(item)}
              >
                <img alt="uang" src={item.moneyImg} />
                <h1 className="font-medium">Rp {item.title}</h1>
              </div>
            );
          })}
        </div>
        {show && (
          <div className="fixed inset-0 b-color px-[1rem] z-50 grid place-items-center duration-[.4s]">
            <i
              onClick={() => setShow(false)}
              className="bx bx-x absolute top-[2rem] right-[2rem] text-[1.5rem] text-white cursor-pointer"
            ></i>
            <BoxMoney selected={selected} />
          </div>
        )}
      </div>
    </AuthenticatedUser>
  );
}

export default Maps