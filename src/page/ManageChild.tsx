import  { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";


export default function ManageChild() {
  
  const [accountId, setAccountId] = useState<string | null>(null);
  const [childAccounts, setChildAccounts] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const queryParameters = new URLSearchParams(location.search);
      const id = queryParameters.get("id");
      setAccountId(id);

      // some await functions
      if (id) {
        // For example, fetch some data with the accountId
        // const data = await fetchDataWithAccountId(id);
      }
    };

    fetchData();
  }, [location.search]);

  useEffect(() => {
  axios.post("http://localhost:3000/api/get-child-account-details", {master_u_id: accountId}, {
    withCredentials: true, // Ensure cookies are sent with the request
  }).then((resp)=>{
       console.log(resp);
       setChildAccounts(resp.data)
   })   
  },[accountId])

  const changeMultiplier = (id: string, multiplier: number) => {
    // add try catch
    axios
      .post("http://localhost:3000/api/update-multiplier", {
        
        child_u_id: id,
        multiplier: multiplier,
      }, {
        withCredentials: true, // Ensure cookies are sent with the request
      })
      .then((resp) => {
        axios.post("http://localhost:3000/api/get-child-account-details", { master_u_id: accountId}, {
          withCredentials: true, // Ensure cookies are sent with the request
        }).then((resp)=>{
          setChildAccounts(resp.data)
      })   
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const toggleActive = (id: string, status:boolean) => {
    // add try catch
    axios
      .post(`${import.meta.env.VITE_server_url}/api/toggle-active`, {
        child_u_id: id,
        status
      }, {
        withCredentials: true, // Ensure cookies are sent with the request
      })
      .then((resp) => {
        axios.post(`${import.meta.env.VITE_server_url}/api/get-child-account-details`, { master_u_id: accountId}, {
          withCredentials: true, // Ensure cookies are sent with the request
        }).then((resp)=>{
          setChildAccounts(resp.data)
      })   
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
    <div>
      {childAccounts&&childAccounts.map((a:any)=>{
        return (
            <div className="bg-orange-500 flex justify-around"><h1>{JSON.stringify(a.u_id)}</h1> <h1>{JSON.stringify(a.name_tag)}</h1> <a className= "p-2 mx-1 h-fit rounded-md text-white font-medium font bg-cyan-600 " target="blank" href={`https://api.upstox.com/v2/login/authorization/dialog?response_type=code&client_id=${a.key}&redirect_uri=${import.meta.env.VITE_server_url}/auth&state=CHILD:${a.u_id}`}>Generate Token</a> <span>{a.last_token_generated_at}</span> <div className="bg-cyan-600"><Button onClick={()=>changeMultiplier(a.u_id, a.multiplier+1)} >+</Button>{a.multiplier}<Button onClick={()=>changeMultiplier(a.u_id, a.multiplier-1)} >-</Button> </div><Button className={a.active?"bg-green-600":"bg-red-600"} onClick={()=>toggleActive(a.u_id, !a.active)}>{!a.active?"Activate":"Deactivate"}</Button></div>
        )
      })}
    </div> 
    </div>
  );
}