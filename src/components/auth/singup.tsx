import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {  useState } from "react";
import { useLanguage, useSignInModal } from "../../store/store";
import { trpc } from "../../utils/trpc";

import loader from '../../../public/rings.svg'




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
  

  const [customerror,setcustomerror]=useState('')


  const [step,setstep]=useState<number>(1)
  const [email,setemail]=useState('')
  
  const adduser=trpc.adduser.adduser.useMutation()


  
  
  const Language=useLanguage()
  const SignInModal=useSignInModal()

  //------------------------------------------
  
  


    

  const {setValue, register,getValues, handleSubmit ,setError,formState:{errors,isValid,isDirty,isSubmitted}} = useForm<Schema>({
   
    resolver: zodResolver(schema)
  });


  const onSubmit =async(data: Schema) => {
       const user= adduser.mutate({ 
        name:data.firstName + ''+ data.lastName,
        email:data.email,
        phone:data.phone,
        password:data.password})
  };




  return (
    <div className="w-full flex flex-col gap-3 relative ">
    <h1 className="text-center text-2xl font-medium">{Language.lng=='ENG'?'Create an account':'Crée un compte'} </h1>
    
    {step==1&&<FirstStep setstep={setstep} setemail={setemail}/>}
    {step==2&&<MiddleStep email={email}  setstep={setstep} />}
    {step==3&&<SecondStep/>}
  

  
     
 {step==1&&   <div className="flex gap-4">
    <h5>{Language.lng=='ENG'?'Already have an account ?':'Deja inscrit ?'} </h5>
    <button  onClick={()=>SignInModal.togglemode()}  className="text-smallText underline underline-offset-2" >{Language.lng=='ENG'?'Log in':'Identifier vous'}</button>
    </div>}

    <h5 className="text-red">{customerror}</h5>
</div>
  );
};





//--------------------------First Step----------------------------------------



const step1 = z.object({
  
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

type Step1=z.infer<typeof step1>

type Props={
  setstep: (value:number)=>void
  setemail:(value:string)=>void

}

    const FirstStep:React.FC<Props>=({setstep,setemail}:Props)=>{

      
      //const checkemail=trpc.adduser.checkemail.useQuery({email})
      const Language=useLanguage()

  
  const { register,getValues, handleSubmit ,setError,formState:{errors,isValid,isDirty,isSubmitted}} = useForm<Step1>({
   
    resolver: zodResolver(step1)
  });

  const onSubmit= async(data:Step1)=>{
    setemail(data.email)
      setstep(2)

   
  }


  return <form  onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center gap-1">

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

 <button className="mx-5 p-1  rounded-md bg-primary1 disabled:opacity-60"  disabled={!isDirty && !isValid}>{Language.lng=='ENG'?'Next':'Suivant' }</button>

    </form>
  
}



//--------------------------Second Step----------------------------------------



const step2=z.object({
  firstName:z.string()
            .min(1,{message:'field required'})
            .min(3,{message:'first name must be longer than 3 charachters'})
            .max(20,{message:'First name must be less than 20 charachters'}),
    lastName:z.string()
            .min(1,{message:'field required'})
            .min(3,{message:'first name must be longer than 3 charachters'})
            .max(20,{message:'First name must be less than 20 charachters'}),
    phone:z.string().optional(),

})

type Step2=z.infer<typeof step2>

const SecondStep=()=>{
  const Language=useLanguage()

  
  const { register,getValues, handleSubmit ,setError,formState:{errors,isValid,isDirty,isSubmitted}} = useForm<Step2>({
   
    resolver: zodResolver(step1)
  });

  const onSubmit=(data:Step2)=>{

    console.log(data)
  }

  return <form     onSubmit={handleSubmit(onSubmit)} 
  >

    {/* First NAme and last name */}
   
         <div className="flex flex-col gap-2 justify-between">
                  <div className="flex   flex-col  leading-3">

                  <label htmlFor="firstName" className="text-left">{Language.lng=='ENG'?'First name':'Nom'} </label><br/>
                        <input {...register("firstName", {required:true,})} type='text'  id="firstName" name="firstName"  placeholder="Enter you first name" 
                  className="w-full px-4 border rounded-md  h-8 "/>
                    {errors.firstName?.message&&<p className="text-red text-start mt-1">{errors.firstName?.message}</p>}


                  </div>
                  <div className="border-b-2 border-devider  my-2"></div>

                                    {/* Last Name Input */}

                  <div className="flex  flex-col leading-3">

                    <label htmlFor="lastName" className="text-left">{Language.lng=='ENG'?'Last name':'Prénom'} </label><br/>
                    <input {...register("lastName")} type='text' id="lastName" name="lastName"  placeholder="Enter you last name  "  
                    className="w-full px-4 border rounded-md h-8 "/>
                    {errors.lastName?.message&&<p className="text-red text-start mt-1">{errors.lastName.message}</p>}
                    </div>
        </div>
        <div className="border-b-2 border-devider  my-2"></div>
                    
        

                          {/* Phone num Input */}

              
              <div className="flex  flex-col leading-3">

                <label htmlFor="phone" className="text-left">{Language.lng=='ENG'?'Phone number':'Numéro du télephone'}  </label><br/>
                <input {...register("phone")} type='tel' id="phone" name="phone" pattern="[0-9]{8}"   placeholder=" phone number  ex:22000000 "  
                className="w-full px-4 border rounded-md h-8 "/>

                </div>
                <div className="border-b-2 border-devider  my-2"></div>

                <button className="mx-10 p-1  rounded-md bg-primary1 disabled:opacity-60"  disabled={!isDirty && !isValid}>{Language.lng=='ENG'?'Sign up':'Inscrir'}</button>

              
  </form>


}




type middleStepProps={
  email:string,
  setstep:(value:number)=>void
}


const MiddleStep:React.FC<middleStepProps>=({email,setstep})=>{
  const SignInModal=useSignInModal()

  const Language=useLanguage()
  const checkemail= trpc.adduser.checkemail.useQuery({email})

  console.log(checkemail.data?.email)

  if(!!!checkemail.data?.email){
    setstep(3)
  }
  else{

  }

  return <div>
    {checkemail.isLoading &&<img src={loader.src} className='bg-devider w-20   h-20 m-auto mt-20 '/>}
    {checkemail.data&&<div className="flex flex-col justify-center gap-10 p-auto">
      <p className="text-2xl text-red text-center"> {Language.lng=='ENG'?'Email already exist!':'Cette adresse e-mail est déjà utilisée'}</p>
     
        <button onClick={()=>SignInModal.togglemode()} className="mx-10 p-1  rounded-md bg-primary1 disabled:opacity-60">{Language.lng=='ENG'?'Login':'Identifier vous'}</button>
       <p className="text-xl  mx-auto ">OR</p>
        <p className="text-xl text-smallText mx-auto cursor-pointer">{Language.lng=='ENG'?'Sign up with different email':'Enregistrer avec un autre adresse email'}</p>
      
      </div>}
  </div>
}


export default SignUp;
