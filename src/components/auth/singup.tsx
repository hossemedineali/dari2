import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { useLanguage, useSignInModal } from "../../store/store";

//import {trpc} from '../../utils/trpc'

//import { Useauth } from "../../store/store";
//import React, { useEffect, useState } from "react";


const schema = z.object({
    firstName:z.string()
            .min(1,{message:'field required'})
            .min(3,{message:'first name must be longer than 3 charachters'})
            .max(20,{message:'First name must be less than 20 charachters'}),
    lastName:z.string()
            .min(1,{message:'field required'})
            .min(3,{message:'first name must be longer than 3 charachters'})
            .max(20,{message:'First name must be less than 20 charachters'}),
    phone:z.string().optional(),
    email:z.string()
            .min(1,{message:'field required'})
            .email({message:'please enter a valid email'}),
    password:z.string()
            .min(1,{message:'field required'})
            .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,{message:'Minimum eight characters, at least one letter and one number:'}),
    confpassword:z.string()
            .min(1,{message:'field required'})


}).refine((data) => data.password === data.confpassword, {
  message: "Passwords don't match",
  path: ["confpassword"]
}).refine((data) => data.password === data.confpassword, {
  message: "Passwords don't match",
  path: ["confpassword"]
})




type Schema = z.infer<typeof schema>;



const SignUp= () => {
  
  const [phonenum, setphonenum] = useState(100)

  const [customerror,setcustomerror]=useState('')

  const Language=useLanguage()
  const SignInModal=useSignInModal()
  console.log(SignInModal.mode)

  //------------------------------------------
  
  


    

  const { register, handleSubmit ,setError,formState:{errors,isValid,isDirty,isSubmitted}} = useForm<Schema>({
   
    resolver: zodResolver(schema)
  });



  const onSubmit =async(data: Schema) => {
        console.log(data)
  };



  return (
    <div className="w-full flex flex-col gap-3 relative ">
    <h1 className="text-center">{Language.lng=='ENG'?'Create account':'Crée un compte'} </h1>
 
    <form
        className="flex flex-col justify-center gap-1"
    onSubmit={handleSubmit(onSubmit)} 
    >
      
       {/* First NAme and last name */}
          <div className="flex gap-2 justify-between">
                  <div className="flex   flex-col  leading-3">

                  <label htmlFor="firstName" className="text-left">{Language.lng=='ENG'?'First name':'Nom'} </label><br/>
                        <input {...register("firstName", {required:true,})} type='text'  id="firstName" name="firstName"  placeholder="Enter you first name" 
                  className="w-full px-4 border rounded-md  h-8 "/>
                    {errors.firstName?.message&&<p className="text-red text-start mt-1">{errors.firstName?.message}</p>}


                  </div>
    
                                    {/* Last Name Input */}

                  <div className="flex  flex-col leading-3">

                    <label htmlFor="lastName" className="text-left">{Language.lng=='ENG'?'Last name':'Prénom'} </label><br/>
                    <input {...register("lastName")} type='text' id="lastName" name="lastName"  placeholder="Enter you last name  "  
                    className="w-full px-4 border rounded-md h-8 "/>
                    {errors.lastName?.message&&<p className="text-red text-start mt-1">{errors.lastName.message}</p>}
                    </div>
                    <div className="border-b-2 border-devider  my-2"></div>
        </div>
        <div className="border-b-2 border-devider  my-2"></div>

                          {/* Phone num Input */}

                <div className="flex  flex-col leading-3">

                <label htmlFor="phone" className="text-left">{Language.lng=='ENG'?'Phone number':'Numéro du télephone'}  </label><br/>
                <input {...register("phone")} type='tel' id="phone" name="phone" pattern="[0-9]{8}"   placeholder=" phone number  ex:22000000 "  
                className="w-full px-4 border rounded-md h-8 "/>
                {errors.email?.message&&<p className="text-red text-start mt-1">{errors.email.message}</p>}
                </div>
                <div className="border-b-2 border-devider  my-2"></div>

                         {/* Email Name Input */}

         <div className="flex  flex-col leading-3">

         <label htmlFor="email" className="text-left">Email  </label><br/>
         <input {...register("email")} type='email' id="email" name="email"  placeholder="Enter you Email  "  
         className="w-full px-4 border rounded-md h-8 "/>
         {errors.email?.message&&<p className="text-red text-start mt-1">{errors.email.message}</p>}
         </div>
         <div className="border-b-2 border-devider  my-2"></div>


                          {/* Password Input */}

                          <div className="flex  flex-col leading-3">

        
       <label htmlFor="password" className="text-left">{Language.lng=='ENG'?'Password':'Mot de passe'} </label><br/>
              <input {...register("password", {required:true,})} type='text'  id="password" name="password"  placeholder="Enter you first name" 
       className="w-full px-4 border rounded-md  h-8 "/>
          {errors.password?.message&&<p className="text-red text-start mt-1">{errors.password?.message}</p>}
          </div>
          <div className="border-b-2 border-devider  my-2"></div>


                          {/* Confirm Password Input */}

                          <div className="flex  flex-col leading-3">

          <label htmlFor="confpassword" className="text-left">{Language.lng=='ENG'?'Confirm password':'Confirmr mot de passe'}  </label><br/>
          <input 
          {...register("confpassword")}
          type='text' id="confpassword" name="confpassword"  placeholder=" confirm your password  "  
          className="w-full px-4 border rounded-md h-8 "/>
          {errors.confpassword?.message&&<p className="text-red text-start mt-1">{errors.confpassword.message}</p>}
          </div>
          <div className="border-b-2 border-devider  my-2"></div>

        



        <button className="mx-10 p-1  rounded-md bg-primary1 disabled:opacity-60"  disabled={!isDirty && !isValid}>{Language.lng=='ENG'?'Sign up':'Inscrir'}</button>

    </form>
    <div className="flex gap-4">
    <h5>{Language.lng=='ENG'?'Already have an account ?':'Deja inscrit ?'} </h5>
    <button  onClick={()=>SignInModal.togglemode()}  className="text-smallText underline underline-offset-2" >{Language.lng=='ENG'?'Log in':'Identifier vous'}</button>

    </div>
    <h5 className="text-red">{customerror}</h5>
</div>
  );
};

export default SignUp;
