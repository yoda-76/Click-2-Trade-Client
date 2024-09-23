import { Button } from "@/components/ui/button";
import useAccountStore from "@/store/accountStore";
import axios from "axios";
import { useEffect, useState } from "react";

export default function OrderBook(props: any) {
  const {master}:{master: any} = useAccountStore((state) => ({...state}));
  console.log("orderbook rendered", props);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const resp = await axios.post(`${import.meta.env.VITE_server_url}/api/get-orders`, {
          account_id: props.account_id,
          account_type: props.account_type,
        }, {
          withCredentials: true, // Ensure cookies are sent with the request
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
      <div className="grid grid-cols-12 ">
        <div>Symbol Name</div>
        <div>Type</div>
        <div>Side</div>
        <div>Qty</div>
        <div>Order Price</div>
        <div>Avg Price</div>
        <div>Triggered Price</div>
        <div>Status</div>
        <div>Time/Date</div>
        <div>Order Id</div>
        <div>Message</div>
        <div>Action</div>
      </div>
      <div className="bg-white w-[100%] p-[0.5px]"/>

      {orders.map((v: any) => {
        return (
          <div className="grid grid-cols-12 ">
            <div className="break-words">
              {v.tradingsymbol ? v.tradingsymbol : "---"}
            </div>
            <div className="break-words">
              {v.order_type ? v.order_type : "---"}
            </div>
            <div>{v.transaction_type ? v.transaction_type : "---"}</div>
            <div>{v.quantity ? v.quantity : "Qty"}</div>
            <div>{v.price ? v.price : "---"}</div>
            <div>{v.average_price ? v.average_price : "---"}</div>
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
            <div>{(v.status==="open"||v.status==="pending"||v.status==="after market order req received"|| v.status==="modify after market order req received")?<div className="flex gap-2"><Button onClick={() => {
              // console.log(v.order_id);
              axios.post(`${import.meta.env.VITE_server_url}/api/cancel-order`, { order_id: v.order_id, master_u_id: master.u_id}, {
                withCredentials: true, // Ensure cookies are sent with the request
              })
            }}>Cancel</Button> 
            {/* <Button onClick={() => {}}>Modify</Button> */}
            </div>:("---")}</div>
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
