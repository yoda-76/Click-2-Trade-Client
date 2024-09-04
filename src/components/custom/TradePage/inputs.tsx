import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import CoustomSelect from "../CoustomSelect";
import { equitySymbols } from "@/lib/equity-symbols";
import useOrderParameterStore from "@/store/orderParameterStore";
import useSymbolStore from "@/store/symbolStore";
import useOptionsDataStore from "@/store/optionsDataStore";
import useStaticStore from "@/store/staticStore";
import useLtpStore from "@/store/ltpStore";

const extractExpiryAndStrike = (
  input: string
): { expiryDate: string; strikePrice: number } => {
  const regex = /(\d{4}-\d{2}-\d{2})\s*:\s*([\d.]+)/;
  const match = input.match(regex);

  if (match) {
    const expiryDate = match[1];
    const strikePrice = parseFloat(match[2]);
    return { expiryDate, strikePrice };
  } else {
    throw new Error("Invalid input format");
  }
};

function Inputs() {
  const {expiry, updateExpiry, updateCallStrike, updatePutStrike, updateQuantity, updateOrderType, updateProductType, updateTriggerPrice}=useOrderParameterStore((state) => ({expiry:state.expiry, callStrike:state.callStrike, updateExpiry:state.updateExpiry, updateCallStrike:state.updateCallStrike, updatePutStrike:state.updatePutStrike, updateQuantity: state.updateQuantity, updateOrderType: state.updateOrderType, updateProductType: state.updateProductType, updateTriggerPrice: state.updateTriggerPrice, updateMarketProtection: state.updateMarketProtection, updatePreferedStopLossPoints: state.updatePreferedStopLossPoints, updatePreferedTargetPoints: state.updatePreferedTargetPoints, triggerPrice:state.triggerPrice, orderType:state.orderType, productType:state.productType}));
  
  const {base, updateBase, updateCall, updatePut }=useSymbolStore((state) => ({base:state.base, updateCall:state.updateCall, updatePut:state.updatePut, updateBase:state.updateBase}));
  
  const {optionsData}:{optionsData: any} = useOptionsDataStore((state) => ({optionsData: state.optionsData}));
  
  const {expiries, strikes ,updateExpiries, updateStrikes} = useStaticStore((state) => ({updateExpiries:state.updateExpiries, expiries:state.expiries, updateStrikes:state.updateStrikes, strikes:state.strikes}));

  const [updateCallLTP, updatePutLTP] = useLtpStore((state) => [state.updateCallLTP, state.updatePutLTP]);
  
  return (
    <>
      <div className="grid grid-cols-8 m-1">
        <CoustomSelect
          options={["NSE_FO"]}
          label="select exchange"
          setChange={(v: any) => { console.log(v); }}
        />
        <CoustomSelect
          options={["NIFTY", "BANKNIFTY", "FINNIFTY",...equitySymbols]}
          label="Index"
          setChange={(v: any) => {
            var newBase={symbol:"", key:""}
            if(v === "NIFTY" || v === "BANKNIFTY" || v === "FINNIFTY"){
              
              newBase = (v === "NIFTY"
                ? { symbol: "NIFTY", key: "NSE_INDEX|Nifty 50" }
                : v === "BANKNIFTY"
                ? { symbol: "BANKNIFTY", key: "NSE_INDEX|Nifty Bank" }
                : { symbol: "FINNIFTY", key: "NSE_INDEX|Nifty Fin Service" })
              updateBase(newBase);
              
            }else{
                 
                  newBase={ symbol: v, key: optionsData.data.EQUITY[v].instrument_key }
                  updateBase(newBase);
            } 
            let tempExpiryDates: string[] = [];
              Object.keys(optionsData.data[newBase.symbol]).map((op) => {
              const result = extractExpiryAndStrike(op);
              if (!tempExpiryDates.includes(result.expiryDate))
                  tempExpiryDates.push(result.expiryDate);
              });
              tempExpiryDates.sort((date1: string, date2: string) => new Date(date1).getTime() - new Date(date2).getTime());
              updateExpiries(tempExpiryDates);
              updateStrikes([]);
              updateCallLTP(0);
              updatePutLTP(0);
          }}
        />
        <CoustomSelect
          options={expiries}
          label="Expiry"
          setChange={(v: any) => {
            let tempStrikePrices: number[] = [];
            // console.log(base);
            Object.keys(optionsData.data[base.symbol]).map((op) => {
              const result = extractExpiryAndStrike(op);
              // tempExpiryDates.push(result.expiryDate);
              // console.log(result.expiryDate === expiry ,!tempStrikePrices.includes(result.strikePrice));
              if (
                result.expiryDate === v                                      
              ){
                console.log(result);
                tempStrikePrices.push(result.strikePrice);}
                // tempStrikePrices.push(result.strikePrice);
              });
              // console.log("object", tempStrikePrices);
            updateExpiry(v);
            updateStrikes(tempStrikePrices);

          }}
        />
        {/* {`${ strikes}`} */}
        <CoustomSelect
          options={strikes}
          label="Call Strike"
          setChange={(v: number) => {
            updateCallStrike(v);
            Object.keys(optionsData.data[base.symbol]).map((op) => {
              const option = optionsData.data[base.symbol][op];
              const result = extractExpiryAndStrike(op);
              if (result.expiryDate === expiry && result.strikePrice === v) {
                console.log({
                  symbol: option.CE.tradingsymbol,
                  key: option.CE.instrument_key,
                });
                updateCall({
                  symbol: option.CE.tradingsymbol,
                  key: option.CE.instrument_key,
                });
              }
              
            })
          }}
          />
          {/* {`${ }`} */}
        <CoustomSelect
          options={strikes}
          label="Put Strike"
          setChange={(v: any) => {
            // props.setPutStrike(v);
            updatePutStrike(v);
            Object.keys(optionsData.data[base.symbol]).map((op) => {
              const option = optionsData.data[base.symbol][op];
              const result = extractExpiryAndStrike(op);
              if (result.expiryDate === expiry && result.strikePrice === v) {
                console.log({
                  symbol: option.PE.tradingsymbol,
                  key: option.PE.instrument_key,
                })
                updatePut({
                  symbol: option.PE.tradingsymbol,
                  key: option.PE.instrument_key,
                });
              }
            })
          }}
        />
        <div className="flex-col">
          <Label>Qty</Label>
          <Input onChange={(e: any) => {
            updateQuantity(e.target.value)
            }} type="number" placeholder="Qty" />
        </div>
        <CoustomSelect
          options={["Intraday"]}
          label="Product Type"
          setChange={(v: any) => { 
            if(v === 'Intraday'){
              updateProductType('D')
            }
           }}
        />
        <CoustomSelect
          options={["MARKET", "LIMIT"]}
          label="Order Type"
          setChange={(v: any) => { 
            updateOrderType(v)
           }}
        />
{/*         {` ${[triggerPrice, orderType, productType]}`} */}
        <div className="flex-col">
          <Label>Trigger Price</Label>
          <Input onChange={(e: any) => {
            updateTriggerPrice(e.target.value)
          }} type="number" placeholder="Trigger Price" />
        </div>

        <div className="flex-col">
          <Label>Market Protection</Label>
          <Input type="number" placeholder="10%" />
        </div>
        <div className="flex-col">
          <Label>Prefered SL Pts</Label>
          <Input type="number" placeholder="Prefered SL Pts" />
        </div>
        <div className="flex-col">
          <Label>Prefered Target Pts</Label>
          <Input type="number" placeholder="Prefered Target Pts" />
        </div>
      </div>
    </>
  );
}

