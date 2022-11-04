
import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { useSignInModal } from "../../store/store";
import SignIn from "../auth/signIn";
import SignUp from "../auth/singup";




type porps={
    children:JSX.Element
}

const Layout :React.FC<porps>= (props)=> {
    
    const SignInModal=useSignInModal()
    return ( 
        <div >

        <Navbar/>
            <main className="mt-16 bg-devider">
                
            {SignInModal.show&&<div className="md:rounded-2xl p-2   bg-white mx-auto md:w-[350px] fixed left-0 right-0 md:top-20 top-0 z-30 bottom-0">
            <svg onClick={()=>SignInModal.toggleShow()} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 cursor-pointer hover:bg-devider">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>

                {SignInModal.mode=='SignUp'? <SignUp/>:<SignIn/>}
                </div>}
            {props.children}
                        </main>
        <Footer/>
            
        </div>
        
     );
}
 
export default Layout;