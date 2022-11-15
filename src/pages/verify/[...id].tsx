import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useLanguage, useSignInModal } from "../../store/store";



const Verify  = () => {
    

    const router=useRouter()
    const id=router.query.id
    const verify=trpc.verfy.verify.useMutation()
    const Language=useLanguage()
    const signInmodal=useSignInModal()
 
    useEffect(()=>{
       if(typeof window != 'undefined'){if(!id){
        return
       }else{
        const hashedId=router.asPath.replace('/verify/','')
        verify.mutate({hashedId})
       }}

    },[id])


 
  const hundelSignIn=()=>{
        signInmodal.toggleShow()
        router.push('/')
  }
    return ( <div className="py-10">
        <h1 className="text-center text-2xl md:text-3xl mb-10">{Language.lng=='ENG'?'Email verification':"Verification de l'email "}</h1>
        {verify.isLoading&&<p className="text-center text-2xl">{Language.lng=='ENG'?'Please wait while we verify your email':'Patienter pendant que nous verifions votre email '}</p>}
        {verify.isError&&<p className="text-center mt-10 text-2xl">{verify.error.message}</p>}
        {verify.data&&<div className="text-center">
            <p className="mt-5 text-2xl">{Language.lng=='ENG'?'Your email is now verified ':'Votre email est verifié'} </p> 
            <button onClick={hundelSignIn}  className=" mx-10 p-1 rounded-md bg-primary1 mt-5" >{Language.lng=='ENG'?'SignIn':"S'identifier"}</button>
        </div>}
    </div> );
}
 
export default Verify ;