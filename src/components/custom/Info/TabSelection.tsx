import React from 'react'

export default function TabSelection(props:any) {
  return (
    <div className='grid grid-cols-5'>
        <div className={props.selectedTab === "positions" ? "bg-sky-500" : ""} onClick={()=>{props.setSelectedTab("positions")}}>positions</div>
        <div className={props.selectedTab === "orders" ? "bg-sky-500" : ""} onClick={()=>{props.setSelectedTab("orders")}}>orders</div>
        <div className={props.selectedTab === "trades" ? "bg-sky-500" : ""} onClick={()=>{props.setSelectedTab("trades")}}>trades</div>
        <div className={props.selectedTab === "funds" ? "bg-sky-500" : ""} onClick={()=>{props.setSelectedTab("funds")}}>funds</div>
    </div>
  )
}
