// import { Button } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import {
  Card,
  // CardContent,
  // CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddAccount from "@/components/custom/AddAccount";
import useUserStore from "@/store/userStore";

const Dashboard: React.FC = () => {
  const {name, email, verified, accounts, updateAccounts, updateEmail, updateName, updateVerified} = useUserStore((state)=>({...state}))
    // const [masterId, setMasterId]= useState("")
    const [currentActiveAccount, setCurrentActiveAccount]= useState("")
    const [addAccountToggle, setAddAccountToggle]= useState(false)
    const navigate = useNavigate()
    const [refreshState, setRefreshState] = useState(false)
    useEffect(()=>{
  console.log("visited dashboard", email, name , verified);

      if(!email && !localStorage.getItem("email")){
        navigate("/login")
      }
      
    }, [])
    useEffect(()=>{
      if(!email && localStorage.getItem("email")){
        updateName(localStorage.getItem("name"))
        updateEmail(localStorage.getItem("email"))
        updateVerified(localStorage.getItem("verified")==="true"?true:localStorage.getItem("verified")==="false"?false:null)
      }
      axios.post(`${import.meta.env.VITE_server_url}/api/get-user-details`, { email }, {
        withCredentials: true, // Ensure cookies are sent with the request
      }).then((resp)=>{
        console.log("user info",resp.data);
        updateAccounts(resp.data.accounts)
      })
    },[email, refreshState])
    

    // console.log(details.accounts);
    

    const activateAccountToggle = (id:string)=>{
      if(currentActiveAccount===id){
        setCurrentActiveAccount("")}else{
          setCurrentActiveAccount(id)}
    }

    const tradeNowHandler = (id:string)=>{
      navigate(`/trade?id=${id}`)
    }

    

  return (
    <div className="flex-col flex">
      <div className="flex justify-center">
       <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Dashboard</CardTitle>
      </CardHeader>

    {addAccountToggle&&<AddAccount setAddAccountToggle={setAddAccountToggle} refresh={setRefreshState}/>}
    <Button onClick={()=>{setAddAccountToggle(!addAccountToggle)}}>{addAccountToggle?"Back":"Add Account"}</Button>
    </Card>
    <Button onClick={async()=>{
       axios.post(`${import.meta.env.VITE_server_url}/api/logout`,{},{
          withCredentials: true, // Ensure cookies are sent with the request
        })
        
        localStorage.clear()
        //clear every state
        updateEmail(null)
        navigate("/login")
    }}>logout</Button>
    </div>
      {accounts[0]&&accounts.map((a:any)=>{
        return <div className="bg-orange-500"><h1>{JSON.stringify(a)}</h1> <a className= "p-2 mx-1 h-fit rounded-md text-white font-medium font bg-cyan-600 " target="blank" href={`https://api.upstox.com/v2/login/authorization/dialog?response_type=code&client_id=${a.key}&redirect_uri=${import.meta.env.VITE_server_url}/auth&state=MASTER:${a.u_id}`}>Generate Token</a> <Button onClick={()=>{activateAccountToggle(a.id)}}>{currentActiveAccount===a.id?"Deactivate":"Activate"}</Button> <Button onClick={(()=>{tradeNowHandler(a.u_id)})}>Trade Now</Button> <Button onClick={(()=>{navigate(`/manage-child?id=${a.u_id}`)})}>Manage Child</Button></div>
      })}
 <p>{refreshState}</p>  {/*only used to rerender */}
    </div> 
  );
};

export default Dashboard;
