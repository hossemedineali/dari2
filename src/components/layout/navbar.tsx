
import {   useState } from "react";
import MobileMenu from "./mobilemenu";


import { useRouter } from 'next/router'

import { useSession, signIn } from "next-auth/react"
//import { Useauth, useFormInput } from "../../store/store";
//import SigninModal from "./signinModal";


import Link from 'next/link'
import UserIcon from "./userIcon";
const links=[


  {value:'Buy',label:'Sell'},{value:'Rent',label:'Rent'},{value:'Find coRental',label:'CoRental'}
]

const Navbar = () => {
  const [togglemenu, settogglemenu] = useState(false)
  


  const router=useRouter()
 // const auth=Useauth()
  //const formInput=useFormInput()

  

  

  const { data:sesssion } = useSession()

  const handeladdpostclick=()=>{
    if(!sesssion){
 //     auth.setToogleShow(true)
    }else{
      router.push('/add')
    }
  }

  const toggle=()=>{
    settogglemenu(prev=>!prev)
  }
  return ( 

<>
  <nav className=" border-b-2 border-devider bg-white px-0 py-4 flex justify-between   w-full  fixed z-30 backdrop">
    
    

    
   {!togglemenu&& <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer sm:hidden" onClick={toggle}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
</svg>}

    <Link href='/'>
    <h1 className="text-primary1  font-bold text-2xl pl-6 md:w-1/5 flex justify-center cursor-pointer w-2/5 m-auto ">Dari</h1>
    </Link>
    
    <ul className="sm:flex flex-wrap justify-evenly w-4/5 hidden  ">
      
          {links.map((link,index)=>(
            <Link href='/search' key={index} >
{/*              <li onClick={()=>formInput.setannouncementtype(link.label)} className='cursor-pointer hover:text-primary1 hover:border-b transition-all duration-500'>{link.value}</li>
 */}            </Link>
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
        


            {!sesssion&& <button className="hover:scale-105 active:scale-95 py-1 px-3 mr-2  bg-primary1 text-white py-auto rounded-lg" onClick={()=>signIn()} >signin</button>}
          {sesssion&&<div><UserIcon/></div>}


    {togglemenu&&<MobileMenu togglemenu={togglemenu} settogglemenu ={settogglemenu}/>}

  </nav>
{/*     {auth.show&&<SigninModal/>} */}           
            </>
     );
}
 
export default Navbar;

