import React from 'react'
import useMtmStore from '@/store/mtmStore';
import useSlStore from '@/store/slStore';
export default function Mtm() {
  const [mtmSlValue, setMtmSlValue] = React.useState(0);
  const [mtmTargetValue, setMtmTargetValue] = React.useState(0);
  const {mtm} = useMtmStore((state) => ({...state}));
  const {mtmSl, mtmTarget, updateMtmSl,updateMtmTarget} = useSlStore((state) => ({...state}));
  return (
   <>
    <div><strong>MTM:</strong> {mtm} </div>
    <div><strong>MTM SL:</strong> {mtmSl} </div>
    <input
              type="number"
              placeholder="set sl"
              value={mtmSlValue}
              onChange={(e) => {
                setMtmSlValue(Number(e.target.value));
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  updateMtmSl(mtmSlValue);
                }
              }}
            />

    <div><strong>MTM Target:</strong> {mtmTarget} </div>
    <input
              type="number"
              placeholder="set Target"
              value={mtmTargetValue}
              onChange={(e) => {
                setMtmTargetValue(Number(e.target.value));
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  updateMtmTarget(mtmTargetValue);
                }
              }}
            />
            </>

  )
}
