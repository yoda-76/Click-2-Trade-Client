import  { useEffect, useState } from "react";
import axios from "axios";
export default function Funds(props: any) {
  console.log("funds props:", props);
  const [funds, setFunds] = useState<any>();
  useEffect(() => {
    (async () => {
      const resp: any= await axios.post(`${import.meta.env.VITE_server_url}/api/get-funds`, {
        account_id: props.account_id,
      }, {
        withCredentials: true, // Ensure cookies are sent with the request
      });
      console.log(resp);
      setFunds(resp.data);
    })();
  }, [props]);
  return (
  <div  className="grid grid-cols-2 mt-2">
    <div className="bg-gray-600 p-5 m-2 rounded-sm">
    <h1 className="text-2xl font-semibold">Commodity</h1>
      <div className="grid grid-cols-2">

      <div>
        <div>Total Balance: </div>
        <div>Used Margin: </div>
        <div>Available: </div>
      </div>
      <div>
        <div>{funds&&(funds.commodity.available_margin+funds.commodity.payin_amount+funds.commodity.adhoc_margin+funds.commodity.notional_cash)}</div>
        <div>{funds&&funds.commodity.used_margin}</div>
        <div>{funds&&funds.commodity.available_margin}</div>
        {/* total_balance = available_margin + payin_amount + adhoc_margin + notional_cash */}
      </div>
      </div>
    </div>
    <div className="bg-gray-600 p-5 m-2 rounded-sm">
      <h1 className="text-2xl font-semibold">Equity</h1>
      <div className="grid grid-cols-2">

      <div>
        <div>Total Balance: </div>
        <div>Used Margin: </div>
        <div>Available: </div>
      </div>
      <div>
        <div>{funds&&(funds.equity.available_margin+funds.equity.payin_amount+funds.equity.adhoc_margin+funds.equity.notional_cash)}</div>
        <div>{funds&&funds.equity.used_margin}</div>
        <div>{funds&&funds.equity.available_margin}</div>
      </div>
      </div>
    </div>
  </div>
  );
}
