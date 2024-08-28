import usePositionStore from "@/store/positionStore";
import useSlStore from "@/store/slStore";
import { useState } from "react";

export default function Positions() {
  const { position } = usePositionStore((state) => ({ ...state }));
  const { updateSl, updateTarget } = useSlStore((state) => ({
    ...state,
  }));
  
  const [slValue, setSlValue] = useState(0);
  const [targetValue, setTargetValue] = useState(0);
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
        <div>sell price</div>
        <div>buy price</div>
        <div>multiplier</div>

        <div>Action</div>
      </div>
      {position.map((v: any, i: number) => {
        // console.log(v);
        return (
          <div className="grid grid-cols-12">
            <div className="break-words">
              {v.tradingsymbol ? v.tradingsymbol : "---"}
            </div>
            <div>{v.quantity ? v.quantity : "Qty"}</div>
            <div>{v.pnl}</div>
            <div>{v.last_price ? v.last_price : "LTP"}</div>
            <div>{v.sl ? v.sl : "--"}</div>
            <input
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
            <div>{v.target ? v.target : "--"}</div>
            <input
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
            <div>{v.sell_price ? v.sell_price : "sell price"}</div>
            <div>{v.buy_price ? v.buy_price : "buy price"}</div>
            <div>{v.multiplier ? v.multiplier : "Multiplier"}</div>

            <div>{v.action ? v.action : "Action"}</div>
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
