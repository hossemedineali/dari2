import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Account from "../components/setting/account";
import DelteAccount from "../components/setting/deleteAccount";
import Password from "../components/setting/password";
import { useLanguage } from "../store/store";
import { trpc } from "../utils/trpc";




const Setting = () => {

   
    const sesssion=useSession()
    const router=useRouter()
    const Language=useLanguage()

    if (!sesssion.data?.user){
        if(typeof window != "undefined"){
            router.push('/') 
        }
            
    }
    

    const user=trpc.getuser.getuserForSettingPage.useMutation()
    useEffect(()=>{
        user.mutate()
        console.log(user.data)
    },[])


    const [activeSection,setActiveSection]=useState('Account')
    return ( <div className="flex mt-24 ">
        <div className=" border-r-devider border-r-2 md:px-10 sm:px-5 px-2 flex flex-col gap-10 ">
            <h1 className="hidden sm:block">User Name</h1>
            
            <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 sm:hidden mx-auto">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>


            <div onClick={()=>{setActiveSection('Account')}} className={`flex cursor-pointer transition-all duration-100 ${activeSection=='Account'?'border-b-2 border-b-red':''}` }>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                <p className="hidden sm:block">{Language.lng=='ENG'?'Account':'Compte'}</p>

            </div>

            <div onClick={()=>{setActiveSection('Password')}} className={`flex cursor-pointer transition-all duration-100 ${activeSection=='Password'?'border-b-2 border-b-red':''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                </svg>

                <p className="hidden sm:block">{Language.lng=='ENG'?'Password':'Mot de pass'}</p>

            </div>

            <div onClick={()=>{setActiveSection('Delete account')}} className={`flex cursor-pointer transition-all duration-100 ${activeSection=='Delete account'?'border-b-2 border-b-red':''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>


                <p className="hidden sm:block">{Language.lng=='ENG'?'Delete account':'supprimer le compte'}</p>

            </div>

        </div>

        <div className="flex-grow ">
                        {activeSection=='Account'&&user.data&&<Account name={user.data.name as string} email={user.data.email as string} phone={user.data.phone as string}/>}
                        {activeSection=='Password'&&<Password/>}
                        {activeSection=='Delete account'&&<DelteAccount/>}


        </div>
    </div> );
    }

 
export default Setting;