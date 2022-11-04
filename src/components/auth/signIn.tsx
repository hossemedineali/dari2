import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLanguage, useSignInModal } from "../../store/store";


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

  

    const SignInModal=useSignInModal()

    console.log(SignInModal.mode)


  const { register, handleSubmit ,formState:{errors}} = useForm<Schema>({
    resolver: zodResolver(schema)
  });



  const onSubmit = (data: Schema) => {
    console.log(data);
  };

  return (
    <div className="w-full flex flex-col gap-3 relative justify-center">
      
    <h1 className="text-center">{Language.lng=='ENG'?dic.title.ENG:dic.title.FRA} </h1>
 
    <form
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

        
       <label htmlFor="password" className="text-left ">{Language.lng=='ENG'?'Password':'Mot de passe'} </label><br/>
        <input {...register("password", {required:true,})} type='text'  id="password" name="password"   
       className="w-full px-4 border-2 border-devider rounded-md  h-8 "/>
          {errors.password?.message&&<p className="text-red text-start mt-1">{errors.password?.message}</p>}
          </div>

        <button className=" mx-10 p-1 rounded-md bg-primary1  ">{Language.lng=='ENG'?dic.title.ENG:dic.title.FRA}</button>

        <button> {Language.lng=='ENG'?'Forget password?':'Mot de passe oubliée ?'}</button>
    </form>
    <div className="border-b-2 border-devider  my-2"></div>

    
    <div className="flex gap-4">
    
    <button  onClick={()=>SignInModal.togglemode()}  className="text-smallText underline underline-offset-2">{Language.lng=='ENG'?'Create new account':'Créer nouveau compte'}</button>

    </div>
</div>
  );
};

export default SignIn;
