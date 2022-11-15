import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLanguage, useSignInModal } from "../../store/store";
import { z } from "zod";
import {useForm} from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "../../components/ui/loader";
import { useNotifiaction } from "../../store/notification";

const schema=z.object({
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

const Reset  = () => {
    


    const router=useRouter()
    const id=router.query.id
    const rest=trpc.reset.ResetPassWord.useMutation()
    const Language=useLanguage()
    const signInmodal=useSignInModal()
    const notification=useNotifiaction()

    const [showPassword,setShowPassword]=useState(false)
    const [showConfPassword,setShowConfPassword]=useState(false)
    const [customeMessage,setCostumeMessage]=useState({iserror:false,eng:'',fr:''})

    const {register,handleSubmit ,formState:{errors}}=useForm<Schema>({
        resolver:zodResolver(schema)
    })

    const submit=(data:Schema)=>{
            rest.mutate({password:data.password,confpassword:data.confpassword,hashedId:id as string})
    }
 
    useEffect(()=>{
   
      if(rest.isSuccess){
        
        notification.setMeassage('Password reset done ! you can now login with your new password ','votre mot de pass à été Reinitialiser ! vous pouvez connecter avec votre nouveau mot de passe',true)
        notification.toggleShow(true)

        router.push('/')
      }
      if(rest.error?.message=='Invalid token'){
        notification.setMeassage('Ops somthing went wrong please try again later','quelque chose a mal passé svp reessayer plus tard',false)
        notification.toggleShow(true)
      }

    },[rest.error,rest.isSuccess])

  const hundelSignIn=()=>{
        signInmodal.toggleShow()
        router.push('/')
  }
    return ( <form className="py-10 sm:px-10 px-3 text-center " onSubmit={handleSubmit(submit)}>
        <h1 className="text-center text-2xl md:text-3xl mb-10">{Language.lng=='ENG'?'Reset password':"Reinitialiser mot de passe "}</h1>
       
         <div className="flex  flex-col leading-3 md:w-96  mx-auto relative" >


  <label htmlFor="Password" className="text-left">{Language.lng=='ENG'?'Password':'Mot de passe'} </label><br/>
      
      <div className="flex">

      <input {...register("password", {required:true,})} type={showPassword?'text':"password"}  id="Password" name="password"  placeholder="Enter you first name" 
        className="w-full px-4 border rounded-md  h-8 "/>
        <div onClick={()=>setShowPassword(!showPassword)} className="absolute  right-1">
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
  </div>

  {errors.password?.message&&<p className="text-red text-start mt-1">{errors.password?.message}</p>}
  </div>
  <div className="border-b-2 border-devider md:w-96  mx-auto my-2"></div>


                  {/* Confirm Password Input */}

    <div className="flex  flex-col leading-3 md:w-96  mx-auto relative">

      <label htmlFor="confpassword" className="text-left">{Language.lng=='ENG'?'Confirm password':'Confirmr mot de passe'}  </label><br/>
        <div className="flex">

      <input 
      {...register("confpassword")}
      type={showConfPassword?'text':"password"} id="confpassword" name="confpassword"  placeholder=" confirm your password  "  
      className="w-full px-4 border rounded-md h-8 "/>
      <div onClick={()=>setShowConfPassword(!showConfPassword)} className="absolute  right-2">
            {showConfPassword&&<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
  </svg>
  }
          {!showConfPassword&&<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
  }
              </div>  
      </div>
      
      {errors.confpassword?.message&&<p className="text-red text-start mt-1">{errors.confpassword.message}</p>}
  </div>

  <button className="  mt-20  w-full md:w-96  p-1 rounded-md bg-primary1 active:scale-95 " type="submit">{rest.isLoading?<Loader/>:(Language.lng=='ENG'?'Confirm':'Confirmer')}</button>

    </form> );
}
 
export default Reset ;