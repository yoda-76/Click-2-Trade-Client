import { Button } from "@/components/ui/button";
// import { Card, CardHeader, CardTitle } from "@/components/ui/card"; 
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddAccount from "@/components/custom/AddAccount";
import useUserStore from "@/store/userStore";

const Dashboard: React.FC = () => {
  const {
    name,
    email,
    // verified,
    accounts,
    updateAccounts,
    updateEmail,
    updateName,
    updateVerified,
  }:{name:string|null,email:string|null,accounts:any,updateAccounts:any,updateEmail:any,updateName:any,updateVerified:any} = useUserStore((state) => ({ ...state }));
  // const [currentActiveAccount, setCurrentActiveAccount] = useState("");
  const [addAccountToggle, setAddAccountToggle] = useState(false);
  const navigate = useNavigate();
  const [refreshState, setRefreshState] = useState(false);

  useEffect(() => {
    if (!email && !localStorage.getItem("email")) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (!email && localStorage.getItem("email")) {
      updateName(localStorage.getItem("name"));
      updateEmail(localStorage.getItem("email"));
      updateVerified(
        localStorage.getItem("verified") === "true"
          ? true
          : localStorage.getItem("verified") === "false"
          ? false
          : null
      );
    }
    axios
      .post(
        `${import.meta.env.VITE_server_url}/api/get-user-details`,
        { email },
        {
          withCredentials: true, // Ensure cookies are sent with the request
        }
      )
      .then((resp) => {
        updateAccounts(resp.data.accounts);
      });
  }, [email, refreshState]);

  // const activateAccountToggle = (id: string) => {
  //   if (currentActiveAccount === id) {
  //     setCurrentActiveAccount("");
  //   } else {
  //     setCurrentActiveAccount(id);
  //   }
  // };

  const tradeNowHandler = (id: string) => {
    navigate(`/trade?id=${id}`);
  };

  const deleteHandler = (id: string) => {
    //delete this account from database
    // also show confirmation dialog before doing so
    console.log("deleting: ", id);
  }

  return (
    <div className="flex-col flex items-center w-[100%]">
      <div className="flex flex-col items-start bg-amber-100 p-2 w-[100%]">
        <h1 className=" flex justify-center font-bold ">Welcome: {name}</h1>
        <div className="w-[100%] flex justify-between">

          <Button
            onClick={() => {
              setAddAccountToggle(!addAccountToggle);
            }}
          >
            Add Account
          </Button>
          <Button
          onClick={async () => {
            axios.post(
              `${import.meta.env.VITE_server_url}/api/logout`,
              {},
              {
                withCredentials: true, // Ensure cookies are sent with the request
              }
            );

            localStorage.clear();
            updateEmail(null);
            navigate("/login");
          }}
        >
          logout
        </Button>
        </div>
      </div>
      <div className="w-[100%] flex justify-center">
      {addAccountToggle && (
            <AddAccount
              setAddAccountToggle={setAddAccountToggle}
              refresh={setRefreshState}
            />
          )}
      </div>
      <div className="w-[100%] ">
      {accounts[0] &&
        accounts.map((a: any) => {
          return (
            <div className="bg-orange-500 flex justify-between m-2 p-2 rounded-sm">
                <div className="flex gap-3">

                <span><strong>Unique id: </strong>{JSON.stringify(a.u_id)}</span>
                <span><strong>Name Tag: </strong>{JSON.stringify(a.name_tag)}</span>
                <span><strong>Broker id: </strong>{JSON.stringify(a.broker_id)}</span>
                <span><strong>Last Token Generated at: </strong>{JSON.stringify(a.last_token_generated_at)}</span>
                </div>
                <div className="flex gap-3">

                <a
                  className="p-2  h-fit rounded-md text-white font-medium font bg-cyan-600 "
                  target="blank"
                  href={`https://api.upstox.com/v2/login/authorization/dialog?response_type=code&client_id=${a.key}&redirect_uri=${import.meta.env.VITE_server_url}/auth&state=MASTER:${a.u_id}`}
                >
                  Generate Token
                </a>

                <Button
                  onClick={() => {
                    tradeNowHandler(a.u_id);
                  }}
                >
                  Trade Now
                </Button>

                <Button
                  onClick={() => {
                    navigate(`/manage-child?id=${a.u_id}`);
                  }}
                >
                  Manage Child
                </Button>

                <Button
                className="bg-red-600"
                  onClick={() => {
                    deleteHandler(a.u_id);
                  }}
                >
                  Delete
                </Button>
                </div>
              <div className=" flex gap-3">
              </div>
            </div>
          );
        })}
      </div>
      <p>{refreshState}</p> {/*only used to rerender */}
    </div>
  );
};

export default Dashboard;
