import React from "react";

export default function LtpDisplay(props:any) {
  return (
    <div className="grid grid-cols-3 gap-1 m-1">
      <div className="flex-col flex  items-start">
        <div className=" flex   ">
          Strik : <div>{props.callSymbol}</div>
        </div>
        <div className=" flex  ">
          LTP : <div>{props.callLTP}</div>
        </div>
      </div>
      <div className="flex-col flex grid-cols-1 items-center">
        <div className=" ">{props.index.name}</div> 
        <div className=" flex">
          LTP : <div>{props.indexLtp}</div>
        </div>
      </div>
      <div className="flex flex-col  items-end">
        <div className=" flex">
          Strik : <div>{props.putSymbol}</div>
        </div>
        <div className=" flex">
          LTP : <div>{props.putLTP}</div>
        </div>
      </div>
    </div>
  );
}
