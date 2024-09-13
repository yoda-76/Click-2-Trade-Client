import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
interface FormValues {
  name_tag: string;
  u_id: string;
  email: string;
  key: string;
  secret: string;
  broker: string;
  broker_id: string;
  type: string;
  master: string;
}
export default function AddAccount(props:{refresh:React.Dispatch<React.SetStateAction<boolean>>, setAddAccountToggle:React.Dispatch<React.SetStateAction<boolean>>}) {
  const [formValues, setFormValues] = useState<FormValues>({
    name_tag: "",
    u_id:"",
    email: localStorage.getItem("email") || "",
    key: "",
    secret: "",
    broker: "",
    broker_id: "",
    type: "",
    master: "",
    
  });
  const [masterInputToggle, setMasterInputToggle] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormValues({
      ...formValues,
      [id]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formValues);
    const response = await axios.post(
      `${import.meta.env.VITE_server_url}/api/add-account`,
      formValues, {
        withCredentials: true, // Ensure cookies are sent with the request
      }
    );
    console.log(response);
    props.refresh((prev:boolean)=>!prev)
    props.setAddAccountToggle((prev:boolean)=>!prev)
  };

  useEffect(() => {
    console.log(formValues);
    if (formValues.type === "CHILD") {
      setMasterInputToggle(true);
    } else {
      setMasterInputToggle(false);
    }
  }, [formValues]);

  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Add Account</CardTitle>
          {/* <CardDescription>Create your account</CardDescription> */}
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name_tag">Name Tag</Label>
                <Input className="text-white"
                  id="name_tag"
                  placeholder="enter name tag to identify your account"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="u_id">Unique identifier</Label>
                <Input className="text-white"  
                  id="u_id"
                  placeholder="enter unique identifier to identify your account"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="key">Key</Label>
                <Input className="text-white" 
                  id="key"
                  placeholder="enter your key"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="secret">Secret</Label>
                <Input className="text-white" 
                  id="secret"
                  placeholder="enter your secret"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="broker">Select Broker</Label>
                <Select 
                  onValueChange={(value) => {
                    setFormValues({
                      ...formValues,
                      broker: value,
                    });
                  }}
                >
                  <SelectTrigger className="text-white" id="broker">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="UPSTOCKS">Upstocks</SelectItem>
                    <SelectItem value="DHAN">Dhan</SelectItem>
                    <SelectItem value="ANGEL">Angel</SelectItem>
                    <SelectItem value="ESPRESSO">Espresso</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="broker_id">Broker ID</Label>
                <Input className="text-white" 
                  id="broker_id"
                  placeholder="enter your Broker ID"
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="broker">Select Account Type</Label>
                <Select
                  onValueChange={(value) => {
                    setFormValues(
                      value === "MASTER"
                        ? { ...formValues, master: "", type: value }
                        : {
                            ...formValues,
                            type: value,
                          }
                    );
                  }}
                >
                  <SelectTrigger className="text-white" id="broker">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="MASTER">Master</SelectItem>
                    <SelectItem value="CHILD">Child</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {masterInputToggle ? (
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="master">Master Account</Label>
                  <Input className="text-white" 
                    id="master"
                    placeholder="enter master account id"
                    onChange={handleChange}
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-around">
            <Button type="submit">Submit</Button>
          </CardFooter>
        </form>
        {/* <a className="text-cyan-800 px-2 py-1" href="/login">Already have an account?</a> */}
      </Card>
    </div>
  );
}
