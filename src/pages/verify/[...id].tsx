import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useLanguage } from "../../store/store";



const Verify  = () => {
    

    const router=useRouter()
    const id=router.query.id
    const verify=trpc.verfy.verify.useMutation()
    const Language=useLanguage()
 
    useEffect(()=>{
       if(typeof window != 'undefined'){if(!id){
        return
       }else{
        const hashedId=router.asPath.replace('/verify/','')
        verify.mutate({hashedId})
       }}

    },[id])
 
console.log(verify.data)

    return ( <div className="py-10">
        <h1 className="text-center text-2xl md:text-3xl">{Language.lng=='ENG'?'Email verification':"Verification de l'email "}</h1>
        {verify.isLoading&&<p className="text-center">{Language.lng=='ENG'?'Please wait while we verify your email':'Patienter pendant que nous verifions votre email '}</p>}
        {verify.isError&&<p className="text-center mt-10">{verify.error.message}</p>}
        {verify.data&&<div className="text-center">
            <p className="mt-5">{Language.lng=='ENG'?'Your email is now verified ':'Votre email est verifié'} </p> 
            <button className=" mx-10 p-1 rounded-md bg-primary1 mt-5" >{Language.lng=='ENG'?'Login':"S'identifier"}</button>
        </div>}
    </div> );
}
 
export default Verify ;