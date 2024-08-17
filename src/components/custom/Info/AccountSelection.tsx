import React from 'react'

export default function AccountSelection(props:any) {
    // console.log(props);
  return (
    <div className='flex justify-between'>
        <div onClick={()=>{props.setSelectedAccount(`MASTER:${props.master.id}`)}}>{"MASTER"}</div>
        {
          props.child&&props.child.map((v:any,i:number)=>{
            return (
              <div key={i} onClick={()=>{
                props.setSelectedAccount(`CHILD:${v.id}`)
              }} >{v.name_tag}</div>
            )
          })
        }
    </div>
  )
}
