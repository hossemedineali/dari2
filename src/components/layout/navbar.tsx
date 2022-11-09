
import {   useState } from "react";
import MobileMenu from "./mobilemenu";


import { useRouter } from 'next/router'

import { useSession } from "next-auth/react"
import {motion,AnimatePresence} from 'framer-motion'



import Link from 'next/link'
import UserIcon from "./userIcon";
import { useLanguage, useSignInModal } from "../../store/store";
const links=[


  {value:'Buy',label:'Sell'},{value:'Rent',label:'Rent'},{value:'Find coRental',label:'CoRental'}
]

const Navbar = () => {
  const [togglemenu, settogglemenu] = useState(false)
  const [togglelng, settogglelng] = useState(false)



  const router=useRouter()
  const SignInModal=useSignInModal()
  const Language=useLanguage()

  

  

  const {data:sesssion}  = useSession()
 
  console.log(sesssion)

  const handeladdpostclick=()=>{
    if(!sesssion){
      SignInModal.toggleShow()
    }else{
      router.push('/add')
    }
  }

  const toggle=()=>{
    settogglemenu(prev=>!prev)
  }
  return ( 

<>
  <nav className="mb-[250px] border-b-2 border-devider bg-white px-0 py-4 flex justify-between   w-full  fixed top-0 z-30 backdrop">
    
    

    
   {!togglemenu&& <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer sm:hidden" onClick={toggle}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
</svg>}

    <Link href='/'>
    <h1 className="text-primary1  font-bold text-3xl pl-6  flex justify-center cursor-pointer  m-auto grow  mr-auto">Dari</h1>
    </Link>
    
    <ul className="sm:flex flex-wrap justify-evenly w-4/5 hidden  ">
      
          {links.map((link,index)=>(
            <Link href='/search' key={index} >
             <li  className='cursor-pointer hover:text-primary1 hover:border-b transition-all duration-500'>{link.value}</li>
            </Link>
            ))}
      
    </ul>
            

            {router.route!='/Addpost'&&(
                  <div onClick={handeladdpostclick} className="hover:scale-105 active:scale-95 md:flex  mr-6 bg-white border-red border text-red px-4 py-1 rounded-2xl cursor-pointer hidden ">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h1 >AddPost</h1>
                  </div>
            )}
        

              <div className="flex gap-5">

              <div onClick={()=>{settogglelng(!togglelng)}} className="cursor-pointer">

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-8  ">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
            </svg>
              
            <AnimatePresence>
                { togglelng&&
                
                <motion.div
                            initial={{y:-20,}}
                            animate={{y:0,}}
                      
                          
                            
                            className="w-16 text-center top-14 right-20 px-2 bg-white justify-center align-middle content-center absolute flex flex-col z-50  ">
                             
                                
                                <span onClick={()=>{Language.togglelang('ENG');settogglelng(false)}} className="cursor-pointer my-1 border-b-devider border-b-2 py-1 hover:border-b-red transition-all duration-100">ENG</span>
                                
                                
                                <span onClick={()=>{Language.togglelang('FRA');settogglelng(false)}} className="cursor-pointer my-1 border-b-devider border-b-2 py-1 hover:border-b-red transition-all duration-100">FRA</span>
                                

                            </motion.div>}</AnimatePresence>
              </div>

            {!sesssion&& <button onClick={()=>{SignInModal.toggleShow()}} className="hover:scale-105 active:scale-95 py-1 px-3 mr-2  bg-primary1 text-white py-auto rounded-lg"  >signin</button>}
          {sesssion&&<div><UserIcon/></div>}
              </div>


    {togglemenu&&<MobileMenu togglemenu={togglemenu} settogglemenu ={settogglemenu}/>}

  </nav>
           
            </>
     );
}
 
export default Navbar;

