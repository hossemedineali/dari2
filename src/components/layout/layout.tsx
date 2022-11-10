
import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { useSignInModal } from "../../store/store";
import SignIn from "../auth/signIn";
import SignUp from "../auth/singup";
import Alert from "../ui/alert";
import { useSession } from "next-auth/react";




type porps={
    children:JSX.Element
}

const Layout :React.FC<porps>= (props)=> {
    
    const SignInModal=useSignInModal()
    const {data:session}=useSession()

    return ( 
        <div >

        <Navbar/>
            <main className="mt-16">
                
            {SignInModal.show&&<div className="hidden md:block md:rounded-2xl p-2   bg-white mx-auto w-[450px] fixed left-0 right-0 top-16   z-30 shadow-2xl overflow-auto backdrop-blur-3xl">
            <svg onClick={()=>SignInModal.toggleShow()} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 cursor-pointer hover:bg-devider">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>

                {SignInModal.mode=='SignUp'? <SignUp/>:<SignIn/>}
                </div>}

                {SignInModal.show&&<div className="block md:hidden md:rounded-2xl p-2   bg-white mx-auto md:w-[350px] fixed left-0 right-0 md:top-16 bottom-0 md- top-0 z-30 shadow-2xl overflow-auto backdrop-blur-lg">
            <svg onClick={()=>SignInModal.toggleShow()} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 cursor-pointer hover:bg-devider">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>

                {SignInModal.mode=='SignUp'? <SignUp/>:<SignIn/>}
                </div>}
            {session&& !session.user?.emailisverfied&&<Alert />}

            
            {props.children}
                        </main>
        <Footer/>
            
        </div>
        
     );
}
 
export default Layout;