import { Button } from '@/components/ui/button'
import axios from 'axios';
// import React from 'react'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useOrderParameterStore from '@/store/orderParameterStore';
import useSymbolStore from '@/store/symbolStore';
import useLtpStore from '@/store/ltpStore';
import useAccountStore from '@/store/accountStore';
import usePositionStore from '@/store/positionStore';

function extractId(input: string): {
  type: "MASTER" | "CHILD" | null;
  id: string | null;
} {
  console.log("input: ", input);
  if(!input) return {type: null, id: null}
  const masterRegex = /^MASTER:([a-zA-Z0-9]+)$/;
  const childRegex = /^CHILD:([a-zA-Z0-9]+)$/;

  let match = input.match(masterRegex);
  if (match) {
    return { type: "MASTER", id: match[1] };
  }

  match = input.match(childRegex);
  if (match) {
    return { type: "CHILD", id: match[1] };
  }

  return { type: null, id: null };
}

export default function Buttons(props:any) {
  const {putLTP, callLTP} = useLtpStore((state) => ({...state}));
  const {call,put}=useSymbolStore((state) => ({...state}));
  const {exchange,
    base,
    quantity,
    orderType,
    productType,
    triggerPrice,
    marketProtection,
    preferedStopLossPoints,
    preferedTargetPoints} = useOrderParameterStore((state) => ({...state}));

    const {selected}:{master: any, child: any[], selected:string , setSelectedAccount: (data: any) => void} = useAccountStore((state) => ({...state}));
    const {updatePosition}= usePositionStore((state) => ({...state}));
    const updatePositions=async () => {
    const {type, id} = extractId(selected)

      try {
        const resp = await axios.post(`${import.meta.env.VITE_server_url}/api/get-positions`, {
          token: localStorage.getItem("token"),
          account_id: id,
          account_type: type,
        });
        console.log("orders fetched", resp.data);
        updatePosition(resp.data);
      } catch (e) {
        console.log(e);
      }
    }
    const placeOrder = async (transaction_type:string, optionType:string)=>{
      console.log(`Order : Sell ${quantity} ${put.key} ${productType} ${orderType} `);
      const res=await axios.post(`${import.meta.env.VITE_server_url}/api/place-order`, {
        email: localStorage.getItem('email'),
        account_id:props.account_id,
        instrument_token: optionType==="put"? put.key:call.key,
        quantity: quantity,
        product: productType,
        order_type: orderType,
        transaction_type: transaction_type,
        index:base,
        trigger_price: triggerPrice,
        price:putLTP,
    })
      if(res){console.log("done",res);
        updatePositions()
        //toast is not working
        toast.success("This is a success message!", { 
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });}
    console.log("object");
    }
  return (
    <div className="grid grid-cols-3 m-1">
      <div className="flex-col flex  items-start">
        <Button onClick={()=>{placeOrder('SELL', "call")}} className='w-1/2 my-1'>Sell</Button>
        <Button onClick={()=>{placeOrder('BUY', "call")}} className='w-1/2 my-1'>Buy</Button>

      </div>
      <div className="flex-col flex grid-cols-1 items-center">
      <Button className='my-1'>Close all positions</Button>
      <Button className='my-1' onClick={async()=>{
        try{axios.post(`${import.meta.env.VITE_server_url}/api/cancel-all-order`, {
          account_id:props.account_id

        })}catch(error){
          console.log(error);
        }
      } 
      }>Cancel all orders</Button>
      <Button className='my-1'>SL to Cost</Button>

      </div>
      <div className="flex flex-col  items-end">
      <Button onClick={()=>{placeOrder('SELL',"put")}} className='w-1/2 my-1'>Sell</Button>
      <Button onClick={()=>{placeOrder('BUY', "put")}} className='w-1/2 my-1'>Buy2</Button>
      </div>
    </div>
  )
}
