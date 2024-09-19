import React from 'react'
import useMtmStore from '@/store/mtmStore';
import useSlStore from '@/store/slStore';
export default function Mtm() {
  const [mtmSlValue, setMtmSlValue] = React.useState<number|null>(null);
  const [mtmTargetValue, setMtmTargetValue] = React.useState<number|null>(null);
  const {mtm} = useMtmStore((state) => ({...state}));
  const {mtmSl, mtmTarget, updateMtmSl,updateMtmTarget} = useSlStore((state) => ({...state}));
  return (
      <div className='flex justify-center'>

      <div className='flex justify-center gap-16 border-[1px] rounded-xl border-white py-2 px-5  w-fit '>
      <div className=' bg-gray-600 w-40 rounded-md px-2 py-1'>
        <div><strong>P&L SL:</strong> {mtmSl} </div>
        <input  
          className='text-black rounded-sm pl-1 w-24'
          type="number"
          placeholder="set sl"
          value={mtmSlValue?mtmSlValue:""}
          onChange={(e) => {
            setMtmSlValue(Number(e.target.value));
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateMtmSl(mtmSlValue);
            }
          }}
        />
      </div>
      <div className='pt-3'><strong>P&L:</strong> {mtm} </div>
      <div className=' bg-gray-600 w-40 rounded-md px-2 py-1'>  
        <div><strong>P&L Target:</strong> {mtmTarget} </div>
        <input
          className='text-black rounded-sm pl-1 w-24'
          type="number"
          placeholder="set Target"
          value={mtmTargetValue?mtmTargetValue:""}
          onChange={(e) => {
            setMtmTargetValue(Number(e.target.value));
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateMtmTarget(mtmTargetValue);
            }
          }}
        />
      </div>

      </div>
      </div>
   


  )
}
