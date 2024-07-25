import { Button } from '@/components/ui/button'
import axios from 'axios';
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Buttons(props:any) {
  return (
    <div className="grid grid-cols-3 m-1">
      <div className="flex-col flex  items-start">
        <Button onClick={async()=>{
          console.log(`Order : Sell ${props.quantity} ${props.callKey} ${props.product} ${props.orderType} `);
          axios.post('http://localhost:3000/api/place-order', {
            email: localStorage.getItem('email'),
            account_id:props.account_id,
            instrument_token: props.callKey,
            quantity: props.quantity,
            product: props.product,
            order_type: props.orderType,
            transaction_type: 'SELL'
        }).then((res)=>{
          toast.success("This is a success message!");
        })
        }} className='w-1/2 my-1'>Sell</Button>
        <Button onClick={()=>{
          console.log(`Order : Buy ${props.quantity} ${props.callKey} ${props.product} ${props.orderType} `);
          axios.post('http://localhost:3000/api/place-order', {
            email: localStorage.getItem('email'),
            account_id:props.account_id,
            instrument_token: props.callKey,
            quantity: props.quantity,
            product: props.product,
            order_type: props.orderType,
            transaction_type: 'BUY'
        })
        }} className='w-1/2 my-1'>Buy</Button>

      </div>
      <div className="flex-col flex grid-cols-1 items-center">
      <Button className='my-1'>Close all positions</Button>
      <Button className='my-1'>Cancel all orders</Button>
      <Button className='my-1'>SL to Cost</Button>

      </div>
      <div className="flex flex-col  items-end">
      <Button onClick={()=>{
          console.log(`Order : Sell ${props.quantity} ${props.putKey} ${props.product} ${props.orderType} `);
          axios.post('http://localhost:3000/api/place-order', {
            email: localStorage.getItem('email'),
            account_id:props.account_id,
            instrument_token: props.putKey,
            quantity: props.quantity,
            product: props.product,
            order_type: props.orderType,
            transaction_type: 'SELL'
        })
        }} className='w-1/2 my-1'>Sell</Button>
      <Button onClick={async ()=>{
          console.log(`Order : Sell ${props.quantity} ${props.putKey} ${props.product} ${props.orderType} `);
          const res=await axios.post('http://localhost:3000/api/place-order', {
            email: localStorage.getItem('email'),
            account_id:props.account_id,
            instrument_token: props.putKey,
            quantity: props.quantity,
            product: props.product,
            order_type: props.orderType,
            transaction_type: 'BUY'
        })
          if(res){console.log("done",res);

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
        }} className='w-1/2 my-1'>Buy</Button>
      </div>
    </div>
  )
}
