import React from "react";
import useMtmStore from "@/store/mtmStore";
import useSlStore from "@/store/slStore";
import "../../../App.css";
export default function Mtm() {
  const [mtmSlValue, setMtmSlValue] = React.useState(0);
  const [mtmTargetValue, setMtmTargetValue] = React.useState(0);
  const { mtm } = useMtmStore((state) => ({ ...state }));
  const { mtmSl, mtmTarget, updateMtmSl, updateMtmTarget } = useSlStore(
    (state) => ({ ...state })
  );
  return (
    <div className="flex justify-between glass1 p-2 rounded-md">
      <div className="flex items-center gap-4">
        <span className="font-bold lighttxt">MTM SL:</span> {mtmSl}{" "}
        <input
          className="glassgr py-1 rounded-full border-none border active:border-[1px] flex text-center w-[100px] text-white"
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
      </div>
      <div>
        <span className={`font-bold lighttxt`}>MTM:</span> <span className={`${mtm>=0?"gr":"rd"}`}>{mtm}</span>{" "}
      </div>
      <div className="flex items-center gap-4">
        <span className="font-bold lighttxt">MTM Target:</span> {mtmTarget}{" "}
        <input
          className="glassgr py-1 rounded-full border-none border active:border-[1px] flex text-center w-[100px] text-white"  
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
      </div>
    </div>
  );
}
