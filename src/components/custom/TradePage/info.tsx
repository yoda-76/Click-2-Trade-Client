import React, { useEffect, useState } from 'react'
import AccountSelection from '../Info/AccountSelection';
import TabSelection from '../Info/TabSelection';
import TabContent from '../Info/TabContent';


function info(props:any) {
  // console.log("INFO:",props.masterAccount.name_tag);
  const [accountOptions, setAccountOptions] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [selectedTab, setSelectedTab] = useState<"positions"|"orders"|"trades"|"funds">("positions");
  useEffect(() => {
    console.log(selectedAccount);
  },[selectedAccount])

  useEffect(() => {
    setSelectedAccount(`MASTER:${props.masterAccount.id}`)
  },[props])

  useEffect(() => {
    console.log("info : positions");
  },[selectedTab])
   
  return (
    <div>
    <AccountSelection master={props.masterAccount} child={props.childAccounts} accountOptions={accountOptions} setSelectedAccount={setSelectedAccount} />
    <TabSelection selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
    <TabContent master={props.masterAccount} child={props.childAccounts}  selectedTab={selectedTab} selectedAccount={selectedAccount}/>
    </div>
  )
}

export default React.memo(info);
