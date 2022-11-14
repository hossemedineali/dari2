import { useLanguage } from "../../store/store";
import {useForm} from 'react-hook-form'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "../../utils/trpc";
import { useEffect, useState } from "react";
import { Loader } from "../ui/loader";
import { useNotifiaction } from "../../store/notification";
import PreviousMap from "postcss/lib/previous-map";


const schema=z.object({
    oldPassword:z.string({required_error:'required'}).min(1,{message:'field required'}),
    password:z.string()
            .min(1,{message:'field required'})
            .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,{message:'Minimum eight characters, at least one letter and one number:'}),
    confpassword:z.string()
            .min(1,{message:'field required'})
    
}).refine((data) => data.password === data.confpassword, {
    message: "Passwords don't match",
    path: ["confpassword"]
  })
  
  type Schema=z.infer<typeof schema>

  const Password = () => {
    const notification=useNotifiaction()
    const Language=useLanguage()
    const [customeMessage,setCostumeMessage]=useState({iserror:false,eng:'',fr:''})
    const updatePassword=trpc.updateUser.updatePassword.useMutation()
    const { register, handleSubmit,setError,reset, formState: { errors } } =useForm<Schema>({
        resolver:zodResolver(schema)
    })

    const submit=async(data:Schema)=>{

        
           
       updatePassword.mutate({...data})

        
    }

    useEffect(()=>{

        if(updatePassword.error?.message=='wrong password'){
            
            setCostumeMessage({iserror:true,eng:'Wrong password',fr:'Mot de pass incorrect'})
            return
        }else if(updatePassword.error){
            notification.toggleShow(true)
            notification.setMeassage('Sorry somthing went wrong',"désolé quelque chose s'est mal passé",false)
            return
        }
        
        if(updatePassword.isSuccess &&!updatePassword.isLoading){
            setCostumeMessage({iserror:false,eng:'',fr:''})
            
            notification.toggleShow(true)
            notification.setMeassage('password changed successfully','votre mot de passe a bien été modifié ',true)
            reset()
        }
        
    },[updatePassword.error,updatePassword.isLoading,updatePassword.isSuccess])

    return ( <div>
        
            <h2 className="text-2xl font-medium pl-4">{Language.lng=='ENG'?'Change password':'Changer le mot de passe'}</h2>

                <form onSubmit={handleSubmit(submit)} className="mt-10 md:px-[15%] lg:px-[25%] xl:text-xl  flex flex-col gap-3">

                    <label htmlFor="oldPassword" className=" md:w-1/2">{Language.lng=='ENG'?'Old password':'Ancien mot de passe'}
                        <input {...register('oldPassword')} id="oldPassword"  type='password'  className="w-full px-4 border-2 border-devider rounded-md  h-8 " />
                            {errors.oldPassword&&<p className="text-red">{errors.oldPassword?.message}</p>}
                         </label>



                     <label htmlFor="newPassWord" className=" md:w-1/2">{Language.lng=='ENG'?'New password':'Nouveau mot de passe'}
                        <input {...register('password')} id="newPassWord"  type='password'  className="w-full px-4 border-2 border-devider rounded-md  h-8 " />
                        {errors.password&&<p className="text-red">{errors.password?.message}</p>}
                     </label>



                     <label htmlFor="confPassword" className=" md:w-1/2">{Language.lng=='ENG'?'Confirm password':'confirmer le mot de passe'}
                        <input {...register('confpassword')} id="confPassword"  type='password'  className="w-full px-4 border-2 border-devider rounded-md  h-8 " />
                        {errors.confpassword&&<p className="text-red">{errors.confpassword?.message}</p>}
                     </label>

                    {customeMessage.iserror&&<p className="text-center font-bold text-red">{Language.lng=='ENG'?customeMessage.eng:customeMessage.fr}</p>}
                    <button className="mx-10 sm:m-auto md:mt-20 md:px-20  sm:w-max p-1 rounded-md bg-primary1 active:scale-95 " type="submit">{updatePassword.isLoading?<Loader/>:'submit'}</button>
               
                    
                </form>
    </div> );
}
 
export default Password;