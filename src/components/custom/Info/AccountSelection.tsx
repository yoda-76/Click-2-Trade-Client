import useAccountStore from '@/store/accountStore';
// import React from 'react'
import '../../../App.css'
export default function   AccountSelection() {
  const {master, child, setSelectedAccount}:{master: any, child: any[], setSelectedAccount: (data: any) => void} = useAccountStore((state) => ({...state}));

    console.log(child);
  return (
    <div className='flex glass1 mt-2 p-2 rounded-lg justify-between'>
        <div className='font-bold' onClick={()=>{setSelectedAccount(`MASTER:${master.id}`)}}>{"MASTER"}</div>
        {
          child&&child.map((v:any,i:number)=>{
            console.log(v);
            if(v.active)return (
              <div key={i} onClick={()=>{
                setSelectedAccount(`CHILD:${v.id}`)
              }} >{v.name_tag}</div>
            )
          })
        }
    </div>
  )
}
