import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import CoustomSelect from "../CoustomSelect";

function Inputs(props: any) {
  console.log('props', props);
  return (
    <>
      <div className="grid grid-cols-8 m-1">
        <CoustomSelect
          options={["NSE_FO"]}
          label="select exchange"
          setChange={(v: any) => { console.log(v); }}
        />
        <CoustomSelect
          options={["NIFTY", "BANKNIFTY", "FINNIFTY"]}
          label="Index"
          setChange={(v: any) => {
            props.setIndex(
              v === "NIFTY"
                ? { name: "NIFTY", symbol: "NSE_INDEX|Nifty 50" }
                : v === "BANKNIFTY"
                ? { name: "BANKNIFTY", symbol: "NSE_INDEX|Nifty Bank" }
                : { name: "FINNIFTY", symbol: "NSE_INDEX|Nifty Fin Service" }
            );
          }}
        />
        <CoustomSelect
          options={props.expiryDates}
          label="Expiry"
          setChange={(v: any) => {
            props.setExpiry(v);
          }}
        />
        <CoustomSelect
          options={props.strikePrices}
          label="Call Strike"
          setChange={(v: any) => {
            console.log(v);
            props.setCallStrike(v);
          }}
        />
        <CoustomSelect
          options={props.strikePrices}
          label="Put Strike"
          setChange={(v: any) => {
            props.setPutStrike(v);
          }}
        />
        <div className="flex-col">
          <Label>Qty</Label>
          <Input onChange={(e: any) => props.setQuantity(e.target.value)} type="number" placeholder="Qty" />
        </div>
        <CoustomSelect
          options={["Intraday"]}
          label="Product Type"
          setChange={(v: any) => { 
            if(v === 'Intraday'){
              props.setProduct('D')
            }
           }}
        />
        <CoustomSelect
          options={["MARKET"]}
          label="Order Type"
          setChange={(v: any) => { props.setOrderType(v) }}
        />
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
