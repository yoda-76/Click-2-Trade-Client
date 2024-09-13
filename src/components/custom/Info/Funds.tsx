import  { useEffect, useState } from "react";
import axios from "axios";
export default function Funds(props: any) {
  console.log("funds props:", props);
  const [funds, setFunds] = useState({});
  useEffect(() => {
    (async () => {
      const resp = await axios.post(`${import.meta.env.VITE_server_url}/api/get-funds`, {
        account_id: props.account_id,
      }, {
        withCredentials: true, // Ensure cookies are sent with the request
      });
      console.log(resp);
      setFunds(resp.data);
    })();
  }, [props]);
  return <div>{JSON.stringify(funds)}
  Funds</div>;
}
