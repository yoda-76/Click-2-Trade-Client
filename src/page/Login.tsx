import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import React, { useState } from 'react';
// import { useDispatch } from "react-redux";
import {  useNavigate} from "react-router-dom";
// import { updateSessionReducer } from "../store/reducer";
import { useCookies } from "react-cookie";
import useUserStore from "@/store/userStore";
interface FormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  // const dispatch = useDispatch()
  const {updateName, updateEmail, updateVerified} = useUserStore((state)=>({...state}))
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['token'])

  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormValues({
      ...formValues,
      [id]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formValues);
    const response =await axios.post( `${import.meta.env.VITE_server_url}/api/login`,formValues,{
      withCredentials: true, // Ensure cookies are sent with the request
    })
    console.log(response)
    // setCookie("token",response.data.token)
    // console.log(cookies);
    localStorage.setItem("verified",response.data.data.verified)
    localStorage.setItem("email",response.data.data.email)
    localStorage.setItem("name", response.data.data.name)
    updateName(response.data.data.name)
    updateEmail(response.data.data.email)
    updateVerified(response.data.data.verified)

    // localStorage.setItem("role", response.data.role)

    //redirect to /dashboard
    // dispatch(updateSessionReducer(response.data))
    navigate('/dashboard');

  };

  return (
    <div className="flex justify-center">
       <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
        <form onSubmit={handleSubmit}>
      <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input className="text-white" id="email" placeholder="enter your email" onChange={handleChange} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input className="text-white" id="password" placeholder="create password" onChange={handleChange}/>
            </div>
          </div>
      </CardContent>
      <CardFooter className="flex justify-around">
        <Button type="submit">Login</Button>
      </CardFooter>
        </form>
        <a className="text-cyan-800 px-2 py-1" href="/register">Don't have an account?</a>
    </Card>
    </div>
  );
};

export default Login;
