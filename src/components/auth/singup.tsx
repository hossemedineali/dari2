  import { useForm,UseFormSetValue, UseFormGetValues} from "react-hook-form";
  import { zodResolver } from "@hookform/resolvers/zod";
  import  z from "zod";
  import {  useState } from "react";
  import { useLanguage, useSignInModal } from "../../store/store";
  import { trpc } from "../../utils/trpc";

  import loader from '../../../public/rings.svg'
import { Loader } from "../ui/loader";


 



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
  })




  type Schema = z.infer<typeof schema>;



  const SignUp= () => {
    




    const [step,setstep]=useState<number>(1)
  
    


    
    
    const Language=useLanguage()
    const SignInModal=useSignInModal()

    //------------------------------------------
    
    


      

    const {setValue,getValues} = useForm<Schema>({
    
      resolver: zodResolver(schema)
    });


    console.log('email: ',getValues().email, 'password :',getValues().password,'conf password :',getValues().confpassword)

    




    return (
      <div className="w-full flex flex-col gap-3 relative ">
      
      <h1 className="text-center text-2xl font-medium">{Language.lng=='ENG'?'Create an account':'Crée un compte'} </h1>
      
      {step==1&&<FirstStep setstep={setstep}  setValue={setValue}/>}
      {step==2&&<MiddleStep email={getValues().email}  setstep={setstep} />}
      {step==3&&<SecondStep getValues={getValues}   setValue={setValue}/>}
    

    
      
  {step==1&&   <div className="flex gap-4">
      <h5>{Language.lng=='ENG'?'Already have an account ?':'Deja inscrit ?'} </h5>
      <button  onClick={()=>SignInModal.togglemode('SignIn')}  className="text-smallText underline underline-offset-2" >{Language.lng=='ENG'?'Log in':'Identifier vous'}</button>
      </div>}

      
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

        const [showPassword,setShowPassword]=useState(false)
        const [showConfPassword,setShowConfPassword]=useState(false)
        
        
        const Language=useLanguage()

    
    const { register, handleSubmit ,formState:{errors,isValid,isDirty}} = useForm<Step1>({
    
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
  <input {...register("email")} type='email' id="Email" name="email"  placeholder="Enter you Email  "  
  className="w-full px-4 border rounded-md h-8 "/>
  {errors.email?.message&&<p className="text-red text-start mt-1">{errors.email.message}</p>}
  </div>
  <div className="border-b-2 border-devider  my-2"></div>


                  {/* Password Input */}

    <div className="flex  flex-col leading-3">


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
  <div className="border-b-2 border-devider  my-2"></div>


                  {/* Confirm Password Input */}

    <div className="flex  flex-col leading-3">

      <label htmlFor="confpassword" className="text-left">{Language.lng=='ENG'?'Confirm password':'Confirmr mot de passe'}  </label><br/>
        <div className="flex">

      <input 
      {...register("confpassword")}
      type={showConfPassword?'text':"password"} id="confpassword" name="confpassword"  placeholder=" confirm your password  "  
      className="w-full px-4 border rounded-md h-8 "/>
      <div onClick={()=>setShowConfPassword(!showConfPassword)} className="absolute  right-1">
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
    //onSubmit: (data: Schema) => Promise<void>
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

      adduser.mutate({email:getValues().email,password:getValues().password,name:data.firstName+','+data.lastName,phone:data.phone})
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
                
                  <div className="flex">

                  <button  type="submit" className=" mx-5 p-1  rounded-md bg-primary1 disabled:opacity-60 flex-grow"  disabled={!isDirty && !isValid}>{Language.lng=='ENG'?'Sign up':'Inscrir'}</button>   
                  </div>
    </form>}

    {adduser.isLoading&&<Loader />}
    {adduser.isError&&<p className=" text-center mx-5">sorry!somthing went wrong</p>}

    {adduser.data&&<div className="flex flex-col p-10 justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 mx-auto mb-5 text-green">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>


      <p className="text-center mb-2"> {Language.lng=='ENG'?'Your account has been created successfully':' Votre compte a été créé avec succès'}</p> 
      <p className="text-center mb-2"> {Language.lng=='ENG'?'Please check your email for verification link':' S.V.P vonsulter votre courrier pour lien de verification'}</p> 

      <button onClick={()=>SignInModal.togglemode('SignIn')}  className="bg-primary1 rounded-xl mx-5">{Language.lng=='ENG'?'Login':"S'Identifier"}</button>
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
      {checkemail.isLoading &&<img src={loader.src} alt='loader'  className='bg-devider w-20   h-20 m-auto mt-20 '/>}
      {checkemail.data==true&&<div className="flex flex-col justify-center gap-10 p-auto">
        <p className="text-2xl text-red text-center"> {Language.lng=='ENG'?'Email already exist!':'Cette adresse e-mail est déjà utilisée'}</p>
      
          <button onClick={()=>SignInModal.togglemode('SignIn')} className="mx-10 p-1  rounded-md bg-primary1 disabled:opacity-60">{Language.lng=='ENG'?'Login':'Identifier vous'}</button>
        <p className="text-xl  mx-auto ">OR</p>
          <p onClick={()=>{setstep(1)}} className="text-xl text-smallText mx-auto cursor-pointer">{Language.lng=='ENG'?'Sign up with different email':'Enregistrer avec un autre adresse email'}</p>
        
        </div>}
    </div>
  }


  export default SignUp;
