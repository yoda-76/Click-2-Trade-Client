// import React from 'react'

export default function TabSelection(props:any) {
  return (
    <div className='grid p-2 glass1 grid-cols-5'>
        <div className={props.selectedTab === "positions" ? "uppercase text-white font-bold cursor-pointer " : "font-semibold cursor-pointer uppercase lighttxt"} onClick={()=>{props.setSelectedTab("positions")}}>positions</div>
        <div className={props.selectedTab === "orders" ? "uppercase text-white font-bold cursor-pointer " : "font-semibold cursor-pointer uppercase lighttxt"} onClick={()=>{props.setSelectedTab("orders")}}>orders</div>
        <div className={props.selectedTab === "trades" ? "uppercase text-white font-bold cursor-pointer " : "font-semibold cursor-pointer uppercase lighttxt"} onClick={()=>{props.setSelectedTab("trades")}}>trades</div>
        <div className={props.selectedTab === "funds" ? "uppercase text-white font-bold cursor-pointer " : "font-semibold cursor-pointer uppercase lighttxt"} onClick={()=>{props.setSelectedTab("funds")}}>funds</div>
    </div>
  )
}
