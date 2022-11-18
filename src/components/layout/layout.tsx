
import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { useSignInModal } from "../../store/store";
import SignIn from "../auth/signIn";
import SignUp from "../auth/singup";
import Notification from "../ui/notification";
import { useNotifiaction } from "../../store/notification";
import ResetPassWord from "../auth/resetPassWord";

type porps={
    children:JSX.Element
}
const Layout :React.FC<porps>= (props)=> {    
    const SignInModal=useSignInModal()
    const notification=useNotifiaction()

    const styles = {targetDiv: { height: 'calc(100vh - 240px)'}}


    return ( 
        <div  className="relative ">

        <Navbar/>
            <main  className="mb-36  ">
                
            {SignInModal.show&&<div className=" md:rounded-2xl p-2   bg-white mx-auto md:w-[450px] fixed left-0 right-0 md:top-16 top-0 bottom-0 md:bottom-auto  z-30 shadow-xl shadow-primary1 overflow-auto backdrop-blur-3xl">
            <svg onClick={()=>{SignInModal.toggleShow() ;SignInModal.togglemode('SignIn')}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 cursor-pointer hover:bg-devider">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>

                {SignInModal.mode=='SignUp'&& <SignUp/>}
                {SignInModal.mode=='SignIn'&&<SignIn/>}
                {SignInModal.mode=='Reset'&&<ResetPassWord/>}

                </div>}

               
            {props.children}
                    {notification.show&&<Notification/>}

                   
                        </main>


        <div className="fixed right-0 left-0 bottom-0">
            <Footer/>
        </div>
        </div>
     );
}
export default Layout;