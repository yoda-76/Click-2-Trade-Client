import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import CoustomSelect from "../CoustomSelect";
import useOrderParameterStore from "@/store/orderParameterStore";
import useSymbolStore from "@/store/symbolStore";
import useOptionsDataStore from "@/store/optionsDataStore";
import useStaticStore from "@/store/staticStore";
import useLtpStore from "@/store/ltpStore";
import { Combobox } from "../CoustomComboBox";
import useSlStore from "@/store/slStore";
import axios from "axios";
import useAccountStore from "@/store/accountStore";

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
  const {expiry, orderType, updateExpiry, updateCallStrike, updatePutStrike, updateQuantity, updateOrderType, updateProductType, updateTriggerPrice}=useOrderParameterStore((state) => ({...state}));
  
  const {base, updateBase, updateCall, updatePut }=useSymbolStore((state) => ({base:state.base, updateCall:state.updateCall, updatePut:state.updatePut, updateBase:state.updateBase}));
  
  const {optionsData}:{optionsData: any} = useOptionsDataStore((state) => ({optionsData: state.optionsData}));
  
  const {expiries, strikes ,updateExpiries, updateStrikes} = useStaticStore((state) => ({updateExpiries:state.updateExpiries, expiries:state.expiries, updateStrikes:state.updateStrikes, strikes:state.strikes}));

  const [updateCallLTP, updatePutLTP] = useLtpStore((state) => [state.updateCallLTP, state.updatePutLTP]);
  const {master}:{master:any} = useAccountStore((state) => ({master: state.master}));
  interface Quantity {
    value: string;
    label: string;
  }

  const {preferedSl, preferedTarget, updatePreferedSl, updatePreferedTarget} = useSlStore((state) => ({...state}));
  const [preferedSlState, setPreferedSlState] = useState<number|null>(preferedSl);
  const [preferedTargetState, setPreferedTargetState] = useState<number|null>(preferedTarget);
  
  const [quantityList, setQuantityList] = useState<Quantity[]>([]);

  useEffect(() => {
    setPreferedSlState(preferedSl);
    setPreferedTargetState(preferedTarget);
  },[preferedSl, preferedTarget])
  function getQuantityArray(lotSize: number, numberOfEntries: number = 4) {
    const quantity = [];
  
    for (let i = 1; i <= numberOfEntries; i++) {
      const value = lotSize * i;
      quantity.push({
        value: value.toString(),
        label: value.toString(),
      });
    }
  
    return quantity;
  }


  
  return (
    <>
      <div className="flex justify-center gap-5  text-white  pr-4">
        {/* <CoustomSelect
          options={["NSE_FO"]}
          label="select exchange"
          setChange={(v: any) => { console.log(v); }}
        /> */}


        {/* <CoustomSelect
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
        /> */}
        
       
        {/* {`${ strikes}`} */}
        
          {/* {`${ }`} */}
        
          <div className="flex flex-col">
        <CoustomSelect
          placeholder="Product Type"
          options={["Intraday", "Margin"]}
          label=""
          setChange={(v: any) => { 
            if(v === 'Intraday'){
              updateProductType('I')
            }else if(v==='Margin'){
              updateProductType('D')
            }
           }}
        />
        </div>
        <div className="flex flex-col">
        <CoustomSelect
          placeholder="Order Type"
          options={["MARKET", "LIMIT"]}
          label=""
          setChange={(v: any) => { 
            updateOrderType(v)
           }}
        />
        </div>
          {orderType === "LIMIT" && (
         <div className="flex-col ">
         <Input className="text-white mt-1.5" onChange={(e: any) => {
           updateTriggerPrice(e.target.value)
         }} type="number" placeholder="Trigger Price" />
       </div> 
        )}
        {/* {` ${[triggerPrice, orderType, productType]}`} */}
        

        {/* <div className="flex-col">
          <Label>Market Protection</Label>
          <Input type="number" placeholder="10%" />
        </div> */}
        <div className="flex-col">
          <Label>Prefered SL Pts: {preferedSl}</Label>
          <Input type="number" value={preferedSlState?preferedSlState:0} placeholder="Prefered SL Pts" 
          onChange={(e) => {
            setPreferedSlState(Number(e.target.value));
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              //api call
              updatePreferedSl(preferedSlState);
              axios.post(`${import.meta.env.VITE_server_url}/api/update-prefrences-sl`, { account_id: master.u_id, stoploss: preferedSlState },{withCredentials: true,})
            }
          }}/>
        </div>
        <div className="flex-col">
          <Label>Prefered Target Pts: {preferedTarget}</Label>
          <Input type="number" value={preferedTargetState?preferedTargetState:0} onChange={(e) => {setPreferedTargetState(Number(e.target.value))}} onKeyDown={(e) => {if (e.key === "Enter") {
            console.log("preferedTarget",master);
            axios.post(`${import.meta.env.VITE_server_url}/api/update-prefrences-target`, { account_id: master.u_id, target: preferedTargetState },{withCredentials: true,})
            updatePreferedTarget(preferedTargetState)
            }}} placeholder="Prefered Target Pts" />
        </div>
      </div>
      <div className="flex  text-white justify-between items-center gap-1">
      <CoustomSelect
          placeholder="Call Strike"
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
        <div className="flex flex-col items-center ">
        <div className="flex gap-5">

        <div className="flex  gap-1 items-center">
        <CoustomSelect
          placeholder="Select Index"
          options={["NIFTY", "BANKNIFTY", "FINNIFTY"]}
          label=""
          setChange={(v: any) => {
            var newBase={symbol:"", key:""}
            
            if (v === "NIFTY" || v === "BANKNIFTY" || v === "FINNIFTY") {
              // let newBase;
              
              if (v === "NIFTY") {
                newBase = { symbol: "NIFTY", key: "NSE_INDEX|Nifty 50" };
                setQuantityList(getQuantityArray(25,300));
              } else if (v === "BANKNIFTY") {
                newBase = { symbol: "BANKNIFTY", key: "NSE_INDEX|Nifty Bank" };
                setQuantityList(getQuantityArray(15,300));
              } else {
                newBase = { symbol: "FINNIFTY", key: "NSE_INDEX|Nifty Fin Service" };
                setQuantityList(getQuantityArray(25,300));
              }
              
              console.log(newBase, "selected");
              updateBase(newBase);
            }else{
              newBase={ symbol: v, key: optionsData.data.EQUITY[v].instrument_key }
              updateBase(newBase);
            } 
            
            let tempExpiryDates: string[] = [];
            console.log("optionsData",optionsData);
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
        </div>
        <div className="flex  gap-1 items-center">
        <CoustomSelect
          placeholder="Select Expiry"
          options={expiries}
          label=""
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
          </div>
        </div>
        <div className="flex  gap-1 items-center mt-1">
          <Label>Qty in lots {base.symbol==="NIFTY" || base.symbol==="FINNIFTY" ? "25" : "15"}</Label>
          {/* <Input onChange={(e: any) => {
            updateQuantity(e.target.value)
            }} type="number" placeholder="Qty" /> */}
            <Combobox setChangeQuantity={updateQuantity} quantity={quantityList}/>
        </div>

        </div>
        <CoustomSelect
          placeholder="Select Strike"
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
