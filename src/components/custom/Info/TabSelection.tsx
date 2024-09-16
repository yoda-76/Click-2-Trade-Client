// import React from 'react'

export default function TabSelection(props:any) {
  return (
    <div className='grid grid-cols-5 bg-gray-500'>
        <div className={props.selectedTab === "positions" ? "bg-sky-500 text-black font-bold text-black " : ""} onClick={()=>{props.setSelectedTab("positions")}}>POSITIONS</div>
        <div className={props.selectedTab === "orders" ? "bg-sky-500 text-black font-bold" : ""} onClick={()=>{props.setSelectedTab("orders")}}>ORDER BOOK</div>
        <div className={props.selectedTab === "trades" ? "bg-sky-500 text-black font-bold" : ""} onClick={()=>{props.setSelectedTab("trades")}}>TRADE BOOK</div>
        <div className={props.selectedTab === "funds" ? "bg-sky-500 text-black font-bold" : ""} onClick={()=>{props.setSelectedTab("funds")}}>FUNDS</div>
    </div>
  )
}
