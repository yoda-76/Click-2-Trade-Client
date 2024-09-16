import useAccountStore from '@/store/accountStore';
// import React from 'react'

export default function   AccountSelection() {
  const {master, child, setSelectedAccount}:{master: any, child: any[], setSelectedAccount: (data: any) => void} = useAccountStore((state) => ({...state}));

    console.log(child);
  return (
    <div className='flex gap-2 pt-1'>
        <div className='w-20 border-2 px-2 py-1 rounded-sm border-white' onClick={()=>{setSelectedAccount(`MASTER:${master.u_id}`)}}>{"MASTER"}</div>
        {
          child&&child.map((v:any,i:number)=>{
            console.log(v);
            if(v.active)return (
              <div className='w-20 border-2 px-2 py-1 rounded-sm border-amber-300 text-amber-300' key={i} onClick={()=>{
                setSelectedAccount(`CHILD:${v.id}`)
              }} >{v.name_tag}</div>
            )
          })
        }
    </div>
  )
}
