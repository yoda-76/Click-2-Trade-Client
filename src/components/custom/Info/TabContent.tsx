import React, { useEffect, useState } from 'react'
import OrderBook from './OrderBook'
import axios from 'axios'
import Funds from './Funds';
import Positions from './Positions';
function extractId(input: string): {
    type: "MASTER" | "CHILD" | null;
    id: string | null;
  } {
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
export default function TabContent(props:any) {
    const {type, id} = extractId(props.selectedAccount)
    useEffect(() => {
    console.log("selected account",props);
     
    },[props])
    // console.log(props.selected)
  return (<>
  
   {/* {props.selected==="trades" && <Trades/>} */}
    {props.selectedTab=="orders" && <OrderBook account_id={id} account_type={type} />}
     {props.selectedTab=="funds" && <Funds account_id={id} account_type={type} />}
     {props.selectedTab==="positions" && <Positions account_id={id} account_type={type}/>}
     </>
  )
}

// Symbol Name 
// Type
// Side
// Qty
// Rem QTY
// OrderPrice
// Traded Price
// Triggered Price
// Status
// Time/Date
// Order Id
// Message
// Action
