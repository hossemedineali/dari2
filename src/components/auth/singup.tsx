import { useForm,UseFormSetValue, UseFormGetValues} from "react-hook-form";
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
  


  
  
  const Language=useLanguage()
  const SignInModal=useSignInModal()

  //------------------------------------------
  
  


    

  const {setValue,getValues, handleSubmit ,setError,formState:{errors,isValid,isDirty,isSubmitted}} = useForm<Schema>({
   
    resolver: zodResolver(schema)
  });


  console.log('email: ',getValues().email, 'password :',getValues().password,'conf password :',getValues().confpassword)

  const onSubmit =async(data: Schema) => {


    //console.log('data:',getValues().email,getValues().password,getValues().confpassword,getValues().firstName,getValues().lastName,getValues().phone)
      /*  const user= adduser.mutate({ 
        name:data.firstName + ''+ data.lastName,
        email:data.email,
        phone:data.phone,
        password:data.password}) */
  };




  return (
    <div className="w-full flex flex-col gap-3 relative ">
    <h1 className="text-center text-2xl font-medium">{Language.lng=='ENG'?'Create an account':'Crée un compte'} </h1>
    
    {step==1&&<FirstStep setstep={setstep}  setValue={setValue}/>}
    {step==2&&<MiddleStep email={getValues().email}  setstep={setstep} />}
    {step==3&&<SecondStep getValues={getValues} onSubmit={onSubmit}  setValue={setValue}/>}
  

  
     
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
  setValue: UseFormSetValue<Schema>

}

    const FirstStep:React.FC<Props>=({setstep,setValue}:Props)=>{

      
      //const checkemail=trpc.adduser.checkemail.useQuery({email})
      const Language=useLanguage()

  
  const { register,getValues, handleSubmit ,setError,formState:{errors,isValid,isDirty,isSubmitted}} = useForm<Step1>({
   
    resolver: zodResolver(step1)
  });

  const onSubmit= async(data:Step1)=>{
    setValue('email',data.email)
    setValue('password',data.password)
    setValue('confpassword',data.confpassword)

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


type Props2={
  setValue: UseFormSetValue<Schema>
  onSubmit: (data: Schema) => Promise<void>
  getValues:UseFormGetValues<Schema>
}



const SecondStep:React.FC<Props2>=({setValue,getValues})=>{
  const Language=useLanguage()
  const adduser=trpc.adduser.adduser.useMutation()
  const SignInModal=useSignInModal()


  
  const { register, handleSubmit ,formState:{errors,isValid,isDirty}} = useForm<Step2>({
   
    resolver: zodResolver(step2)
  });

  const Submit=async(data:Step2)=>{

    setValue('firstName',data.firstName)
    setValue('lastName',data.lastName)
    setValue('phone',data.phone)

    adduser.mutate({email:getValues().email,password:getValues().password,name:data.firstName+''+data.lastName,phone:data.phone})
    console.log(adduser)
    if(adduser.data){
      console.log('success')
    }else{
      console.log('error')
    }

    if(adduser.isError){
      console.log("------------is error -----------------")
    }
//    console.log('email :',getValues().email,'password :',getValues().password,' confpassword:',getValues().confpassword,'FirstName :',getValues().firstName,'lastname :',getValues().lastName,'phone :',getValues().phone,)

   // onSubmit(data)

  }

  return <>
 {!adduser.isSuccess&&!adduser.isLoading&&!adduser.isError&& <form onSubmit={handleSubmit(Submit)} >

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

                <label htmlFor="phone" className="text-left">{Language.lng=='ENG'?'Phone number':'Numéro du télephone'} <span className="text-sm text-smallText">({Language.lng=='ENG'?'Will be shown in your announcments':'Sera afficher dans votre annonces'})</span> </label><br/>
                <input {...register("phone")} type='tel' id="phone" name="phone" pattern="[0-9]{8}"   placeholder=" phone number  ex:22000000 "  
                className="w-full px-4 border rounded-md h-8 "/>

                </div>
                <div className="border-b-2 border-devider  my-2"></div>
                <button>submit</button>

                <button  type="submit" className="mx-10 p-1  rounded-md bg-primary1 disabled:opacity-60"  disabled={!isDirty && !isValid}>{Language.lng=='ENG'?'Sign up':'Inscrir'}</button>   
  </form>}

  {adduser.isLoading&&<img src={loader.src} className='m-auto h-20 w-20'/>}
  {adduser.isError&&<p className=" text-center mx-5">sorry!somthing went wrong</p>}

  {adduser.data&&<div className="flex flex-col p-10 justify-center">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 mx-auto mb-5 text-green">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>


     <p className="text-center mb-2"> {Language.lng=='ENG'?'Your account has been created successfully':' Votre compte a été créé avec succès'}</p> 

     <button onClick={()=>SignInModal.togglemode()}  className="bg-primary1 rounded-xl mx-5">{Language.lng=='ENG'?'Login':"S'Identifier"}</button>
     </div>}

                </>

}




type middleStepProps={
  email:string,
  setstep:(value:number)=>void
}


const MiddleStep:React.FC<middleStepProps>=({email,setstep})=>{
  const SignInModal=useSignInModal()

  const Language=useLanguage()

  const checkemail=trpc.adduser.checkemail.useQuery({email})
  console.log(checkemail.data)

  if(checkemail.data==false){
    setInterval(()=>{
      setstep(3)
    },1)
  }

  
  return <div>
    {checkemail.isLoading &&<img src={loader.src} className='bg-devider w-20   h-20 m-auto mt-20 '/>}
    {checkemail.data==true&&<div className="flex flex-col justify-center gap-10 p-auto">
      <p className="text-2xl text-red text-center"> {Language.lng=='ENG'?'Email already exist!':'Cette adresse e-mail est déjà utilisée'}</p>
     
        <button onClick={()=>SignInModal.togglemode()} className="mx-10 p-1  rounded-md bg-primary1 disabled:opacity-60">{Language.lng=='ENG'?'Login':'Identifier vous'}</button>
       <p className="text-xl  mx-auto ">OR</p>
        <p onClick={()=>{setstep(1)}} className="text-xl text-smallText mx-auto cursor-pointer">{Language.lng=='ENG'?'Sign up with different email':'Enregistrer avec un autre adresse email'}</p>
      
      </div>}
  </div>
}


export default SignUp;
