
import { useLanguage } from "../../store/store";


import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";



const props=z.object({
    FirstName:z.string(),
    Lastname:z.string(),
    email:z.string(),
    phone:z.string(),
})

type Props=z.infer<typeof props>

const Account:React.FC<Props> = ({FirstName,Lastname,email,phone}) => {

    const { register, handleSubmit, formState: { errors } } = useForm<Props>({ resolver:zodResolver(props)  });
  const onSubmit = handleSubmit((data) => console.log(data));

    
    const Language=useLanguage()
    
    

    return ( <div className="">
        <h1 className="sm:pl-10  text-xl">{Language.lng=='ENG'?'Account':'Compte'}</h1>
        <form className="p-2 flex flex-col gap-5">
            {/* Name */}
            <div className="flex flex-col md:flex-row gap-1 md:gap-10 ">

                <label htmlFor="firstName " className="  md:w-1/2"> {Language.lng=='ENG'?'First name':'Nom'} 
                    <input id="firstName" type='text' className="w-full px-4 border-2 border-devider rounded-md  h-8 " />
                </label>
               

                <label htmlFor="lastname" className=" md:w-1/2">{Language.lng=='ENG'?'Last name':'prénom'}
                    <input id="lastname" type='text' className="w-full px-4 border-2 border-devider rounded-md  h-8 " />
                     </label>
            </div>

            {/* EMail and phone */}
            <div className="flex flex-col md:flex-row gap-1 md:gap-10 ">

                <label htmlFor="firstName " className="  md:w-1/2"> {Language.lng=='ENG'?'Email':'Email'} 
                    <input id="email" type='text' className="w-full px-4 border-2 border-devider rounded-md  h-8 " />
                </label>
               

                <label htmlFor="lastname" className=" md:w-1/2">{Language.lng=='ENG'?'Phone':'Télephone'}
                    <input id="phone" type='text' className="w-full px-4 border-2 border-devider rounded-md  h-8 " />
                     </label>
            </div>

                <button className="mx-10 sm:m-auto md:mt-20 sm:w-max p-1 rounded-md bg-primary1">{Language.lng=='ENG'?"Update":"Mise a jour"}</button>


        </form>
    </div> );
}
 
export default Account;