import { useState } from "react";

import {motion,AnimatePresence} from 'framer-motion'
import {  signOut } from "next-auth/react"
import Link from "next/link";
import { useLanguage } from "../../store/store";
import { useRouter } from "next/router";


const UserIcon = () => {

    const Language=useLanguage()
    
    const router=useRouter()

    const [showMenu,setshowMenu]=useState(false)


    return ( 
    
    <div onClick={()=>setshowMenu(!showMenu)}  className="mr-2 w-full h-full z-50 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                <AnimatePresence>
                { showMenu&&
                
                <motion.div
                            initial={{y:-20,}}
                            animate={{y:0,}}
                      
                          
                            
                            className="w-50 top-14 right-2 px-2 bg-white justify-center align-middle content-center absolute flex flex-col z-50  ">
                             
                                <Link href='/listing' className="my-1 border-b-devider border-b-2 py-1 hover:border-b-red transition-all duration-100">
                                <span  className=" ">{Language.lng=='ENG'?'My announcements':'Mes annonces'}</span>
                                </Link>
                               
                                <Link href='/saved' className="cursor-pointer my-1 border-b-devider border-b-2 py-1 hover:border-b-red transition-all duration-100">
                                <span  >{Language.lng=='ENG'?'saved announcements':'Annonces enregistrées'}</span>
                                </Link>

                                <Link href='/setting' className="cursor-pointer my-1 border-b-devider border-b-2 py-1 hover:border-b-red transition-all duration-100">
                                <span  >{Language.lng=='ENG'?'Setting':'Parameters'}</span>
                                </Link>
                              
                                <span onClick={()=>{signOut(); router.push('/')} } className="cursor-pointer my-1 border-b-devider border-b-2 py-1 hover:border-b-red transition-all duration-100">{Language.lng=='ENG'?'Logout':'Se déconnecter'}</span>

                            </motion.div>}</AnimatePresence>

    </div> );
}
 
export default UserIcon;