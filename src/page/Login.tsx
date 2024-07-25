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
import { useDispatch } from "react-redux";
import { Router , useNavigate} from "react-router-dom";
import { updateSessionReducer } from "../../store/reducer";

interface FormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

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
    const response =await axios.post( "http://localhost:3000/api/login",formValues)
    console.log(response)
    localStorage.setItem("token",response.data.token)
    localStorage.setItem("email",response.data.email)
    localStorage.setItem("name", response.data.name)
    // localStorage.setItem("role", response.data.role)

    //redirect to /dashboard
    dispatch(updateSessionReducer(response.data))
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
              <Input id="email" placeholder="enter your email" onChange={handleChange} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" placeholder="create password" onChange={handleChange}/>
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