export default React.memo(Inputs);




















// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import React, { useEffect } from "react";
// import CoustomSelect from "../CoustomSelect";
// import exp from "constants";

// export default function Inputs(props:any) {
//   // // console.log(props.optionsData.data);
//   // useEffect(() => {
//   //   // const expiryDates = Object.keys(props?.optionsData?.data)
//   //   // console.log(expiryDates);
//   // },[])
//   console.log('props',props);
//   return (
//     <>
//       <div className="grid grid-cols-8 m-1">
//       <CoustomSelect options={["nse", "bse"]} label="select exchange" setChange={(v:any)=>{console.log(v);}} />
//       <CoustomSelect options={["NIFTY", "BANKNIFTY", "FINNIFTY"]} label="Index" setChange={(v:any)=>{
//         props.setIndex(v==="NIFTY" ?{
//           name: "NIFTY",
//           symbol: "NSE_INDEX|Nifty 50",
//         }:v==="BANKNIFTY" ?{
//           name: "BANKNIFTY",
//           symbol: "NSE_INDEX|Nifty Bank",
//         }:{
//           name: "FINNIFTY",
//           symbol: "NSE_INDEX|Nifty Fin Service",
//         })
//       }} />
//       <CoustomSelect options={props.expiryDates} label="Expiry" setChange={(v:any)=>{
//         props.setExpiry(v)
//       }} />  

//         {/* <div className="flex-col">
//           <Label>Expiry Date</Label>
//           <Input placeholder="Expiry Date" />
//         </div> */}
//       <CoustomSelect options={props.strikePrices} label="Call Strike" setChange={(v:any)=>{
//         console.log(v);
//         props.setCallStrike(v)
//       }} />  

//         {/* <div className="flex-col">
//           <Label>Call Strike</Label>
//           <Input type="number" placeholder="Call Strike" />
//         </div> */}

//         {/* <div className="flex-col">
//           <Label>Put Strike</Label>
//           <Input type="number" placeholder="Put Strike" />
//         </div> */}
//         <CoustomSelect options={props.strikePrices} label="Put Strike" setChange={(v:any)=>{
//         props.setPutStrike(v)
//       }} />

//         <div className="flex-col">
//           <Label>Qty</Label>
//           <Input type="number" placeholder="Qty" />
//         </div>

//         <div className="flex-col">
//           <Label>Product Type</Label>
//           <Input placeholder="Product Type" />
//         </div>

//         <div className="flex-col">
//           <Label>Order Type</Label>
//           <Input placeholder="Order Type" />
//         </div>

//         <div className="flex-col">
//           <Label>Market Protection</Label>
//           <Input type="number" placeholder="10%" />
//         </div>

//         <div className="flex-col">
//           <Label>Prefered SL Pts</Label>
//           <Input type="number" placeholder="Prefered SL Pts" />
//         </div>

//         <div className="flex-col">
//           <Label>Prefered Target Pts</Label>
//           <Input type="number" placeholder="Prefered Target Pts" />
//         </div>
//       </div>
//     </>
//   );
// }
