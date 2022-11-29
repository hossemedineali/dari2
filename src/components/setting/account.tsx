
import { useLanguage } from "../../store/store";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "../../utils/trpc";
import { Loader } from "../ui/loader";
import { useNotifiaction } from "../../store/notification";
import { useEffect } from "react";



const props=z.object({
   name:z.string(),
    email:z.string().optional(),
    phone:z.string(),
})

const schema=z.object({
    FirstName:z.string()
    .min(1,{message:'field required'})
            .min(3,{message:'first name must be longer than 3 charachters'})
            .max(20,{message:'First name must be less than 20 charachters'}),
    Lastname:z.string()
    .min(1,{message:'field required'})
            .min(3,{message:'first name must be longer than 3 charachters'})
            .max(20,{message:'First name must be less than 20 charachters'}),
    email:z.string().optional(),
    phone:z.string(),
})
type Props=z.infer<typeof props>
type Schema=z.infer<typeof schema>

const Account:React.FC<Props> = ({name,email,phone}) => {
    
    const Language=useLanguage()
    const notification=useNotifiaction()
    const updateAccount=trpc.updateUser.updateAccount.useMutation()

    const { register, handleSubmit,reset, formState: { errors } } = useForm<Schema>({ 
        resolver:zodResolver(schema) ,
        defaultValues:{
           FirstName:name.split(',')[0] ,
            Lastname:name.split(',')[1],
            email,
            phone
        }
        
    });
  const submit  = handleSubmit(async(data) => {
    
      updateAccount.mutate({name:data.FirstName+','+data.Lastname,phone:data.phone})

    
    });
    
    useEffect(()=>{
        
        if(updateAccount.isSuccess){
            notification.toggleShow(true)
            notification.setMeassage('your information has been successfully updated','vos informations ont bien été modifié',true)
            reset()
        }
        if(updateAccount.isError){
            notification.toggleShow(true)
            notification.setMeassage('Oops..Something went wrong...',"oups quelque chose s'est mal passé ",true)
        }
  },[updateAccount.isSuccess,updateAccount.isError,notification])
    
    
  
    

    return ( <div className="">
        <h1 className="text-2xl font-medium pl-4">{Language.lng=='ENG'?'Account':'Compte'}</h1>
        <form className="p-2 flex flex-col gap-5" onSubmit={submit}>
            {/* Name */}
            <div className="flex flex-col md:flex-row gap-1 md:gap-10 ">

                <label htmlFor="firstName " className="  md:w-1/2"> {Language.lng=='ENG'?'First name':'Nom'} 
                    <input {...register('FirstName')} id="firstName" type='text' className="w-full px-4 border-2 border-devider rounded-md  h-8 " />
                </label>
                {errors.FirstName&&<p className="text-red">{errors.FirstName.message}</p>}

                <label htmlFor="lastname" className=" md:w-1/2">{Language.lng=='ENG'?'Last name':'prénom'}
                    <input {...register('Lastname')} id="lastname" type='text' className="w-full px-4 border-2 border-devider rounded-md  h-8 " />
                     </label>
                     {errors.Lastname&&<p className="text-red">{errors.Lastname.message}</p>}
            </div>

            {/* EMail and phone */}
            <div className="flex flex-col md:flex-row gap-1 md:gap-10 ">

                <label htmlFor="firstName " className="  md:w-1/2"> {Language.lng=='ENG'?'Email':'Email'} 
                    <input {...register('email')} id="email" type='text' className="w-full px-4 border-2 border-devider rounded-md  h-8 opacity-70 " disabled />
                </label>
               

                <label htmlFor="lastname" className=" md:w-1/2">{Language.lng=='ENG'?'Phone':'Télephone'}
                    <input {...register('phone')} id="phone" placeholder="exeample 22xxxxxx" type='text' pattern="[0-9]{8}" className="w-full px-4 border-2 border-devider rounded-md  h-8 " />
                     </label>
            </div>

                <button className="mx-10 sm:m-auto md:mt-20 sm:w-max p-1 rounded-md bg-primary1 active:scale-95" >{!updateAccount.isLoading?Language.lng=='ENG'?"Update":"Mise a jour":<Loader/>}</button>


        </form>
    </div> );
}
 
export default Account;