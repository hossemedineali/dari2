import { trpc } from "../../utils/trpc";

import { useRouter } from "next/router";
import { useEffect } from "react";



const Verify  = () => {

    const router=useRouter()
    const verify=trpc.verfy.verify.useMutation()
    
   useEffect(()=>{
    if(typeof window !='undefined'){
        if(router.query.id){
            console.log('from use effect', router.query.id)

            console.log(router.query.id[0]+'/'+router.query.id[1])

            const hashedId=router.query.id[0]+'/'+router.query.id[1]
            verify.mutate({hashedId})
            console.log('error:::',verify.error)
        }

    }

   },[])
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