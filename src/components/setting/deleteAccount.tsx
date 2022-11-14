import { useLanguage } from "../../store/store";
import {useForm} from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { Loader } from "../auth/singup";
import { trpc } from "../../utils/trpc";
import { signOut } from "next-auth/react";

const schema=z.object({
    password:z.string().min(1,{message:'required'})
})

type Schema =z.infer<typeof schema>

const DelteAccount = () => {

    const Delete=trpc.updateUser.deleteAccount.useMutation()
    
    const [showPassword,setShowPassword]=useState(false)
    const [customeMessage,setCostumeMessage]=useState({iserror:false,eng:'',fr:''})

    const { register, handleSubmit,reset, formState: { errors } }=useForm<Schema>({
        resolver:zodResolver(schema)
    })
    const submit  = handleSubmit(async(data) => {
    
        Delete.mutate({...data})
      
      });

      useEffect(()=>{
        if(Delete.error?.message=='wrong password'){
            setCostumeMessage({iserror:true,eng:'wrong password',fr:'mot de passe incorrect'})
            return
        }else if(Delete.isError){
            setCostumeMessage({iserror:true,eng:'sorry somthing went wrong',fr:"désolé quelque chose s'est mal passé"})

        }
        if(Delete.isSuccess){
            signOut()
        }
        
      },[Delete.isSuccess,Delete.error])


    const Language=useLanguage()
    return ( <div className="px-4  ">
                <h1 className="text-2xl font-medium pl-4">{Language.lng=='ENG'?'Delete account':'Supprimer votre compte'}</h1>

                    <form onSubmit={(submit)}  className=" md:w-96 md:mx-auto mt-10 flex flex-col ">

                        <label  htmlFor="password" className={`md:text-xl relative ${errors.password?'text-red':''}`} > {Language.lng=="ENG"?'Confirm your password ':'Confirmer votre mot de pass'}
                            <input {...register('password')} type={showPassword?'password':'text'} id="password" className="w-full px-4 border-2 border-devider rounded-md  h-8 "/>
                            <div onClick={()=>setShowPassword(!showPassword)} className="absolute right-5 top-6 md:top-7">
                            {showPassword&&<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg>
                            }
                                    {!showPassword&&<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            }
                        </div>  
                            {customeMessage.iserror&&<p className="text-red">{Language.lng=='ENG'?customeMessage.eng:customeMessage.fr}</p>}
                            
                        </label>
                <p className="text-red font-bold mt-10">{Language.lng=='ENG'?"are you sure you want to delete your account":"Êtes-vous sûr de vouloir effacer votre compte"} ?</p>

                <button className="my-4 min-w-max p-1 rounded-md bg-primary1 active:scale-95" >{!Delete.isLoading?Language.lng=='ENG'?"Delete my account":"Supprimer mon compte":<Loader/>}</button>

                    </form>

    </div> );
}
 
export default DelteAccount;