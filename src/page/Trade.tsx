import { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import Buttons from "../components/custom/TradePage/buttons";
import Inputs from "../components/custom/TradePage/inputs";
import LtpDisplay from "../components/custom/TradePage/ltpDisplay";
import Info from "../components/custom/TradePage/info";
import useAccountStore  from "../store/accountStore";
import useOptionStore from "../store/optionsDataStore";
import useLtpStore from "@/store/ltpStore";
import useSymbolStore from "@/store/symbolStore";
import usePositionStore from "@/store/positionStore";
import useMtmStore from "@/store/mtmStore";
import useSlStore from "@/store/slStore";
import useUserStore from "@/store/userStore";
import { useNavigate } from "react-router-dom";

// const SOCKET_SERVER_URL = "http://localhost:3000";

function extractId(input: string): {
  type: "MASTER" | "CHILD" | null;
  id: string | null;
} {
  console.log("input: ", input);
  if(!input) return {type: null, id: null}
  const masterRegex = /^MASTER:([a-zA-Z0-9]+)$/;
  const childRegex = /^CHILD:([a-zA-Z0-9]+)$/;

  let match = input.match(masterRegex);
  if (match) {
    return { type: "MASTER", id: match[1] };
  }

  match = input.match(childRegex);
  if (match) {
    return { type: "CHILD", id: match[1] };
  }

  return { type: null, id: null };
}

export default function Trade() {
  const {email} = useUserStore((state)=>({...state}))
  const navigate = useNavigate()

  const {master,updateMaster, updateChild, selected, setSelectedAccount}:{master: any,  selected:string , setSelectedAccount: Function, updateMaster: Function, updateChild: Function} = useAccountStore((state) => ({...state}));
  const {setOptionsData} = useOptionStore((state) => ({...state}));
  const {updateBaseLTP, updateCallLTP, updatePutLTP}= useLtpStore((state) => ({...state}));
  const {base, call, put} = useSymbolStore((state) => ({...state}));
  const [accountId, setAccountId] = useState<string | null>(null);
  const [feed, setFeed] = useState<any>({});
  const {position, updatePosition}:{position:any[], updatePosition:Function} = usePositionStore((state) => ({...state}));
  const {updateMtm} = useMtmStore((state) => ({...state}));
  const {preferedSl, preferedTarget, updatePreferedSl, updatePreferedTarget, mtmTslBase, updateMtmTslBase, tslBase, updateTslBase, sl, target, mtmSl, mtmTarget, updateSl, updateTarget, updateMtmSl, updateMtmTarget}:{sl:any, target:any, mtmSl:any, mtmTarget:any, preferedSl:number|null, preferedTarget:number|null, updatePreferedSl:Function, updatePreferedTarget:Function, updateSl:Function, updateTarget:Function, updateMtmSl:Function, updateMtmTarget:Function, tslBase:any, updateTslBase:Function, mtmTslBase:any, updateMtmTslBase:Function}  = useSlStore((state) => ({...state}));
  // const {selected}:{master: any, child: any[], selected:string , setSelectedAccount: (data: any) => void} = useAccountStore((state) => ({...state}));
    // const {updatePosition}= usePositionStore((state) => ({...state}));
    const updatePositions=async () => {
    const {type, id} = extractId(selected)

      try {
        const resp = await axios.post(`${import.meta.env.VITE_server_url}/api/get-positions`, {
          account_id: id,
          account_type: type,
        }, {
          withCredentials: true, // Ensure cookies are sent with the request
        });
        // console.log("orders fetched", resp.data);
        updatePosition(resp.data);
      } catch (e) {
        console.log(e);
      }
    }
  useEffect(() => {
    const fetchData = async () => {
      const queryParameters = new URLSearchParams(location.search);
      const id = queryParameters.get("id");
      setAccountId(id);
      //get all child account id
      //get-child-account-details
      axios
        .post(`${import.meta.env.VITE_server_url}/api/get-child-account-details`, {
          master_u_id: id,
        }, {
          withCredentials: true, // Ensure cookies are sent with the request
        })
        .then((resp) => {
          console.log("child;",resp.data);
          updateChild(resp.data);
        });

      axios
        .post(`${import.meta.env.VITE_server_url}/api/get-account-details`, {
         master_u_id:id,
        }, {
          withCredentials: true, // Ensure cookies are sent with the request
        })
        .then((resp) => {
          updateMaster(resp.data);
          setSelectedAccount(`MASTER:${resp.data.u_id}`)
        });

        axios.post(`${import.meta.env.VITE_server_url}/api/get-prefrences`, { account_id: id },{withCredentials: true,}).then((resp) => {
          console.log("prefrences: ",resp.data);
          updatePreferedSl(resp.data.stoploss)
          updatePreferedTarget(resp.data.target)
        })

        axios.post(`${import.meta.env.VITE_server_url}/api/get-orders`, {
          account_id: id,
          // account_type: type,
        }, {
          withCredentials: true, // Ensure cookies are sent with the request
        });

      // some await functions
      if (id) {
        // For example, fetch some data with the accountId
        // const data = await fetchDataWithAccountId(id);
      }
    };

    fetchData();
    updatePositions()
  }, [location.search]);

  useEffect(() => {
    if(!email && !localStorage.getItem("email")){
      navigate("/login")
    }
    axios
      .get(`${import.meta.env.VITE_server_url}/api/get-structured-options-data`, {
        withCredentials: true, // Ensure cookies are sent with the request
      })
      .then((resp) => {
        // console.log(resp.data);
        setOptionsData(resp.data);
      });

      

    const socket = io(import.meta.env.VITE_server_url);
    socket.emit("new-user", { test: 123 });

    // Listen for the "market-data" event
    socket.on("market-data", (data: any) => {
      setFeed(data.feeds);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    var newBaseLTP = feed[base?.key]?.ltpc.ltp;
   
    newBaseLTP && updateBaseLTP(newBaseLTP);
    if(feed[call.key]){
      updateCallLTP(feed[call.key]?.ltpc.ltp);
        }
    if(feed[put.key]){
      updatePutLTP(feed[put.key]?.ltpc.ltp);

        }
    //maintaning pnl
    var mtm = 0
    const updatedPosition = position.map(p=>{
      var ltp = 0
      try {
        ltp = feed[p.instrument_token]?.ltpc.ltp;
      } catch (error) {
        ltp = feed[p.instrument_token]?.ltpc.ltp;
      };
      if(typeof ltp === "number"){
        if(!sl[p.instrument_token] && preferedSl){
          updateSl({key: p.instrument_token, value: ltp-preferedSl})
        }
        if(!target[p.instrument_token] && preferedTarget){
          updateTarget({key: p.instrument_token, value: ltp+preferedTarget})
        }
        const pnl = Math.trunc(((p.sell_value - p.buy_value) + (p.quantity * ltp * p.multiplier)) * 100) / 100;

        if(tslBase[p.instrument_token] && ltp>tslBase[p.instrument_token]){
          updateSl({key: p.instrument_token, value:sl[p.instrument_token]+(ltp-tslBase[p.instrument_token])})
          updateTslBase({key: p.instrument_token, value:ltp})
        }



        if(sl[p.instrument_token] >=ltp && sl[p.instrument_token] !==null){
          console.log("squared of, sl hit");
          axios.post(`${import.meta.env.VITE_server_url}/api/square-off-single`, {
            account_id:master.id, account_type:"MASTER", tradingSymbol:p.trading_symbol
          }, {
            withCredentials: true, // Ensure cookies are sent with the request
          }).then(()=>{
            updatePositions()
          })
          updateSl({key: p.instrument_token, value: null})
        }
        
        if(target[p.instrument_token] <=ltp && target[p.instrument_token] !==null){
          console.log("squared of, target hit");
          axios.post(`${import.meta.env.VITE_server_url}/api/square-off-single`, {
            account_id:master.id, account_type:"MASTER", tradingSymbol:p.trading_symbol
          }, {
            withCredentials: true, // Ensure cookies are sent with the request
          }).then(()=>{
            updatePositions()
          })
          updateTarget({key: p.instrument_token, value: null})
        }
        mtm+=pnl
        return {...p, last_price: ltp, pnl: pnl, sl:sl[p.instrument_token], target:target[p.instrument_token]}
      }
      else{
        mtm+=p.pnl
        return p
      }
    })

    updateMtm(mtm)

    if(mtmTslBase && mtm>mtmTslBase){
      updateMtmSl(mtmSl+(mtm-mtmTslBase))
      updateMtmTslBase(mtm)
    }

    //mtm tsl
    //check mtm sl and target
    if(mtmSl !== null && mtmSl >= mtm){
      console.log("MTM SL HIT");
      axios.post(`${import.meta.env.VITE_server_url}/api/square-off-all`, {
        account_id:master.id, account_type:"MASTER"
      }, {
        withCredentials: true, // Ensure cookies are sent with the request
      }).then(()=>{
        updatePositions()
      })
      updateMtmSl(null)
    }
    if(mtmTarget !== null && mtmTarget <= mtm){
      console.log("MTM TARGET HIT");
      axios.post(`${import.meta.env.VITE_server_url}/api/square-off-all`, {
        account_id:master.id, account_type:"MASTER"
      }, {
        withCredentials: true, // Ensure cookies are sent with the request
      }).then(()=>{
        // updateMtmSl(0)
        updatePositions()
        
      })
      updateMtmTarget(null)
    }
    updatePosition(updatedPosition);
  }, [feed]);

  return (
    <div className="">
      <Inputs />
      <LtpDisplay/>
      <Buttons
        account_id={accountId}
      />
      <Info/>
    </div>
  );
}


