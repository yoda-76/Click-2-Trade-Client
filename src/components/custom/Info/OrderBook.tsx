import axios from "axios";
import React, { useEffect, useState } from "react";

export default function OrderBook(props: any) {
  console.log("orderbook rendered", props);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const resp = await axios.post(`${import.meta.env.VITE_server_url}/api/get-orders`, {
          token: localStorage.getItem("token"),
          account_id: props.account_id,
          account_type: props.account_type,
        });
        console.log("orders fetched", resp.data);
        setOrders(resp.data);
      } catch (e) {
        console.log(e);
        setOrders([]);
      }
    })();
  }, [props]);
  return (
    <>
      {/* {JSON.stringify(orders)} */}
      <div className="grid grid-cols-12 bg-gray-300">
        <div>Symbol Name</div>
        <div>Type</div>
        <div>Side</div>
        <div>Qty</div>
        <div>OrderPrice</div>
        <div>Traded Price</div>
        <div>Triggered Price</div>
        <div>Status</div>
        <div>Time/Date</div>
        <div>Order Id</div>
        <div>Message</div>
        <div>Action</div>
      </div>
      {orders.map((v: any, i: number) => {
        return (
          <div className="grid grid-cols-12">
            <div className="break-words">
              {v.tradingsymbol ? v.tradingsymbol : "---"}
            </div>
            <div className="break-words">
              {v.order_type ? v.order_type : "---"}
            </div>
            <div>{v.transaction_type ? v.transaction_type : "---"}</div>
            <div>{v.quantity ? v.quantity : "Qty"}</div>
            <div>{v.price ? v.price : "---"}</div>
            <div>{v.traded_price ? v.traded_price : "---"}</div>
            <div>
              {v.trigger_price ? v.trigger_price : "---"}
            </div>
            <div>{v.status ? v.status : "---"}</div>
            <div className="break-words">
              {v.order_timestamp ? v.order_timestamp : "---"}
            </div>
            <div className="break-words">
              {v.order_id ? v.order_id : "---"}
            </div>
            <div className="break-words">
              {v.status_message ? v.status_message : "---"}
            </div>
            <div>{v.action ? v.action : "Action"}</div>
          </div>
          // <div key={i}>
          //   {v.tradingsymbol}
          //   {v.order_type}
          //   {v.transaction_type}
          //   {v.quantity}
          //   {"v.rem_qty"}
          //   {"v.order_price"}
          //   {"v.traded_price"}
          //   {"v.triggered_price"}
          //   {v.status}
          //   {v.order_timestamp}
          //   {v.order_id}
          //   {v.status_message}
          //   {"v.action"}
          // </div>
        );
      })}
    </>
  );
}
