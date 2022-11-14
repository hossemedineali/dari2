import { BlobOptions } from 'buffer'
import create from 'zustand'



interface Notif{
    show:boolean,
   
    message:{
       ENG:string,
       FRA:string,
       success:boolean,
    },
    toggleShow:(x:boolean)=>void
    setMeassage:(eng:string,fr:string,success:boolean)=>void
}

export const useNotifiaction=create<Notif>()(
        (set,get)=>({
            show:false,
            success:true,
            message:{
                ENG:'',
                FRA:'',
                success:true,
             },
            toggleShow:(x)=>set({show:x}),
            setMeassage:(x,y,z)=>set({message:{ENG:x,FRA:y,success:z}})
        })
)
