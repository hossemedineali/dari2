import { useLanguage } from "../../store/store";
import {useForm} from 'react-hook-form'
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "../../utils/trpc";
import { useEffect, useState } from "react";
import { Loader } from "../ui/loader";
import { isError } from "@tanstack/react-query";


const schema=z.object({
    email:z.string()
    .min(1,{message:'filed required'})
    .email({message:'please enter a valid email'}),
})

type Schema=z.infer<typeof schema>

const ResetPassWord = () => {

    const reset=trpc.reset.sendResetEmail.useMutation()
    const Language=useLanguage()
    const [customError,setCustomError]=useState({isEror:false,eng:'',fr:''})


    const {register,handleSubmit,formState:{errors}}=useForm<Schema>({
        resolver:zodResolver(schema)
    })
    
    const submit=(data:Schema)=>{
        setCustomError({isEror:false,eng:'',fr:''})
        reset.mutate({...data})
    }
    
    useEffect(()=>{
        
                    if(reset.error?.message=='not found'){
                        setCustomError({isEror:true,eng:'Email not found',fr:"email n'existe pas"})
                        return
                    }else   if(reset.isError) {
                        setCustomError({isEror:true,eng:'Somthing went wrong',fr:"Quelque chose s'est mal passé"})
                        return
                    }
               

    },[reset.isSuccess,reset.error])


    
      

return ( <div className="w-full flex flex-col py-5 gap-3 relative justify-center ">
    <h1 className="text-center text-2xl font-semibold">{Language.lng=='ENG'?'Reset Password':'Réinitialiser le mot de passe'}</h1>

            {!reset.isSuccess&&<form className="flex flex-col gap-5" onSubmit={handleSubmit(submit)}>
                <label htmlFor="email" className={`${errors.email?'text-red':''}`}>
                    {Language.lng=='ENG'?'Enter your email':'Entrer votre email'}

                </label>
                    <input {...register('email')} type='email' id="email" 
                    className="w-full px-4 border-2 border-devider rounded-md h-8 "
                    />
                    {customError.isEror&&<p className="text-red text-lg text-center">{Language.lng=='ENG'?customError.eng:customError.fr}</p>}
                        <button  className=" mx-10 p-1 rounded-md bg-primary1  ">{!reset.isLoading?(Language.lng=='ENG'?'Confirm':' confirmer'):<Loader/>}</button>

            </form>}

            {reset.isSuccess&&<p className="text-center text-primary1 font-bold">{Language.lng=='ENG'?'Please check your email for password rest Link ':'S.V.P consulter votre email pour un lien de reinitialisation'}</p>}
    </div> );
}
 
export default ResetPassWord;