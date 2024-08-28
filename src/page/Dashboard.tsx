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
import { useDispatch, useSelector } from "react-redux";
import { deleteSessionReducer, updateSessionReducer } from "../store/reducer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddAccount from "@/components/custom/AddAccount";
import { useCookies } from "react-cookie";

const Dashboard: React.FC = () => {
    // const [masterId, setMasterId]= useState("")
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [currentActiveAccount, setCurrentActiveAccount]= useState("")
    const [addAccountToggle, setAddAccountToggle]= useState(false)
    const navigate = useNavigate()
    const details = useSelector((state: any)=>state.updateDetails)
    const dispatch= useDispatch()
    useEffect(()=>{

      console.log(details , localStorage.getItem("email"))
      if(!details.email || !localStorage.getItem("email")){
        navigate("/login")
      }
    }, [details])
    useEffect(()=>{
      
      axios.post(`${import.meta.env.VITE_server_url}/api/get-user-details`, {token: localStorage.getItem("token"), email:details.email}).then((resp)=>{
        dispatch(updateSessionReducer(resp.data))
      })

      
      console.log("cookoe",cookies);
    },[])

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

    {addAccountToggle&&<AddAccount/>}
    <Button onClick={()=>{setAddAccountToggle(!addAccountToggle)}}>{addAccountToggle?"Back":"Add Account"}</Button>
    </Card>
    <Button onClick={()=>{
        dispatch(deleteSessionReducer())
        localStorage.clear()
        navigate("/login")
    }}>logout</Button>
    
    

    </div>
      {details&&details.accounts.map((a:any)=>{
        return <div className="bg-orange-500"><h1>{JSON.stringify(a)}</h1> <a className= "p-2 mx-1 h-fit rounded-md text-white font-medium font bg-cyan-600 " target="blank" href={`https://api.upstox.com/v2/login/authorization/dialog?response_type=code&client_id=${a.key}&redirect_uri=${import.meta.env.VITE_server_url}/auth&state=MASTER:${a.id}`}>Generate Token</a> <Button onClick={()=>{activateAccountToggle(a.id)}}>{currentActiveAccount===a.id?"Deactivate":"Activate"}</Button> <Button onClick={(()=>{tradeNowHandler(a.id)})}>Trade Now</Button> <Button onClick={(()=>{navigate(`/manage-child?id=${a.id}`)})}>Manage Child</Button></div>
      })}
    </div> 
  );
};

export default Dashboard;
