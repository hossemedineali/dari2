import { motion } from "framer-motion"
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
//import { useFormInput } from "../../store/store";

const links=[


  {value:'Home',label:'/'},{value:'Buy',label:'/search'},{value:'Rent',label:'/search'},{value:'Find coRental',label:'/search'}
  ]
 interface Props{
    togglemenu:boolean,
    settogglemenu:(settogglemenu:boolean)=>void
 }

const MobileMenu:React.FC<Props> = ({togglemenu,settogglemenu}) => {

    const { data:sesssion } = useSession()
    const router=useRouter()
const [selectedLink,setSelactedLink]=useState()

   
   const handeladdpostclick=()=>{
    if(!sesssion){
//auth.setToogleShow(true)
    }else{
      router.push('/add')
    }
  }

    return (
        <div className=" absolute top-0 left-0 bottom-0  min-h-screen  bg-primary1 backdrop-sepia  md:hidden " >
        {togglemenu&&<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer mt-5" onClick={()=>{settogglemenu(false)}}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
         </svg>}
        
        <motion.aside
             initial={{ width: 0 }} 
             animate={{ width: 300 }}
             exit={{width:0}}
             transition={{easeInOut: [0.17]}}
            >

            <ul className=" py-10   flex flex-col ">
                {links.map((link,index)=>(
                <Link href={link.label} key={index}>
                     <li   className={`pl-8 py-4 cursor-pointer hover:text-secondary2 text-white text-2xl ${''}`}> {link.value}</li>
                     </Link>
                    
                
                    ))}

                <div onClick={handeladdpostclick} className="hover:scale-105 active:scale-95 flex  mr-6  md:px-4 md:py-1 rounded-2xl cursor-pointer  ">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h1 >Add announcment</h1>
                  </div>
            </ul>
                    </motion.aside>
    </div> 
            
    );
}
 
export default MobileMenu;




 

