import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLanguage, useSignInModal } from "../../store/store";
import {  signIn } from "next-auth/react"
import { useState } from "react";
import { useRouter } from "next/router";

import { trpc } from "../../utils/trpc";
import { Loader } from "../ui/loader";



const schema = z.object({
  
    email:z.string()
            .min(1,{message:'filed required'})
            .email({message:'please enter a valid email'}),
    password:z.string()
            .min(1,{message:'filed required'})
            .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,{message:'Minimum eight characters, at least one letter and one number:'}),
})

const dic={
  'title':{
    'ENG':"Sing In",
    'FRA':" S'identifier ",
    
  },
  'switchmode':{
    'ENG':'',
    'FRA':'',
  },
  'Email':{
    'ENG':'Email',
    'FRA':'Email',
    
  }
}



type Schema = z.infer<typeof schema>;



const SignIn= () => {

    const Language=useLanguage()

    const verify=trpc.verfy.SendEmail.useMutation()

  

    const SignInModal=useSignInModal()
    const router=useRouter()
    const [customError,setCustomError]=useState('')

    const [signUpIsLoading,setSignUpIsLoading]=useState(false)
    const [showPassword,setShowPassword]=useState(false)
    


    


  const { register, handleSubmit ,getValues,formState:{errors}} = useForm<Schema>({
    resolver: zodResolver(schema)
  });



  const onSubmit = (data: Schema) => {
    setSignUpIsLoading(true);
    
     (signIn('credentials',{
      redirect:false,
      callbackUrl:'/',
      email:data.email,
      password:data.password
      
    }).then(res=>{
   
      if(res?.error){
        setCustomError(res.error)
        setSignUpIsLoading(false)
      }
      else{
        SignInModal.toggleShow()
        router.push('/')

      }
    })).catch(err=>{
      setCustomError(err.error)

    
    })
  };


  const resendVerificationEmail=()=>{
    verify.mutate({email:getValues().email})
    
  }
  return (
    <div className="w-full flex flex-col gap-3 relative justify-center">
      
    <h1 className="text-center text-2xl font-semibold">{Language.lng=='ENG'?dic.title.ENG:dic.title.FRA} </h1>
 
    {customError!='Email not verified'&&!signUpIsLoading&&<><form
    className="flex flex-col justify-center gap-3"
    onSubmit={handleSubmit(onSubmit)} 
    >
      
  


                         {/* Email Name Input */}

         <div className="flex  flex-col leading-3 px-1 ">

         <label htmlFor="email" className="text-left">{dic.Email.ENG}  </label><br/>
         <input {...register("email")} type='text' id="email" name="email"    
         className="w-full px-4 border-2 border-devider rounded-md h-8 "/>
         {errors.email?.message&&<p className="text-red text-start mt-1">{errors.email.message}</p>}
         </div>


                          {/* Password Input */}

                          <div className="flex  flex-col leading-3 relative px-1">

        
       <label htmlFor="Password" className="text-left ">{Language.lng=='ENG'?'Password':'Mot de passe'} </label><br/>

       <div className=" flex">

        <input {...register("password", {required:true,})} type={showPassword?'text':'password'}  id="Password" name="password"   className="w-full px-4 border-2 border-devider rounded-md  h-8 "/>
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

      {customError&&<p className="text-red text-center">{customError}</p>}
        <button  className=" mx-10 p-1 rounded-md bg-primary1  ">{Language.lng=='ENG'?dic.title.ENG:dic.title.FRA}</button>

    </form>
        <button onClick={()=>SignInModal.togglemode('Reset')}> {Language.lng=='ENG'?'Forget password?':'Mot de passe oubliée ?'}</button>
    

    
    <div className="flex gap-4">
    
    <button  onClick={()=>SignInModal.togglemode('SignUp')}  className="text-smallText mx-auto underline underline-offset-2">{Language.lng=='ENG'?'Create new account':'Créer nouveau compte'}</button>

    </div></>}

    {customError=='Email not verified'&&<div className="flex flex-col justify-center items-center gap-3">
        <h3 className="text-red text-lg ">{Language.lng=='ENG'?'Email not verified':'Email non vérifié'} ...</h3>
        <p>{Language.lng=='ENG'?'Please check your email for verification link':'consulter votre courrier pour le lien de verification'}</p>
        <p onClick={resendVerificationEmail} className="font-medium cursor-pointer underline	"> {Language.lng=='ENG'?'Resend verification email?':`renvoyer l'email d'activation?`}</p>
        {verify.isLoading&&<p>Sending email...</p>}
        {verify.data&&<p>email sent seccesfuly please check you inbox</p>}
        </div>}
      {signUpIsLoading&&<Loader/>}
</div>
  );
};

export default SignIn;
