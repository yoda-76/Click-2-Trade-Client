
import useSymbolStore from "@/store/symbolStore";
import useLtpStore from "@/store/ltpStore";

export default function LtpDisplay() {
  const {base, call, put} = useSymbolStore((state) => ({base: state.base, call: state.call, put: state.put}));
  const {baseLTP, callLTP, putLTP} = useLtpStore((state) => ({...state}));
  return (
    <div className="grid grid-cols-3 gap-1 m-1 mt-4 text-white">
      <div className="flex-col flex  items-start">
        <div className=" flex ">
          Symbol : <div>{call.symbol}</div>
          {/* Key: <div>{call.key}</div> */}
        </div>
        <div className=" flex  ">
          LTP : <div>{callLTP}</div>

        </div>
      </div>
      <div className="flex-col flex grid-cols-1 items-center">
        <div className=" ">{base.symbol}</div> 
        <div className=" flex">
          <div>{baseLTP}</div>
        </div>
      </div>
      <div className="flex flex-col  items-end ">
        <div className=" flex ">
          Symbol : <div>{put.symbol}</div>
          {/* Key: <div>{put.key}</div> */}
        </div>
        <div className=" flex">
          LTP : <div>{putLTP}</div>
        </div>
      </div>
    </div>
  );
}
