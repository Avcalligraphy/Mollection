import React, { useEffect } from 'react'
import { useStopwatch } from 'react-timer-hook';

const BoxHistory = ({statusToggle, dataBlynk,  dataBill}) => {


  return (
    <div className="w-full">
      <h1 className='text-gray-500'>02 Des 2023</h1>
      <div className="flex justify-between items-center">
        <div className='flex items-start mt-[10px]'>
          <i className="bx bx-time text-[30px] text-black"></i>
          <div className='ml-[10px]'>
            <h1 className='text-black text-[20px] font-semibold'><MyStopwatch statusToggle={statusToggle} /></h1>
            <p className='text-gray-600 text-[13px] mt-[5px]'>{dataBlynk} kWH</p>
          </div>
        </div>
        <h1 className='text-green-400 font-medium'>Rp. {dataBill}</h1>
      </div>
    </div>
  );
}

export default BoxHistory


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
      <div>
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
        <span>{seconds}</span>
      </div>
    </div>
  );
}