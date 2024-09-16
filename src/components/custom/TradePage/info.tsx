import React, { useEffect, useState } from 'react'
import AccountSelection from '../Info/AccountSelection';
import TabSelection from '../Info/TabSelection';
import TabContent from '../Info/TabContent';
import useAccountStore from '../../../store/accountStore';
import Mtm from '../Info/Mtm';


function info() {
  const {selected }= useAccountStore((state) => ({...state}));
  const [selectedTab, setSelectedTab] = useState<"positions"|"orders"|"trades"|"funds">("positions");
  useEffect(() => {
    console.log(selected);
  },[selected])


  useEffect(() => {
    console.log("info : ",selectedTab);
  },[selectedTab])
   
  return (
    <div className='text-white flex flex-col'>
    <Mtm />
    <AccountSelection />
    <TabSelection selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
    <TabContent   selectedTab={selectedTab} />
    </div> 
  )
}

export default React.memo(info);
