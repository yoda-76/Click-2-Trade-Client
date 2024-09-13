import { Button } from "@/components/ui/button";
import useAccountStore from "@/store/accountStore";
import usePositionStore from "@/store/positionStore";
import useSlStore from "@/store/slStore";
import axios from "axios";
import { useState } from "react";

export default function Positions() {
  const { position } = usePositionStore((state) => ({ ...state }));
  const { updateTslBase,updateSl, updateTarget, increaseSl, decreaseSl, increaseTarget, decreaseTarget } = useSlStore((state) => ({
    ...state,
  }));
  const {master}:{master: any} = useAccountStore((state) => ({...state}));
  
  const [slValue, setSlValue] = useState<any>();
  const [targetValue, setTargetValue] = useState<any>();
  const slToCostHandeler = (key:string, value:number)=>{
    updateSl({ key ,value });
  }
  return (
    <>
      <div className="grid grid-cols-12 bg-gray-300">
        <div>Symbol Name</div>
        <div>Qty</div>
        <div>pnl</div>
        <div>ltp</div>
        <div>SL</div>
        <div>set SL</div>
        <div>Target</div>
        <div>set Target</div>
        <div>TSL</div>
        <div>s2c</div>
        <div>sell price</div>
        <div>buy price</div>
        <div>multiplier</div>

        <div>Action</div>
      </div>
      {position.map((v: any) => {
        // console.log(v);
        return (
          <div className="grid grid-cols-12">
            <div className="break-words">
              {v.tradingsymbol ? v.tradingsymbol : "---"}
            </div>
            <div>{v.quantity ? v.quantity : "Qty"}</div>
            <div>{v.pnl}</div>
            <div>{v.last_price ? v.last_price : "LTP"}</div>
            <div className="grid grid-cols-3">
              <div className="hover:cursor-pointer hover:bg-black" onClick={() => decreaseSl({ key: v.instrument_token})}>-</div>
              <div>{v.sl ? v.sl : "--"}</div>
              <div className="hover:cursor-pointer hover:bg-black" onClick={() => increaseSl({ key: v.instrument_token })}>+</div>
            </div>
            <input
              className="text-black"
              type="number"
              placeholder="set SL"
              value={slValue}
              onChange={(e) => {
                setSlValue(Number(e.target.value));
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  updateSl({ key: v.instrument_token, value: slValue });
                }
              }}
            />
            <div className="grid grid-cols-3">
              <div className="hover:cursor-pointer hover:bg-black" onClick={() => decreaseTarget({ key: v.instrument_token})}>-</div>
              <div>{v.target ? v.target : "--"}</div>
              <div className="hover:cursor-pointer hover:bg-black" onClick={() => increaseTarget({ key: v.instrument_token })}>+</div>
            </div>
            <input
              className="text-black"
              type="number"
              placeholder="set Target"
              value={targetValue}
              onChange={(e) => {
                setTargetValue(Number(e.target.value));
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  updateTarget({ key: v.instrument_token, value: targetValue });
                }
              }}
            />
            <div>{v.tsl ? <Button onClick={()=>{
              updateTslBase({key: v.instrument_token, value: null})
            }}>turn off</Button> : <Button onClick={()=>{
              updateTslBase({key: v.instrument_token, value: v.last_price})
              console.log("tsl set");
            }}>turn on</Button>}</div>
            <div><Button onClick={()=>{
              slToCostHandeler(v.instrument_token,v.buy_price)
            }}>Sl 2 Cost</Button></div>
            <div>{v.sell_price ? v.sell_price : "sell price"}</div>
            <div>{v.buy_price ? v.buy_price : "buy price"}</div>
            <div>{v.multiplier ? v.multiplier : "Multiplier"}</div>

            {v.quantity!=0?<Button onClick={() => {
              //call square off single api
              axios.post(`${import.meta.env.VITE_server_url}/api/square-off-single`, {
                account_id: master.u_id,
                account_type:"MASTER",
                tradingSymbol: v.trading_symbol,
              }, {
                withCredentials: true, // Ensure cookies are sent with the request
              })
            }}>Exit</Button>:<div>--</div>}
          </div>
        );
      })}
    </>
  );
  // console.log(`sell_value: ${p.sell_value}, buy_value: ${p.buy_value}, quantity: ${p.quantity}, ltp: ${ltp}, multiplier: ${p.multiplier}`)
}

// {
//       "exchange": "NSE",
//       "multiplier": 1,
//       "value": 24.11,
//       "pnl": 0.02,
//       "product": "I",
//       "instrument_token": "NSE_EQ|INE528G01035",
//       "average_price": 0,
//       "buy_value": 24.11,
//       "overnight_quantity": 0,
//       "day_buy_value": 24.11,
//       "day_buy_price": 24.11,
//       "overnight_buy_amount": 0,
//       "overnight_buy_quantity": 0,
//       "day_buy_quantity": 1,
//       "day_sell_value": 0,
//       "day_sell_price": 0,
//       "overnight_sell_amount": 0,
//       "overnight_sell_quantity": 0,
//       "day_sell_quantity": 0,
//       "quantity": 1,
//       "last_price": 24.13,
//       "unrealised": 0.02,
//       "realised": 0,
//       "sell_value": 0,
//       "tradingsymbol": "YESBANK",
//       "trading_symbol": "YESBANK",
//       "close_price": 23.99,
//       "buy_price": 24.11,
//       "sell_price": 0
//     }
