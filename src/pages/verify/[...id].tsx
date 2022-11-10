import { trpc } from "../../utils/trpc";

import { useRouter } from "next/router";
import { useEffect } from "react";
import { isGeneratorFunction } from "util/types";

import router from 'next/router';


const Verify  = () => {
    

    const router=useRouter()
    const id=router.query.id
    console.log(router.asPath.replace('/verify/',''))
    const verify=trpc.verfy.verify.useMutation()
 
    useEffect(()=>{
       if(typeof window != 'undefined'){if(!id){
        return
       }else{
        let hashedId=''
        console.log(id)
        if(id.length==1){
            hashedId=id.toString()

        }else{
            for(let i=0;i<id.length;i++){
                hashedId+=id[i]
                if(i<id.length-1){
                    hashedId+='/'
                }
            }
        }
        verify.mutate({hashedId:router.asPath.replace('/verify/','')})
       }}

    },[id])
 
console.log(verify.data)

    return ( <div className="py-10">
        <h1 className="text-center text-2xl md:text-3xl">Email verification</h1>
        {verify.isLoading&&<p className="text-center">Please wait while we verify your email</p>}
        {verify.isError&&<p className="text-center mt-10">{verify.error.message}</p>}
        {verify.data&&<div><p>Your email is now verified </p>
            <button>Login to your account</button>
        </div>}
    </div> );
}
 
export default Verify ;