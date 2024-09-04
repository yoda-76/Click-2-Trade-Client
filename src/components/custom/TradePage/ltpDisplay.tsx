import "../../../App.css";
import useSymbolStore from "@/store/symbolStore";
import useLtpStore from "@/store/ltpStore";

export default function LtpDisplay() {
  const { base, call, put } = useSymbolStore((state) => ({
    base: state.base,
    call: state.call,
    put: state.put,
  }));
  const { baseLTP, callLTP, putLTP } = useLtpStore((state) => ({ ...state }));
  return (
    <div className="flex w-full items-center justify-between gap-1 p-2">
      <div className="flex-col h-[80px] glass1 w-[300px] p-2 rounded-md flex  items-start">
        <div className="text-[14px] lighttxt uppercase font-bold  grid grid-cols-2 ">
          <span> Symbol :</span>{" "}
          <span className="text-white text-[15px]">{call.symbol}</span>
          <span>Key:</span>{" "}
          <span className="text-white text-[15px]">{call.key}</span>
          <span>LTP :</span>{" "}
          <span className="text-white text-[15px]">{callLTP}</span>
        </div>
      </div>
      <div className="flex-col h-[80px] glass1 w-[300px] p-2 rounded-md flex  items-start">
        <div className="text-[14px] lighttxt uppercase font-bold  grid grid-cols-2 ">
          <span> Symbol :</span>{" "}
          <span className="text-white text-[15px]">{base.symbol}</span>
          <span>LTP :</span>{" "}
          <span className="text-white text-[15px]">{baseLTP}</span>
        </div>
      </div>
      {/* <div className="flex-col flex grid-cols-1 items-center">
        <div className=" ">{base.symbol}</div>
        <div className=" flex">
          LTP : <div>{baseLTP}</div>
        </div>
      </div> */}
      <div className="flex-col h-[80px] glass1 w-[300px] p-2 rounded-md flex  items-start">
        <div className="text-[14px] lighttxt uppercase font-bold  grid grid-cols-2 ">
          <span> Symbol :</span>{" "}
          <span className="text-white text-[15px]">{put.symbol}</span>
          <span>Key:</span>{" "}
          <span className="text-white text-[15px]">{put.key}</span>
          <span>LTP :</span>{" "}
          <span className="text-white text-[15px]">{putLTP}</span>
        </div>
      </div>
      {/* <div className="flex flex-col  items-end">
        <div className=" flex flex-col">
          Symbol : <div>{put.symbol}</div>
          Key: <div>{put.key}</div>
        </div>
        <div className=" flex">
          LTP : <div>{putLTP}</div>
        </div>
      </div> */}
    </div>
  );
}
