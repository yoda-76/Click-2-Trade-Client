import React from "react";
import useSymbolStore from "@/store/symbolStore";
import useLtpStore from "@/store/ltpStore";

export default function LtpDisplay() {
  const {base, call, put} = useSymbolStore((state) => ({base: state.base, call: state.call, put: state.put}));
  const {baseLTP, callLTP, putLTP} = useLtpStore((state) => ({baseLTP: state.baseLTP, callLTP: state.callLTP, putLTP: state.putLTP}));
  return (
    <div className="grid grid-cols-3 gap-1 m-1">
      <div className="flex-col flex  items-start">
        <div className=" flex   ">
          Symbol : <div>{call.symbol}</div>
        </div>
        <div className=" flex  ">
          LTP : <div>{callLTP}</div>

        </div>
      </div>
      <div className="flex-col flex grid-cols-1 items-center">
        <div className=" ">{base.symbol}</div> 
        <div className=" flex">
          LTP : <div>{baseLTP}</div>
        </div>
      </div>
      <div className="flex flex-col  items-end">
        <div className=" flex">
          Symbol : <div>{put.symbol}</div>
        </div>
        <div className=" flex">
          LTP : <div>{putLTP}</div>
        </div>
      </div>
    </div>
  );
}
