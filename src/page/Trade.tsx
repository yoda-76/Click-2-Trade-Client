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
  const {master,updateMaster, updateChild, selected}:{master: any,  selected:string , setSelectedAccount: Function, updateMaster: Function, updateChild: Function} = useAccountStore((state) => ({...state}));
  const {setOptionsData} = useOptionStore((state) => ({...state}));
  const {updateBaseLTP, updateCallLTP, updatePutLTP}= useLtpStore((state) => ({...state}));
  const {base, call, put} = useSymbolStore((state) => ({...state}));
  const [accountId, setAccountId] = useState<string | null>(null);
  const [feed, setFeed] = useState<any>({});
  const {position, updatePosition}:{position:any[], updatePosition:Function} = usePositionStore((state) => ({...state}));
  const {updateMtm} = useMtmStore((state) => ({...state}));
  const {sl, target, mtmSl, mtmTarget, updateSl, updateTarget, updateMtmSl, updateMtmTarget}:{sl:any, target:any, mtmSl:any, mtmTarget:any, updateSl:Function, updateTarget:Function, updateMtmSl:Function, updateMtmTarget:Function}  = useSlStore((state) => ({...state}));
  // const {selected}:{master: any, child: any[], selected:string , setSelectedAccount: (data: any) => void} = useAccountStore((state) => ({...state}));
    // const {updatePosition}= usePositionStore((state) => ({...state}));
    const updatePositions=async () => {
    const {type, id} = extractId(selected)

      try {
        const resp = await axios.post(`${import.meta.env.VITE_server_url}/api/get-positions`, {
          token: localStorage.getItem("token"),
          account_id: id,
          account_type: type,
        });
        console.log("orders fetched", resp.data);
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
          token: localStorage.getItem("token"),
          master_id: id,
        })
        .then((resp) => {
          console.log("child;",resp.data);
          updateChild(resp.data);
        });
      axios
        .post(`${import.meta.env.VITE_server_url}/api/get-account-details`, {
          token: localStorage.getItem("token"),
          id: id,
        })
        .then((resp) => {
          updateMaster(resp.data);
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
    axios
      .get(`${import.meta.env.VITE_server_url}/api/get-structured-options-data`)
      .then((resp) => {
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
    var newBaseLTP = 0;
    try {
       newBaseLTP = feed[base?.key]?.ff.indexFF.ltpc.ltp;
    } catch (error) {
       newBaseLTP = feed[base?.key]?.ff.marketFF.ltpc.ltp;
    }

    newBaseLTP && updateBaseLTP(newBaseLTP);
    feed[call.key] && updateCallLTP(feed[call.key]?.ff.marketFF.ltpc.cp);
    feed[put.key] && updatePutLTP(feed[put.key]?.ff.marketFF.ltpc.cp);
  
    //maintaning pnl
    var mtm = 0
    const updatedPosition = position.map(p=>{
      var ltp = 0
      try {
        ltp = feed[p.instrument_token]?.ff.indexFF.ltpc.ltp;
      } catch (error) {
        ltp = feed[p.instrument_token]?.ff.marketFF.ltpc.ltp;
      };
      if(typeof ltp === "number"){
        const pnl = Math.trunc(((p.sell_value - p.buy_value) + (p.quantity * ltp * p.multiplier)) * 100) / 100
        if(sl[p.instrument_token] >=pnl && sl[p.instrument_token] !==0){
          console.log("squared of, sl hit");
          updateSl({key: p.instrument_token, value: 0})
          //squareoff
        }
        if(target[p.instrument_token] <=pnl && target[p.instrument_token] !==0){
          console.log("squared of, target hit");
          updateTarget({key: p.instrument_token, value: 0})
          //squareoff
        }
        mtm+=pnl
        
        
        return {...p, last_price: `=${ltp}`, pnl: pnl, sl:sl[p.instrument_token], target:target[p.instrument_token]}
      }
      else{
        mtm+=p.pnl
        return p
      }
      // update mtm
    })
    updateMtm(mtm)
    //check mtm sl and target
    if(mtmSl !== 0 && mtmSl >= mtm){
      console.log("MTM SL HIT");
      axios.post(`${import.meta.env.VITE_server_url}/api/square-off-all`, {
        account_id:master.id, account_type:"MASTER"
      }).then(()=>{
        updateMtmSl(0)
        updatePositions()
      })
    }
    if(mtmTarget !== 0 && mtmTarget <= mtm){
      console.log("MTM TARGET HIT");
      axios.post(`${import.meta.env.VITE_server_url}/api/square-off-all`, {
        account_id:master.id, account_type:"MASTER"
      }).then(()=>{
        // updateMtmSl(0)
        updatePositions()
        
      })
      updateMtmTarget(0)
    }
    updatePosition(updatedPosition);

  }, [feed]);

  return (
    <div>
      <Inputs />
      <LtpDisplay/>
      <Buttons
        account_id={accountId}
      />
      <Info/>
    </div>
  );
}


