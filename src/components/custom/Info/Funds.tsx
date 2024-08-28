import React, { useEffect, useState } from "react";
import axios from "axios";
export default function Funds(props: any) {
  const [funds, setFunds] = useState({});
  useEffect(() => {
    (async () => {
      const resp = await axios.post(`${import.meta.env.VITE_server_url}/api/get-funds`, {
        account_id: props.account_id,
      });
      console.log(resp);
      setFunds(resp.data);
    })();
  }, [props]);
  return <div>{JSON.stringify(funds)}
  Funds</div>;
}
