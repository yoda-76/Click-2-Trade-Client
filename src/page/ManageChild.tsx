import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import useUserStore from "@/store/userStore";
import { useNavigate } from "react-router-dom";

export default function ManageChild() {
  const {
    name,
    email,
    // verified,
    // accounts,
    updateAccounts,
    updateEmail,
    updateName,
    updateVerified,
  }: {
    name: string | null;
    email: string | null;
    accounts: any;
    updateAccounts: any;
    updateEmail: any;
    updateName: any;
    updateVerified: any;
  } = useUserStore((state) => ({ ...state }));
  const navigate = useNavigate();

  const [accountId, setAccountId] = useState<string | null>(null);
  const [childAccounts, setChildAccounts] = useState<any[]>([]);

  useEffect(() => {
    if (!email && !localStorage.getItem("email")) {
      navigate("/dashboard");
    } else if (!email && localStorage.getItem("email")) {
      updateName(localStorage.getItem("name"));
      updateEmail(localStorage.getItem("email"));
      updateVerified(
        localStorage.getItem("verified") === "true"
          ? true
          : localStorage.getItem("verified") === "false"
          ? false
          : null
      );
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
        })
        .catch((error) => console.log(error));
    }
    const queryParameters = new URLSearchParams(location.search);

    const id = queryParameters.get("id");
    axios
      .post(
        `${import.meta.env.VITE_server_url}/api/get-child-account-details`,
        { master_u_id: id },
        {
          withCredentials: true, // Ensure cookies are sent with the request
        }
      )
      .then((resp) => {
        setChildAccounts(resp.data);
      })
      .catch((error) => console.log(error));
  }, []);

  console.log(name, email);

  useEffect(() => {
    const queryParameters = new URLSearchParams(location.search);
    const id = queryParameters.get("id");
    setAccountId(id);
  }, [location.search]);

  useEffect(() => {
    if (accountId) {
      axios
        .post(
          `${import.meta.env.VITE_server_url}/api/get-child-account-details`,
          { master_u_id: accountId },
          {
            withCredentials: true, // Ensure cookies are sent with the request
          }
        )
        .then((resp) => {
          setChildAccounts(resp.data);
        })
        .catch((error) => console.log(error));
    }
  }, [accountId]);

  const changeMultiplier = (id: string, multiplier: number) => {
    // add try catch
    axios
      .post(
        `${import.meta.env.VITE_server_url}/api/update-multiplier`,
        {
          child_u_id: id,
          multiplier: multiplier,
        },
        {
          withCredentials: true, // Ensure cookies are sent with the request
        }
      )
      .then(() => {
        axios
          .post(
            `${import.meta.env.VITE_server_url}/api/get-child-account-details`,
            { master_u_id: accountId },
            {
              withCredentials: true, // Ensure cookies are sent with the request
            }
          )
          .then((resp) => {
            setChildAccounts(resp.data);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleActive = (id: string, status: boolean) => {
    // add try catch
    axios
      .post(
        `${import.meta.env.VITE_server_url}/api/toggle-active`,
        {
          child_u_id: id,
          status,
        },
        {
          withCredentials: true, // Ensure cookies are sent with the request
        }
      )
      .then(() => {
        axios
          .post(
            `${import.meta.env.VITE_server_url}/api/get-child-account-details`,
            { master_u_id: accountId },
            {
              withCredentials: true, // Ensure cookies are sent with the request
            }
          )
          .then((resp) => {
            setChildAccounts(resp.data);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteHandler = (id: string) => {
    console.log("delete",id);
  }
  return (
    <div>
      <div className="flex flex-col items-start bg-amber-100 p-2 w-[100%]">
        <h1 className=" flex justify-center font-bold ">Welcome: {name}</h1>
        <div className="w-[100%] flex justify-between">
          <Button
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Home
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
      <div>
        {childAccounts &&
          childAccounts.map((a: any) => {
            return (
              <div>
                <div className="bg-orange-500 flex justify-between m-2 p-2 rounded-sm">
                <div className="flex gap-3">
                <span><strong>Unique id: </strong>{JSON.stringify(a.u_id)}</span>
                <span><strong>Name Tag: </strong>{JSON.stringify(a.name_tag)}</span>
                <span><strong>Broker id: </strong>{JSON.stringify(a.broker_id)}</span>
                <span><strong>Last Token Generated at: </strong>{JSON.stringify(a.last_token_generated_at)}</span>
                </div>
                <div className="flex gap-3">
                <a
                    className="p-2 mx-1 h-fit rounded-md text-white font-medium font bg-cyan-600 "
                    target="blank"
                    href={`https://api.upstox.com/v2/login/authorization/dialog?response_type=code&client_id=${
                      a.key
                    }&redirect_uri=${
                      import.meta.env.VITE_server_url
                    }/auth&state=CHILD:${a.u_id}`}
                  >
                    Generate Token
                  </a>{" "}
                  <span>{a.last_token_generated_at}</span>{" "}
                  <div className="bg-cyan-600">
                    <Button
                      onClick={() => changeMultiplier(a.u_id, a.multiplier + 1)}
                    >
                      +
                    </Button>
                    {a.multiplier}
                    <Button
                      onClick={() => changeMultiplier(a.u_id, a.multiplier - 1)}
                    >
                      -
                    </Button>{" "}
                  </div>
                  <Button
                    className={a.active ? "bg-green-600" : "bg-red-600"}
                    onClick={() => toggleActive(a.u_id, !a.active)}
                  >
                    {!a.active ? "Activate" : "Deactivate"}
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

                  
                  
                 
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
