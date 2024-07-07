import React from 'react'

const BoxMoney = ({selected}) => {
  return (
    <div className="px-[27px] py-[30px] bg-[#F3BE00] rounded-[33px] w-full">
      <h1 className="text-[24px] font-semibold">Rp {selected.title}</h1>
      <p className="text-[13px] text-[#818181] italic">{selected.desc}</p>
      <h1 className="mt-[8px] font-semibold mb-[15px] text-[16px]">
        Uang Baru
      </h1>
      <div className="flex justify-center">
        <div>
          <img alt="baru" src={selected.baruDepan} />
          <img alt="baru" src={selected.baruBelakang} />
        </div>
      </div>

      <h1 className="mt-[8px] font-semibold mb-[15px] text-[16px]">
        Uang Lama
      </h1>
      <div className="flex justify-center">
        <div>
          <img alt="baru" src={selected.LamaDepan} />
          <img alt="lbaru" src={selected.lamaBelakang} />
        </div>
      </div>
    </div>
  );
}

export default BoxMoney